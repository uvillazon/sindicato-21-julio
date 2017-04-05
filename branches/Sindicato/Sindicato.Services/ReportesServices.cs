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
                    if (socio.FECHA_ALTA > FECHA)
                    {
                        FECHA = socio.FECHA_ALTA;
                    }
                }
                var manager = new SD_KARDEX_HOJASManager(uow);
                string res = manager.ActualizarKardex(ID_SOCIO_MOVIL, FECHA, login);
                DateTime date = FECHA.AddMonths(-1);
                var kardex = manager.BuscarTodos(x => x.ID_SOCIO_MOVIL == ID_SOCIO_MOVIL && x.MES > date);
                foreach (var item in kardex)
                {
                    var kar = new ReporteKardexHoja()
                    {
                        MES = item.MES,
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
                var managerRegulHojas = new SD_REGULARIZACIONESManager(uow);
                var managerDetallesHojas = new SD_DETALLES_HOJAS_CONTROLManager(uow);
                var managerIngresos = new SD_INGRESOSManager(uow);
                var managerIngresosSocios = new SD_INGRESOS_POR_SOCIOSManager(uow);
                var managerRegulaciones = new SD_DETALLES_REGULARIZACIONESManager(uow);
                var managerObligaciones = new SD_OBLIGACIONES_HOJAManager(uow);

                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                var hojas = managerHojas.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin && x.ESTADO != "ANULADO").OrderBy(x => x.ID_HOJA);
                var hojasAnuladas = managerHojas.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin && x.ESTADO == "ANULADO").OrderBy(x => x.ID_HOJA);

                var detallesHojas = managerDetallesHojas.BuscarTodos(x => x.SD_HOJAS_CONTROL.FECHA_COMPRA < Fecha_fin && x.SD_HOJAS_CONTROL.FECHA_COMPRA >= FECHA_INI && x.SD_HOJAS_CONTROL.ESTADO != "ANULADO");

                decimal? num = 0;
                var groupDetalles = detallesHojas.Where(c => c.IMPORTE > 0).GroupBy(x => x.OBLIGACION).Select(y => new { OBLIGACION = y.Key, CANTIDAD = y.Count(), IMPORTE = y.Sum(z => z.IMPORTE), COSTO = y.Min(z => z.IMPORTE) });


                var ini_hoja = hojas.Min(x => x.ID_HOJA);
                var fin_hoja = hojas.Max(x => x.ID_HOJA);

                var detalle = string.Format("Venta de Hojas de : {0}-{1} / Cantidad Hojas Vendidas : {2} / Cantidad Hojas Anuladas : {3}", ini_hoja, fin_hoja, hojas.Count(), hojasAnuladas.Count());
                //var deetalles = hojas.
                foreach (var item in groupDetalles)
                {
                    if (item.IMPORTE > 0)
                    {
                        var obli = managerObligaciones.BuscarTodos(x => x.OBLIGACION == item.OBLIGACION).FirstOrDefault();
                        var detalleRep = new ReporteTotal()
                        {
                            DETALLE = detalle,
                            SUBDETALLE = item.OBLIGACION,
                            CANTIDAD = item.CANTIDAD,
                            BOLIVIANOS = (decimal)item.IMPORTE,
                            COSTO_UNITARIO = obli == null ? (decimal)item.COSTO : obli.IMPORTE_DEFECTO
                        };
                        result.Add(detalleRep);
                    }
                }

                var detallesRegulaciones = managerRegulaciones.BuscarTodos(x => x.SD_REGULARIZACIONES.FECHA_COMPRA < Fecha_fin && x.SD_REGULARIZACIONES.FECHA_COMPRA >= FECHA_INI && x.SD_REGULARIZACIONES.ESTADO != "ANULADO");

                var groupDetallesRegulacion = detallesRegulaciones.GroupBy(x => x.OBLIGACION).Select(y => new { OBLIGACION = y.Key, CANTIDAD = y.Count(), IMPORTE = y.Sum(z => z.IMPORTE), COSTO = y.Min(z => z.IMPORTE) });

                var regulaciones = managerRegulHojas.BuscarTodos(x => x.FECHA_COMPRA < Fecha_fin && x.FECHA_COMPRA >= FECHA_INI && x.ESTADO != "ANULADO");
                var Anuladasregulaciones = managerRegulHojas.BuscarTodos(x => x.FECHA_COMPRA < Fecha_fin && x.FECHA_COMPRA >= FECHA_INI && x.ESTADO == "ANULADO");

                var detalleRegulaciones = string.Format("Regulaciones : Cantidad de Hojas Regularizadas : {0} / Cantidad De Anuladas : {1}", regulaciones.Sum(x => x.CANTIDAD), Anuladasregulaciones.Count());
                foreach (var item in groupDetallesRegulacion)
                {
                    if (item.IMPORTE > 0)
                    {
                        var detalleRep = new ReporteTotal()
                        {
                            DETALLE = detalleRegulaciones,
                            SUBDETALLE = item.OBLIGACION,
                            CANTIDAD = item.CANTIDAD,
                            BOLIVIANOS = (decimal)item.IMPORTE,
                            COSTO_UNITARIO = (decimal)item.COSTO
                        };
                        result.Add(detalleRep);
                    }
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

        public IEnumerable<SociosMovilesReporte> ObtenerReporteSociosMovilesPorFecha(DateTime FECHA_INI, DateTime FECHA_FIN)
        {
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
                        DESCRIPCION = item.DESCRIPCION,
                        ESTADO = item.ESTADO,
                        FECHA_ALTA = item.FECHA_ALTA,
                        FECHA_BAJA = item.FECHA_BAJA,
                        FECHA_REG = item.FECHA_REG,
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

        public IEnumerable<ReporteRetiroModel> ObtenerReporteRetiro(int ID_RETIRO)
        {
            List<ReporteRetiroModel> result = new List<ReporteRetiroModel>();
            NumLetra n = new NumLetra();
            ExecuteManager(uow =>
            {
                var manager = new SD_RETIRO_SOCIO_MOVILManager(uow);
                var kardex = manager.BuscarTodos(x => x.ID_RETIRO == ID_RETIRO);
                foreach (var item in kardex)
                {
                    var kar = new ReporteRetiroModel()
                    {
                        ID_RETIRO = item.ID_RETIRO,
                        CAJA = item.SD_CAJAS.NOMBRE,
                        FECHA = item.FECHA,
                        LOGIN = item.LOGIN,
                        MOVIL = item.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL.ToString(),
                        OBSERVACION = item.OBSERVACION,
                        SOCIO = item.SD_SOCIO_MOVILES.ObtenerNombreSocio(),
                        TOTAL_RETIRO = item.RETIRO,
                        TOTAL_LITERAL = n.Convertir(item.RETIRO.ToString(), true, item.SD_CAJAS.MONEDA)
                    };
                    result.Add(kar);
                }

            });

            return result;

        }

        public IEnumerable<ReportePrestamo> ObtenerReportePrestamo(int ID_PRESTAMO)
        {
            List<ReportePrestamo> result = new List<ReportePrestamo>();
            NumLetra n = new NumLetra();
            ExecuteManager(uow =>
            {
                var manager = new SD_PLAN_DE_PAGOManager(uow);
                var kardex = manager.BuscarTodos(x => x.ID_PRESTAMO == ID_PRESTAMO);
                foreach (var item in kardex)
                {
                    var kar = new ReportePrestamo()
                    {
                        CAJA = item.SD_PRESTAMOS_POR_SOCIOS.SD_CAJAS.NOMBRE,
                        CAPITAL_A_PAGAR = item.CAPITAL_A_PAGAR,
                        FECHA_LIMITE_PAGO = item.SD_PRESTAMOS_POR_SOCIOS.FECHA_LIMITE_PAGO,
                        FECHA_PAGO = item.FECHA_PAGO,
                        FECHA_PRESTAMO = item.SD_PRESTAMOS_POR_SOCIOS.FECHA,
                        IMPORTE_PRESTAMO = item.SD_PRESTAMOS_POR_SOCIOS.IMPORTE_PRESTAMO,
                        ID_PLAN = item.ID_PLAN,
                        ID_PRESTAMO = item.ID_PRESTAMO,
                        IMPORTE_A_PAGAR = item.IMPORTE_A_PAGAR,
                        IMPORTE_INTERES = (decimal)item.SD_PRESTAMOS_POR_SOCIOS.IMPORTE_INTERES,
                        INTERES = item.SD_PRESTAMOS_POR_SOCIOS.INTERES,
                        INTERES_A_PAGAR = item.INTERES_A_PAGAR,
                        IMPORTE_TOTAL = item.INTERES_A_PAGAR + item.IMPORTE_A_PAGAR,
                        LOGIN_USR = item.LOGIN_USR,
                        MONEDA = item.SD_PRESTAMOS_POR_SOCIOS.MONEDA,
                        NRO_SEMANA = item.NRO_SEMANA,
                        OBSERVACION = item.SD_PRESTAMOS_POR_SOCIOS.OBSERVACION,
                        SALDO_PLAN = item.SALDO_PLAN,
                        SEMANAS = item.SD_PRESTAMOS_POR_SOCIOS.SEMANAS,
                        SOCIO = item.SD_PRESTAMOS_POR_SOCIOS.SD_SOCIO_MOVILES.ObtenerNombreSocio(),
                        TIPO_INTERES = item.SD_PRESTAMOS_POR_SOCIOS.TIPO_INTERES,
                        TIPO_PRESTAMO = item.SD_PRESTAMOS_POR_SOCIOS.SD_TIPOS_PRESTAMOS.NOMBRE,
                        MOVIL = item.SD_PRESTAMOS_POR_SOCIOS.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                        IMPORTE_MORA = item.SD_PRESTAMOS_POR_SOCIOS.SD_TIPOS_PRESTAMOS.MULTA_POR_MORA

                    };
                    result.Add(kar);
                }

            });

            return result;

        }

        public IEnumerable<ReportePrestamo> ObtenerPago(int ID_PAGO)
        {
            List<ReportePrestamo> result = new List<ReportePrestamo>();
            NumLetra n = new NumLetra();
            ExecuteManager(uow =>
            {
                var manager = new SD_PAGO_DE_PRESTAMOSManager(uow);
                var kardex = manager.BuscarTodos(x => x.ID_PAGO == ID_PAGO);
                foreach (var item in kardex)
                {
                    var kar = new ReportePrestamo()
                    {
                        ID_PAGO = item.ID_PAGO,
                        ID_PRESTAMO = item.ID_PRESTAMO,
                        FECHA_PAGO = item.FECHA,
                        FECHA_LIMITE_PAGO = item.SD_PRESTAMOS_POR_SOCIOS.FECHA_LIMITE_PAGO,
                        OBSERVACION = item.SD_PRESTAMOS_POR_SOCIOS.SD_TIPOS_PRESTAMOS.NOMBRE,
                        IMPORTE_TOTAL = item.IMPORTE,
                        IMPORTE_PRESTAMO = (decimal)item.SD_PRESTAMOS_POR_SOCIOS.IMPORTE_INTERES + item.SD_PRESTAMOS_POR_SOCIOS.IMPORTE_PRESTAMO + item.SD_PRESTAMOS_POR_SOCIOS.SD_PRESTAMOS_MORA.Sum(y => y.IMPORTE_MORA),
                        TOTAL_CANCELADO = item.SD_PRESTAMOS_POR_SOCIOS.SD_PAGO_DE_PRESTAMOS.Count() > 0 ? item.SD_PRESTAMOS_POR_SOCIOS.SD_PAGO_DE_PRESTAMOS.Sum(x => x.IMPORTE) : 0,
                        IMPORTE_LITERAL = n.Convertir(item.IMPORTE.ToString(), true, item.SD_CAJAS.MONEDA),
                        SOCIO = item.SD_PRESTAMOS_POR_SOCIOS.SD_SOCIO_MOVILES.ObtenerNombreSocio(),
                        MOVIL = item.SD_PRESTAMOS_POR_SOCIOS.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL
                    };
                    kar.DEBE = kar.IMPORTE_PRESTAMO - kar.TOTAL_CANCELADO;
                    result.Add(kar);
                }
                //FE
            });

            return result;

        }
        public IEnumerable<ReporteDetalleIngresos> ObtenerReporteIngresoDetalle(DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            List<ReporteDetalleIngresos> result = new List<ReporteDetalleIngresos>();
            NumLetra n = new NumLetra();
            ExecuteManager(uow =>
            {
                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                var managerIngresos = new SD_INGRESOS_POR_SOCIOSManager(uow);
                var ingresosSocios = managerIngresos.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin);
                foreach (var item in ingresosSocios)
                {
                    var detalleRep = new ReporteDetalleIngresos()
                    {
                        DETALLE = item.SD_TIPOS_INGRESOS_SOCIO.NOMBRE,
                        SUBDETALLE = item.OBSERVACION,
                        FECHA = item.FECHA,
                        FECHA_INI = FECHA_INI,
                        FECHA_FIN = FECHA_FIN,
                        NRO_MOVIL = item.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                        NRO_RECIBO = Convert.ToString(item.ID_INGRESO),
                        CAJA = item.SD_CAJAS.NOMBRE,
                        BOLIVIANOS = item.SD_CAJAS.MONEDA == "BOLIVIANOS" ? item.IMPORTE : 0,
                        DOLARES = item.SD_CAJAS.MONEDA == "DOLARES" ? item.IMPORTE : 0
                    };
                    result.Add(detalleRep);
                }
                var managerOtrosIngresos = new SD_INGRESOSManager(uow);
                var otrosingresos = managerOtrosIngresos.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin);
                foreach (var item1 in otrosingresos)
                {
                    var detalleRep = new ReporteDetalleIngresos()
                    {
                        DETALLE = "OTROS INGRESOS (INSTITUCION)",
                        SUBDETALLE = item1.CONCEPTO,
                        FECHA = item1.FECHA,
                        FECHA_INI = FECHA_INI,
                        FECHA_FIN = FECHA_FIN,
                        NRO_MOVIL = null,
                        NRO_RECIBO = Convert.ToString(item1.ID_INGRESO),
                        CAJA = item1.SD_CAJAS.NOMBRE,
                        BOLIVIANOS = item1.SD_CAJAS.MONEDA == "BOLIVIANOS" ? item1.IMPORTE : 0,
                        DOLARES = item1.SD_CAJAS.MONEDA == "DOLARES" ? item1.IMPORTE : 0
                    };
                    result.Add(detalleRep);
                }
                //FE
            });
            return result;
        }

        public IEnumerable<ReporteDetalleIngresos> ObtenerReporteEgresosDetalle(DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            List<ReporteDetalleIngresos> result = new List<ReporteDetalleIngresos>();
            NumLetra n = new NumLetra();
            ExecuteManager(uow =>
            {
                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                var managerIngresos = new SD_EGRESOSManager(uow);
                var ingresosSocios = managerIngresos.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin);
                foreach (var item in ingresosSocios)
                {
                    var detalleRep = new ReporteDetalleIngresos()
                    {
                        DETALLE = item.SD_TIPOS_EGRESOS.NOMBRE,
                        SUBDETALLE = item.OBSERVACION,
                        FECHA = item.FECHA,
                        FECHA_INI = FECHA_INI,
                        FECHA_FIN = FECHA_FIN,
                        NRO_RECIBO = Convert.ToString(item.ID_EGRESO),
                        CAJA = item.SD_CAJAS.NOMBRE,
                        BOLIVIANOS = item.SD_CAJAS.MONEDA == "BOLIVIANOS" ? item.IMPORTE : 0,
                        DOLARES = item.SD_CAJAS.MONEDA == "DOLARES" ? item.IMPORTE : 0
                    };
                    result.Add(detalleRep);
                }
                //FE
            });
            return result;
        }

        public IEnumerable<ReporteHojasDetalle> ObtenerReporteDetalleHojas(DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            List<ReporteHojasDetalle> result = new List<ReporteHojasDetalle>();
            ExecuteManager(uow =>
            {
                var manager = new SD_HOJAS_CONTROLManager(uow);
                var managerSocio = new SD_SOCIO_MOVILESManager(uow);
                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                string Intervalo = string.Format("{0} - {1}", FECHA_INI.ToString("dd/MM/yyyy"), FECHA_FIN.ToString("dd/MM/yyyy"));
                var socios = manager.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin).GroupBy(y => y.ID_SOCIO_MOVIL).OrderBy(x => x.Key).Select(z => z.Key);
                bool ban = true;
                ReporteHojasDetalle reporte = new ReporteHojasDetalle();
                int cont = 0;
                foreach (var item in socios)
                {
                    cont++;
                    var socio = managerSocio.BuscarTodos(x => x.ID_SOCIO_MOVIL == item).FirstOrDefault();
                    if (socios != null)
                    {
                        var hojas = manager.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin && x.ESTADO != "ANULADO" && x.ID_SOCIO_MOVIL == item).OrderBy(x => x.ID_HOJA);
                        var hojasAnuladas = manager.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin && x.ESTADO == "ANULADO" && x.ID_SOCIO_MOVIL == item).OrderBy(x => x.ID_HOJA);
                        decimal? total_ahorro = 0;
                        foreach (var ahorro in hojas)
                        {
                            decimal? importe = ahorro.SD_DETALLES_HOJAS_CONTROL.Where(x => x.OBLIGACION == "AHORRO").Sum(y => y.IMPORTE);
                            total_ahorro = total_ahorro + importe;
                        }

                        if (ban)
                        {
                            reporte = new ReporteHojasDetalle();
                            reporte.NRO_MOVIL = socio == null ? item : socio.SD_MOVILES.NRO_MOVIL;
                            reporte.CANT_HOJAS_VEND = hojas.Count();
                            reporte.CANT_HOJAS_ANUL = hojasAnuladas.Count();
                            reporte.PRECIO = ObtenerPrecios(hojas); //hojas.FirstOrDefault() == null ? 0 : hojas.FirstOrDefault().MONTO;
                            reporte.AHORRO = total_ahorro;
                            reporte.INTERVALO = Intervalo;
                            reporte.TOTAL = hojas.Sum(x => x.MONTO);
                            ban = false;
                        }
                        else
                        {

                            ban = true;
                            reporte.NRO_MOVIL1 = socio == null ? item : socio.SD_MOVILES.NRO_MOVIL;
                            reporte.CANT_HOJAS_VEND1 = hojas.Count();
                            reporte.CANT_HOJAS_ANUL1 = hojasAnuladas.Count();
                            reporte.PRECIO1 = ObtenerPrecios(hojas);
                            reporte.AHORRO1 = total_ahorro;
                            reporte.TOTAL1 = hojas.Sum(x => x.MONTO);
                            result.Add(reporte);
                        }
                    }
                    else
                    {
                        var a = item;
                    }

                }
                if (!ban) {
                    result.Add(reporte);
                }
                //cont = cont + 1;
            });

            return result;
        }

        public IEnumerable<ReporteHojasDetalle> ObtenerReporteDetalleHojasRegularizadas(DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            List<ReporteHojasDetalle> result = new List<ReporteHojasDetalle>();
            ExecuteManager(uow =>
            {
                var manager = new SD_REGULARIZACIONESManager(uow);
                var managerSocio = new SD_SOCIO_MOVILESManager(uow);
                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                string Intervalo = string.Format("{0} - {1}", FECHA_INI.ToString("dd/MM/yyyy"), FECHA_FIN.ToString("dd/MM/yyyy"));
                var socios = manager.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin).GroupBy(y => y.ID_SOCIO_MOVIL).OrderBy(x => x.Key).Select(z => z.Key);
                bool ban = true;
                ReporteHojasDetalle reporte = new ReporteHojasDetalle();
                int cont = 0;
                foreach (var item in socios)
                {
                    cont++;
                    var socio = managerSocio.BuscarTodos(x => x.ID_SOCIO_MOVIL == item).FirstOrDefault();
                    if (socios != null)
                    {
                        var hojas = manager.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin && x.ESTADO != "ANULADO" && x.ID_SOCIO_MOVIL == item).OrderBy(x => x.ID_REGULACION);
                        var hojasAnuladas = manager.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin && x.ESTADO == "ANULADO" && x.ID_SOCIO_MOVIL == item).OrderBy(x => x.ID_REGULACION);

                        decimal? total_ahorro = 0;
                        foreach (var ahorro in hojas)
                        {
                            decimal? importe = ahorro.SD_DETALLES_REGULARIZACIONES.Where(x => x.OBLIGACION == "AHORRO").Sum(y => y.IMPORTE);
                            total_ahorro = total_ahorro + importe;
                        }


                        if (ban)
                        {
                            reporte = new ReporteHojasDetalle();
                            reporte.NRO_MOVIL = socio == null ? item : socio.SD_MOVILES.NRO_MOVIL;
                            reporte.CANT_HOJAS_VEND = (int?)hojas.Sum(x=>x.CANTIDAD);
                            reporte.CANT_HOJAS_ANUL = hojasAnuladas.Count();
                            reporte.PRECIO = ObtenerPreciosRegularizadas(hojas); //hojas.FirstOrDefault() == null ? 0 : hojas.FirstOrDefault().MONTO;
                            reporte.AHORRO = total_ahorro;
                            reporte.INTERVALO = Intervalo;
                            reporte.TOTAL = hojas.Sum(x => x.MONTO);
                            ban = false;
                        }
                        else
                        {

                            ban = true;
                            reporte.NRO_MOVIL1 = socio == null ? item : socio.SD_MOVILES.NRO_MOVIL;
                            reporte.CANT_HOJAS_VEND1 = (int?)hojas.Sum(x => x.CANTIDAD);
                            reporte.CANT_HOJAS_ANUL1 = hojasAnuladas.Count();
                            reporte.PRECIO1 = ObtenerPreciosRegularizadas(hojas);
                            reporte.AHORRO1 = total_ahorro;
                            reporte.TOTAL1 = hojas.Sum(x => x.MONTO);
                            result.Add(reporte);
                        }
                    }
                    else
                    {
                        var a = item;
                    }

                }
                if (!ban)
                {
                    result.Add(reporte);
                }
                //cont = cont + 1;
            });

            return result;
        }


        private string ObtenerPrecios(IEnumerable<SD_HOJAS_CONTROL> hojas)
        {
            string result = "";
            foreach (var item in hojas.GroupBy(y => y.MONTO).Select(x => x.Key))
            {
                if (result == "")
                {
                    result = item.ToString();
                }
                else
                {
                    result = string.Format("{0} / {1}", result, item);
                }
            }
            return result;
        }

        private string ObtenerPreciosRegularizadas(IEnumerable<SD_REGULARIZACIONES> reg)
        {
            string result = "";
            decimal? precio = 0;
            decimal[] numbers= new decimal[100];
            int i = 0;
            foreach (var item in reg)
            {
                precio = item.MONTO / item.CANTIDAD;
                if (!Array.Exists(numbers, x => x == precio))
                {
                    if (result == "")
                    {
                        result = precio.ToString();
                    }
                    else
                    {
                        result = string.Format("{0} / {1}", result, precio.ToString());
                    }
                    numbers[i] = (decimal)precio;///   numbers[] =precio.ToString();
                    i++;
                }
            }
            return result;
        }



    }
}
