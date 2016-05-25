using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Services.Interfaces;
using Sindicato.Common;
using Sindicato.Model;
using System.Linq.Dynamic;
using LinqKit;
using Sindicato.Business;
using System.Linq.Expressions;
using System.Data.Objects;
using Sindicato.Services.Model;

namespace Sindicato.Services
{
    public class ReportesServices : BaseService
    {
        public IEnumerable<ReporteKardexHoja> ObtenerReporteKardexHoja(DateTime FECHA, int ID_SOCIO_MOVIL, string login)
        {
            List<ReporteKardexHoja> result = new List<ReporteKardexHoja>();
            ExecuteManager(uow =>
            {
                var managerSocio = new SD_SOCIO_MOVILESManager(uow);
                var socio = managerSocio.BuscarTodos(x => x.ID_SOCIO_MOVIL == ID_SOCIO_MOVIL).FirstOrDefault();
                if (socio != null)
                {
                    FECHA = socio.FECHA_ALTA;
                }
                var manager = new SD_KARDEX_HOJASManager(uow);
                string res = manager.ActualizarKardex(ID_SOCIO_MOVIL, FECHA, login);
                DateTime date = FECHA.AddMonths(-1);
                var kardex = manager.BuscarTodos(x => x.ID_SOCIO_MOVIL == ID_SOCIO_MOVIL && x.MES > date);
                foreach (var item in kardex)
                {
                    var kar = new ReporteKardexHoja()
                    {
                        MES = item.MES.ToString("MM-yyyy"),
                        NRO_MOVIL = item.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL.ToString(),
                        SOCIO = string.Format("{0} {1} {2}", item.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE, item.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO, item.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO),
                        CANT_HOJAS = item.CANT_HOJAS,
                        CANT_HOJAS_OBLIG = item.CANT_HOJAS_OBLIG,
                        CANT_REG = item.CANT_REGULACIONES,
                        DEBE = item.DEBE
                    };
                    result.Add(kar);
                }

            });

            return result;

        }

        public IEnumerable<ReporteRegulaciones> ObtenerReporteRegulacion(int ID_REGULACION)
        {
            List<ReporteRegulaciones> result = new List<ReporteRegulaciones>();
            NumLetra n = new NumLetra();
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLES_REGULARIZACIONESManager(uow);
                var kardex = manager.BuscarTodos(x => x.ID_REGULACION == ID_REGULACION);
                foreach (var item in kardex)
                {
                    var kar = new ReporteRegulaciones()
                    {
                        ID_REGULACION = item.SD_REGULARIZACIONES.ID_REGULACION,
                        MES = item.SD_REGULARIZACIONES.MES.ToString("MM-yyyy"),
                        MOVIL = item.SD_REGULARIZACIONES.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL.ToString(),
                        SOCIO = string.Format("{0} {1} {2}", item.SD_REGULARIZACIONES.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE, item.SD_REGULARIZACIONES.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO, item.SD_REGULARIZACIONES.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO),
                        CANTIDAD = item.SD_REGULARIZACIONES.CANTIDAD,
                        FECHA_COMPRA = item.SD_REGULARIZACIONES.FECHA_COMPRA,
                        IMPORTE_OBLIGACION = item.IMPORTE,
                        OBLIGACION = item.OBLIGACION,
                        TOTAL = item.SD_REGULARIZACIONES.MONTO,
                        TOTAL_LITERAL = n.Convertir(item.SD_REGULARIZACIONES.MONTO.ToString(), true)
                    };
                    result.Add(kar);
                }

            });

            return result;

        }

        public IEnumerable<ReporteRegulaciones> ObtenerReporteIngreso(int ID_INGRESO)
        {
            List<ReporteRegulaciones> result = new List<ReporteRegulaciones>();
            NumLetra n = new NumLetra();
            ExecuteManager(uow =>
            {
                var manager = new SD_INGRESOS_POR_SOCIOSManager(uow);
                var kardex = manager.BuscarTodos(x => x.ID_INGRESO == ID_INGRESO);
                foreach (var item in kardex)
                {
                    var kar = new ReporteRegulaciones()
                    {
                        ID_REGULACION = item.ID_INGRESO,
                        MOVIL = item.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL.ToString(),
                        SOCIO = string.Format("{0} {1} {2}", item.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE, item.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO, item.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO),
                        CANTIDAD = 1,
                        FECHA_COMPRA = item.FECHA,
                        IMPORTE_OBLIGACION = item.IMPORTE,
                        OBLIGACION = item.SD_TIPOS_INGRESOS_SOCIO.NOMBRE,
                        TOTAL = item.IMPORTE,
                        TOTAL_LITERAL = n.Convertir(item.IMPORTE.ToString(), true, item.MONEDA)
                    };
                    result.Add(kar);
                }

            });

            return result;

        }

        public IEnumerable<ReporteRegulaciones> ObtenerReporteEgreso(int ID_EGRESO)
        {
            List<ReporteRegulaciones> result = new List<ReporteRegulaciones>();
            NumLetra n = new NumLetra();
            ExecuteManager(uow =>
            {
                var manager = new SD_EGRESOSManager(uow);
                var kardex = manager.BuscarTodos(x => x.ID_EGRESO == ID_EGRESO);
                foreach (var item in kardex)
                {
                    var kar = new ReporteRegulaciones()
                    {
                        ID_REGULACION = item.ID_EGRESO,
                        CANTIDAD = 1,
                        FECHA_COMPRA = item.FECHA,
                        IMPORTE_OBLIGACION = item.IMPORTE,
                        OBLIGACION = item.CONCEPTO,
                        TOTAL = item.IMPORTE,
                        TOTAL_LITERAL = n.Convertir(item.IMPORTE.ToString(), true, item.SD_CAJAS.MONEDA)
                    };
                    result.Add(kar);
                }

            });

            return result;

        }

        public IEnumerable<RepoteDetalleHojas> ObtenerReporteDetalleHoja(DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            List<RepoteDetalleHojas> result = new List<RepoteDetalleHojas>();
            ExecuteManager(uow =>
            {
                var managerHojas = new SD_HOJAS_CONTROLManager(uow);
                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                var hojas = managerHojas.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin && x.ESTADO != "ANULADO").OrderBy(x => x.ID_HOJA);
                foreach (var item in hojas)
                {
                    var hoja = new RepoteDetalleHojas()
                    {
                        ESTADO = item.ESTADO,
                        FECHA_COMPRA = item.FECHA_COMPRA,
                        IMPORTE = item.MONTO,
                        IMPORTE_DETALLE = item.SD_DETALLES_HOJAS_CONTROL.Sum(y => y.IMPORTE),
                        MOVIL = item.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                        SOCIO = string.Format("{0} {1} {2}", item.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE, item.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO, item.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO),
                        NRO_HOJA = string.Format("{0} - {1}", item.ID_HOJA, item.NRO_HOJA)

                    };
                    result.Add(hoja);
                }
            });
            return result;
        }

        public IEnumerable<ReporteTotal> ObtenerReporteTotal(DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            List<ReporteTotal> result = new List<ReporteTotal>();
            ExecuteManager(uow =>
            {
                var managerHojas = new SD_HOJAS_CONTROLManager(uow);
                var managerDetallesHojas = new SD_DETALLES_HOJAS_CONTROLManager(uow);
                var managerIngresos = new SD_INGRESOSManager(uow);
                var managerIngresosSocios = new SD_INGRESOS_POR_SOCIOSManager(uow);
                var managerRegulaciones = new SD_DETALLES_REGULARIZACIONESManager(uow);
                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                var hojas = managerHojas.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin && x.ESTADO != "ANULADO").OrderBy(x => x.ID_HOJA);
                var detallesHojas = managerDetallesHojas.BuscarTodos(x => x.SD_HOJAS_CONTROL.FECHA_COMPRA < Fecha_fin && x.SD_HOJAS_CONTROL.FECHA_COMPRA >= FECHA_INI && x.SD_HOJAS_CONTROL.ESTADO != "ANULADO");

                var groupDetalles = detallesHojas.GroupBy(x => x.OBLIGACION).Select(y => new { OBLIGACION = y.Key, CANTIDAD = y.Count(), IMPORTE = y.Sum(z => z.IMPORTE), COSTO = y.Min(z => z.IMPORTE) });


                var ini_hoja = hojas.Min(x => x.ID_HOJA);
                var fin_hoja = hojas.Max(x => x.ID_HOJA);

                var detalle = string.Format("Venta de Hojas de : {0}-{1}", ini_hoja, fin_hoja);
                //var deetalles = hojas.
                foreach (var item in groupDetalles)
                {
                    var detalleRep = new ReporteTotal()
                    {
                        DETALLE = detalle,
                        SUBDETALLE = item.OBLIGACION,
                        CANTIDAD = item.CANTIDAD,
                        BOLIVIANOS = (decimal)item.IMPORTE,
                        COSTO_UNITARIO = (decimal)item.COSTO
                    };
                    result.Add(detalleRep);
                }

                var detallesRegulaciones = managerRegulaciones.BuscarTodos(x => x.SD_REGULARIZACIONES.FECHA_COMPRA < Fecha_fin && x.SD_REGULARIZACIONES.FECHA_COMPRA >= FECHA_INI && x.SD_REGULARIZACIONES.ESTADO != "ANULADO");
                var groupDetallesRegulacion = detallesRegulaciones.GroupBy(x => x.OBLIGACION).Select(y => new { OBLIGACION = y.Key, CANTIDAD = y.Count(), IMPORTE = y.Sum(z => z.IMPORTE), COSTO = y.Min(z => z.IMPORTE) });
                foreach (var item in groupDetallesRegulacion)
                {
                    var detalleRep = new ReporteTotal()
                    {
                        DETALLE = "Regulaciones",
                        SUBDETALLE = item.OBLIGACION,
                        CANTIDAD = item.CANTIDAD,
                        BOLIVIANOS = (decimal)item.IMPORTE,
                        COSTO_UNITARIO = (decimal)item.COSTO
                    };
                    result.Add(detalleRep);
                }


                var ingresosSocios = managerIngresosSocios.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin && x.SD_CAJAS.MONEDA == "BOLIVIANOS");
                var ingresosSociosDetalle = ingresosSocios.GroupBy(x => new { CATEGORIA = x.SD_TIPOS_INGRESOS_SOCIO.CATEGORIA, INGRESO = x.SD_TIPOS_INGRESOS_SOCIO.NOMBRE }).Select(y => new { DETALLE = y.Key.CATEGORIA, SUBDETALLE = y.Key.INGRESO, CANTIDAD = y.Count(), IMPORTE = y.Sum(z => z.IMPORTE), COSTO = y.Min(z => z.IMPORTE) });
                foreach (var item in ingresosSociosDetalle)
                {
                    var detalleRep = new ReporteTotal()
                    {
                        DETALLE = item.DETALLE,
                        SUBDETALLE = item.SUBDETALLE,
                        CANTIDAD = item.CANTIDAD,
                        BOLIVIANOS = (decimal)item.IMPORTE,
                        COSTO_UNITARIO = (decimal)item.COSTO
                    };
                    result.Add(detalleRep);
                }

                var ingresosSociosDol = managerIngresosSocios.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin && x.SD_CAJAS.MONEDA == "DOLARES");
                var ingresosSociosDetalleDol = ingresosSociosDol.GroupBy(x => new { CATEGORIA = x.SD_TIPOS_INGRESOS_SOCIO.CATEGORIA, INGRESO = x.SD_TIPOS_INGRESOS_SOCIO.NOMBRE }).Select(y => new { DETALLE = y.Key.CATEGORIA, SUBDETALLE = y.Key.INGRESO, CANTIDAD = y.Count(), IMPORTE = y.Sum(z => z.IMPORTE), COSTO = y.Min(z => z.IMPORTE) });
                foreach (var item in ingresosSociosDetalleDol)
                {
                    var detalleRep = new ReporteTotal()
                    {
                        DETALLE = item.DETALLE,
                        SUBDETALLE = item.SUBDETALLE,
                        CANTIDAD = item.CANTIDAD,
                        DOLARES = (decimal)item.IMPORTE,
                        COSTO_UNITARIO = (decimal)item.COSTO
                    };
                    result.Add(detalleRep);
                }
                decimal total = 0;
                foreach (var item in result)
                {
                    if (item.SUBDETALLE == "AHORRO")
                    {
                        total = total + item.BOLIVIANOS;
                    }
                }

                foreach (var item in result)
                {
                    item.FECHA_INI = FECHA_INI;
                    item.FECHA_FIN = FECHA_FIN;
                    item.TOTAL_AHORRO = total;

                }
            });
            return result;
        }

        public IEnumerable<SociosMovilesReporte> ObtenerReporteSociosMovilesPorFecha(DateTime FECHA_INI, DateTime FECHA_FIN) {
            List<SociosMovilesReporte> result = new List<SociosMovilesReporte>();
            ExecuteManager(uow =>
            {
            var manager = new SD_SOCIO_MOVILESManager(uow);
            DateTime Fecha_fin = FECHA_FIN.AddDays(1);
            string Intervalo = string.Format("{0} - {1}", FECHA_INI.ToString("dd/MM/yyyy"), FECHA_FIN.ToString("dd/MM/yyyy"));
            //var socios = manager.BuscarTodos(x => x.FECHA_BAJA >= FECHA_INI && x.FECHA_BAJA < Fecha_fin && x.ESTADO == "ACTIVO");
            var socios = manager.BuscarTodos(x => x.ESTADO == "ACTIVO");
                //var hojas = managerHojas.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin && x.ESTADO != "ANULADO").OrderBy(x => x.ID_HOJA);
            foreach (var item in socios)
            {
                var hoja = new SociosMovilesReporte()
                {
                    DESCRIPCION = item.DESCRIPCION ,
                    ESTADO = item.ESTADO ,
                    FECHA_ALTA = item.FECHA_ALTA ,
                    FECHA_BAJA = item.FECHA_BAJA,
                    FECHA_REG = item.FECHA_REG ,
                    INTERVALO_FECHA = Intervalo,
                    NRO_MOVIL = item.SD_MOVILES.NRO_MOVIL,
                    OBSERVACION = item.OBSERVACION,
                    SOCIO = item.ObtenerNombreSocio(),
                    TIPO_LINEA = item.TIPO_MOVIL

                };
                result.Add(hoja);
            }
            });
            return result;
        }
    }
}
