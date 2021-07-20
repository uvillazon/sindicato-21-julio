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
                        OBLIGACION = item.OBSERVACION,
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
                        CONCEPTO = item.OBSERVACION,
                        CAJA = string.Format("{0} : {1}", item.SD_CAJAS.CODIGO, item.SD_CAJAS.NOMBRE),
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

        public IEnumerable<RepoteDetalleHojas> ObtenerReporteDetalleHojaPorSocio(DateTime FECHA_INI, DateTime FECHA_FIN, int ID_SOCIO_MOVIL)
        {
            List<RepoteDetalleHojas> result = new List<RepoteDetalleHojas>();
            ExecuteManager(uow =>
            {
                var managerHojas = new SD_HOJAS_CONTROLManager(uow);
                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                var hojas = managerHojas.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin && x.ESTADO != "ANULADO" && x.ID_SOCIO_MOVIL == ID_SOCIO_MOVIL).OrderBy(x => x.ID_HOJA);
                foreach (var item in hojas)
                {
                    var hoja = new RepoteDetalleHojas()
                    {
                        ESTADO = item.ESTADO,
                        FECHA_COMPRA = item.FECHA_COMPRA,
                        IMPORTE = item.MONTO,
                        IMPORTE_DETALLE = item.SD_DETALLES_HOJAS_CONTROL.Sum(y => y.IMPORTE),
                        AHORRO = item.SD_DETALLES_HOJAS_CONTROL.Where(z => z.OBLIGACION == "AHORRO").Sum(y => y.IMPORTE),
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

                var detalleRegulaciones = string.Format("Regulaciones : Cantidad de Hojas Regularizadas : {0} / Cantidad De Recibos Anulados : {1}", regulaciones.Sum(x => x.CANTIDAD), Anuladasregulaciones.Count());
                foreach (var item in groupDetallesRegulacion)
                {
                    if (item.IMPORTE > 0)
                    {
                        var obli = managerObligaciones.BuscarTodos(x => x.OBLIGACION == item.OBLIGACION).FirstOrDefault();

                        var detalleRep = new ReporteTotal()
                        {
                            DETALLE = detalleRegulaciones,
                            SUBDETALLE = item.OBLIGACION,
                            CANTIDAD = (int)regulaciones.Sum(x => x.CANTIDAD),
                            BOLIVIANOS = (decimal)item.IMPORTE,
                            COSTO_UNITARIO = obli.IMPORTE_DEFECTO  //item.IMPORTE //(decimal)item.IMPORTE / (decimal)regulaciones.Where(x => x.MONTO > 0).Sum(x => x.CANTIDAD),// (decimal)item.COSTO
                        };
                        result.Add(detalleRep);
                    }
                }


                var ingresosSocios = managerIngresosSocios.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin && x.SD_CAJAS.MONEDA == "BOLIVIANOS" &&  x.ESTADO != "ANULADO");
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

                var ingresosSociosDol = managerIngresosSocios.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin && x.SD_CAJAS.MONEDA == "DOLARES" && x.ESTADO != "ANULADO");
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
                    item.TOTAL_CANTIDAD = hojas.Count() + (int)regulaciones.Sum(x => x.CANTIDAD);

                }
            });
            return result;
        }

        public IEnumerable<ReporteDetalleNumeracionHoja> ReporteDetalleNumeracionHojas(DateTime FECHA_INI, DateTime FECHA_FIN)
        {

            List<ReporteDetalleNumeracionHoja> result = new List<ReporteDetalleNumeracionHoja>();
            ExecuteManager(uow =>
            {
                var managerHojas = new SD_HOJAS_CONTROLManager(uow);
                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                var hojas = managerHojas.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin).OrderBy(x => x.ID_HOJA);
                string anuladas = "";
                string limbos = "";
                int inicio = hojas.Min(x => x.ID_HOJA);

                int ini_hoja = hojas.Min(x => x.ID_HOJA);
                int fin_hoja = hojas.Max(x => x.ID_HOJA);
                int iniFin = 0;
                for (int ini = ini_hoja; ini <= fin_hoja; ini++)
                {

                    if (hojas.Where(x => x.ID_HOJA == ini).FirstOrDefault() == null)
                    {
                        limbos = limbos == "" ? ini.ToString() : string.Format("{0},{1}", limbos, ini);
                        iniFin++;

                    }

                }
                limbos = limbos + " //// TOTAL : " + iniFin;
                int anu = 0;
                foreach (var item in hojas)
                {
                    if (item.ESTADO == "ANULADO")
                    {
                        anuladas = anuladas == "" ? item.ID_HOJA.ToString() : string.Format("{0},{1}", anuladas, item.ID_HOJA.ToString());
                        anu++;
                    }
                    //if (item.ID_HOJA != inicio)
                    //{
                    //    limbos = limbos == "" ? inicio.ToString() : string.Format("{0},{1}", limbos, inicio.ToString());
                    //}
                    //inicio++;
                }
                anuladas = anuladas + " ///// TOTAL : " + anu;

                result.Add(new ReporteDetalleNumeracionHoja()
                {
                    INICIO = ini_hoja,
                    FIN = fin_hoja,
                    ANULADAS = anuladas,
                    NO_GENERADAS = limbos
                });
            });
            return result;
        }

        public IEnumerable<ReporteTotal> ReporteResumenHojas(DateTime FECHA_INI, DateTime FECHA_FIN)
        {

            List<ReporteTotal> result = new List<ReporteTotal>();
            ExecuteManager(uow =>
            {
                var managerHojas = new SD_HOJAS_CONTROLManager(uow);
                var managerRegulHojas = new SD_REGULARIZACIONESManager(uow);
                var managerDetallesHojas = new SD_DETALLES_HOJAS_CONTROLManager(uow);
                var managerRegulaciones = new SD_DETALLES_REGULARIZACIONESManager(uow);
                var managerObligaciones = new SD_OBLIGACIONES_HOJAManager(uow);


                DateTime Fecha_fin = FECHA_FIN.AddDays(1);

                ReporteTotal rep1 = new ReporteTotal();
                var hojas = managerHojas.BuscarTodos(x => x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < Fecha_fin && x.ESTADO != "ANULADO").OrderBy(x => x.ID_HOJA);
                var detallesHojas = managerDetallesHojas.BuscarTodos(x => x.SD_HOJAS_CONTROL.FECHA_COMPRA < Fecha_fin && x.SD_HOJAS_CONTROL.FECHA_COMPRA >= FECHA_INI && x.SD_HOJAS_CONTROL.ESTADO != "ANULADO");
                //var groupDetalles = detallesHojas.Where(c => c.IMPORTE > 0).GroupBy(x => x.OBLIGACION).Select(y => new { OBLIGACION = y.Key, CANTIDAD = y.Count(), IMPORTE = y.Sum(z => z.IMPORTE), COSTO = y.Min(z => z.IMPORTE) });

                var grupoDetalles = detallesHojas.GroupBy(x => new { OBLIGACION = x.OBLIGACION, PRECIO_UNITARIO = x.IMPORTE }).Select(y => new { OBLIGACION = y.Key.OBLIGACION, CANTIDAD = y.Count(), COSTO = y.Key.PRECIO_UNITARIO, IMPORTE = y.Sum(z => z.IMPORTE) });

                decimal totalHojasInstitucion = 0;
                decimal totalHojasAhorro = 0;
                int cantidadAhorro = 0;
                foreach (var item in grupoDetalles)
                {
                    ReporteTotal rep = new ReporteTotal();
                    //if (item.OBLIGACION == "AHORRO")
                    //{
                    //rep.NRO_RECIBO = item.OBLIGACION == "AHORRO" ? "AHOROS" : "APORTE SINDICATO";
                    //rep.DETALLE = item.OBLIGACION;//== "AHORRO" ? "AHOROS" : "APORTE SINDICATO";
                    rep.NRO_RECIBO = item.OBLIGACION;
                    //rep.NRO_RECIBO = "VENTAS DE HOJAS";
                    rep.SUBDETALLE = "VENTA DE HOJAS";
                    rep.DETALLE = item.OBLIGACION == "AHORRO" ? "AHOROS" : "APORTE SINDICATO";
                    //rep.DETALLE = "VENTAS DE HOJAS";
                    //rep.SUBDETALLE = item.OBLIGACION;
                    rep.CANTIDAD = item.CANTIDAD;
                    rep.COSTO_UNITARIO = (decimal)item.COSTO;
                    rep.TOTAL_AHORRO = (decimal)item.IMPORTE;
                    cantidadAhorro = cantidadAhorro + item.CANTIDAD;
                    totalHojasAhorro = totalHojasAhorro + (decimal)item.IMPORTE;
                    //}
                    //else
                    //{
                    //    rep.NRO_RECIBO = item.OBLIGACION;
                    //    rep.DETALLE = "APORTE SINDICATO";
                    //    rep.SUBDETALLE = "VENTA DE HOJAS";
                    //    rep.CANTIDAD = item.CANTIDAD;
                    //    rep.TOTAL_AHORRO = (decimal)item.IMPORTE;
                    //    totalHojasInstitucion = totalHojasInstitucion + (decimal)item.IMPORTE;
                    //}
                    result.Add(rep);
                }

                var regulaciones = managerRegulHojas.BuscarTodos(x => x.FECHA_COMPRA < Fecha_fin && x.FECHA_COMPRA >= FECHA_INI && x.ESTADO != "ANULADO");
                var detallesRegulaciones = managerRegulaciones.BuscarTodos(x => x.SD_REGULARIZACIONES.FECHA_COMPRA < Fecha_fin && x.SD_REGULARIZACIONES.FECHA_COMPRA >= FECHA_INI && x.SD_REGULARIZACIONES.ESTADO != "ANULADO");
                //var groupDetallesRegulacion = detallesRegulaciones.GroupBy(x => x.OBLIGACION).Select(y => new { OBLIGACION = y.Key, CANTIDAD = y.Count(), IMPORTE = y.Sum(z => z.IMPORTE), COSTO = y.Min(z => z.IMPORTE) });
                var groupDetallesRegulacion = detallesRegulaciones.GroupBy(x => new { OBLIGACION = x.OBLIGACION, COSTO = x.IMPORTE / x.SD_REGULARIZACIONES.CANTIDAD }).Select(y => new { OBLIGACION = y.Key.OBLIGACION, CANTIDAD = y.Sum(z => z.SD_REGULARIZACIONES.CANTIDAD), IMPORTE = y.Sum(z => z.IMPORTE), COSTO = y.Key.COSTO });
                decimal totalRegulInstitucion = 0;
                decimal totalRegulAhorro = 0;

                foreach (var item in groupDetallesRegulacion)
                {
                    ReporteTotal rep = new ReporteTotal();
                    //if (item.OBLIGACION == "AHORRO")
                    //{
                    //rep.NRO_RECIBO = item.OBLIGACION == "AHORRO" ? "AHOROS" : "APORTE SINDICATO";

                    //rep.NRO_RECIBO = "REGULARIZACIONES";
                    //rep.NRO_RECIBO = item.OBLIGACION == "AHORRO" ? "AHOROS" : "APORTE SINDICATO";
                    rep.DETALLE = item.OBLIGACION == "AHORRO" ? "AHOROS" : "APORTE SINDICATO";

                    rep.NRO_RECIBO = item.OBLIGACION;
                    //rep.NRO_RECIBO = "VENTAS DE HOJAS";
                    rep.SUBDETALLE = "REGULARIZACIONES";

                    //rep.DETALLE = "REGULARIZACIONES";
                    //rep.SUBDETALLE = item.OBLIGACION;
                    rep.CANTIDAD = (int)item.CANTIDAD;
                    rep.COSTO_UNITARIO = (decimal)item.COSTO;
                    rep.TOTAL_AHORRO = (decimal)item.IMPORTE;
                    //cantidadAhorro = cantidadAhorro + item.CANTIDAD;
                    totalHojasAhorro = totalHojasAhorro + (decimal)item.IMPORTE;
                    //ReporteTotal rep = new ReporteTotal();
                    //if (item.OBLIGACION == "AHORRO")
                    //{
                    //    rep.NRO_RECIBO = item.OBLIGACION;
                    //    rep.DETALLE = "AHORROS";
                    //    rep.SUBDETALLE = "REGULARIZACION DE HOJAS";
                    //    rep.CANTIDAD = item.CANTIDAD;
                    //    rep.TOTAL_AHORRO = (decimal)item.IMPORTE;

                    //    totalRegulAhorro = totalRegulAhorro + (decimal)item.IMPORTE;
                    //}
                    //else
                    //{
                    //    rep.NRO_RECIBO = item.OBLIGACION;
                    //    rep.DETALLE = "APORTE SINDICATO";
                    //    rep.SUBDETALLE = "REGULARIZACION DE HOJAS";
                    //    rep.CANTIDAD = item.CANTIDAD;
                    //    rep.TOTAL_AHORRO = (decimal)item.IMPORTE;
                    //    totalRegulInstitucion = totalRegulInstitucion + (decimal)item.IMPORTE;
                    //}
                    result.Add(rep);
                }
                //result.Add(new ReporteTotal()
                //{
                //    DETALLE = "APORTE SINDICATO",
                //    SUBDETALLE = "VENTA DE HOJAS",
                //    CANTIDAD = hojas.Count(),
                //    TOTAL_AHORRO = totalHojasInstitucion
                //});
                //result.Add(new ReporteTotal()
                //{
                //    DETALLE = "APORTE SINDICATO",
                //    SUBDETALLE = "REGULARIZACION DE HOJAS",
                //    CANTIDAD = (int)regulaciones.Sum(x => x.CANTIDAD),
                //    TOTAL_AHORRO = totalRegulInstitucion
                //});

                //result.Add(new ReporteTotal()
                //{
                //    DETALLE = "AHORROS",
                //    SUBDETALLE = "VENTA DE HOJAS",
                //    NRO_RECIBO = "AHORRO",
                //    CANTIDAD = cantidadAhorro,
                //    TOTAL_AHORRO = totalHojasAhorro
                //});
                //result.Add(new ReporteTotal()
                //{
                //    DETALLE = "AHORROS",
                //    SUBDETALLE = "REGULARIZACION DE HOJAS",
                //    NRO_RECIBO = "AHORRO",
                //    CANTIDAD = (int)regulaciones.Sum(x => x.CANTIDAD),
                //    TOTAL_AHORRO = totalRegulAhorro
                //});
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
                        CAJA = string.Format("{0} : {1}", item.SD_CAJAS.CODIGO, item.SD_CAJAS.NOMBRE),
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
                var kardex = manager.BuscarTodos(x => x.ID_PAGO == ID_PAGO && x.ESTADO != "ANULADO");
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
                        TOTAL_CANCELADO = item.SD_PRESTAMOS_POR_SOCIOS.SD_PAGO_DE_PRESTAMOS.Count() > 0 ? item.SD_PRESTAMOS_POR_SOCIOS.SD_PAGO_DE_PRESTAMOS.Where(x=>x.ESTADO != "ANULADO").Sum(x => x.IMPORTE) : 0,
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
                var ingresosSocios = managerIngresos.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin&&x.ESTADO!="ANULADO" );
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
                var ingresosSocios = managerIngresos.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin  && x.ESTADO != "ANULADO");
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

        #region Reportes Prestamos

        public IEnumerable<ReporteDetallePrestamos> ObtenerReportePrestamosDetalle(DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            List<ReporteDetallePrestamos> result = new List<ReporteDetallePrestamos>();
            NumLetra n = new NumLetra();
            ExecuteManager(uow =>
            {
                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                var managerIngresos = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                var ingresosSocios = managerIngresos.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin & x.ESTADO != "ANULADO");
                string Intervalo = string.Format("{0} - {1}", FECHA_INI.ToString("dd/MM/yyyy"), FECHA_FIN.ToString("dd/MM/yyyy"));
                foreach (var item in ingresosSocios)
                {
                    var detalleRep = new ReporteDetallePrestamos()
                    {
                        FECHA = item.FECHA,
                        FECHA_INI = FECHA_INI,
                        FECHA_FIN = FECHA_FIN,
                        FECHA_LIMITE = item.FECHA_LIMITE_PAGO,
                        ID_PRESTAMO = item.ID_PRESTAMO,
                        CAJA = item.SD_CAJAS.NOMBRE,
                        MOVIL = item.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                        IMPORTE_PRESTAMO = item.IMPORTE_PRESTAMO,
                        IMPORTE_TOTAL = item.IMPORTE_PRESTAMO + item.IMPORTE_INTERES + item.SD_PRESTAMOS_MORA.Sum(y => y.IMPORTE_MORA),
                        CANDELADO = item.SD_PAGO_DE_PRESTAMOS.Sum(y => y.IMPORTE),
                        CANT_PAGOS = item.SD_PAGO_DE_PRESTAMOS.Count(),
                        INTERVALO = Intervalo
                    };
                    result.Add(detalleRep);
                }
                //FE
            });
            return result;
        }

        public IEnumerable<ReporteDetallePrestamos> ObtenerReportePrestamosPagosDetalle(DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            List<ReporteDetallePrestamos> result = new List<ReporteDetallePrestamos>();
            NumLetra n = new NumLetra();
            ExecuteManager(uow =>
            {
                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                var managerIngresos = new SD_PAGO_DE_PRESTAMOSManager(uow);
                var ingresosSocios = managerIngresos.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin && x.ESTADO != "ANULADO");
                foreach (var item in ingresosSocios)
                {
                    var detalleRep = new ReporteDetallePrestamos()
                    {
                        FECHA_INI = FECHA_INI,
                        FECHA_FIN = FECHA_FIN,
                        ID_PRESTAMO = item.ID_PRESTAMO,
                        FECHA = item.FECHA,
                        CAJA = item.SD_CAJAS.NOMBRE,
                        MOVIL = item.SD_PRESTAMOS_POR_SOCIOS.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                        IMPORTE_PRESTAMO = item.IMPORTE,

                    };
                    result.Add(detalleRep);
                }
                //FE
            });
            return result;
        }

        public IEnumerable<ReportePrestamo> ObtenerReporteDeudores(DateTime FECHA_INI)
        {
            List<ReportePrestamo> result = new List<ReportePrestamo>();

            ExecuteManager(uow =>
            {
                var manager = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                var deudores = manager.BuscarTodos(x => x.FECHA_LIMITE_PAGO < FECHA_INI);
                foreach (var item in deudores)
                {


                    var moras = item.SD_PRESTAMOS_MORA.Count() > 0 ? item.SD_PRESTAMOS_MORA.Sum(x => x.IMPORTE_MORA) : 0;
                    var cancelados = item.SD_PAGO_DE_PRESTAMOS.Count() > 0 ? item.SD_PAGO_DE_PRESTAMOS.Sum(x => x.IMPORTE) : 0;

                    if (cancelados < item.IMPORTE_INTERES + item.IMPORTE_PRESTAMO + moras)
                    {

                        var detalleRep = new ReportePrestamo()
                        {
                            SOCIO = item.SD_SOCIO_MOVILES.ObtenerNombreSocio(),
                            MOVIL = item.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                            FECHA_INI = FECHA_INI,
                            FECHA_PRESTAMO = item.FECHA,
                            FECHA_LIMITE_PAGO = item.FECHA_LIMITE_PAGO,
                            IMPORTE_A_PAGAR = (decimal)(item.IMPORTE_PRESTAMO + item.IMPORTE_INTERES + moras) - cancelados,
                            CANTIDAD_CANCELADAS = item.SEMANAS - item.SD_PAGO_DE_PRESTAMOS.Count()

                        };
                        result.Add(detalleRep);
                    }
                }

            });
            return result;

        }
        public IEnumerable<ReportePrestamo> ObtenerReporteDeudoresCuotas(DateTime FECHA_INI)
        {
            List<ReportePrestamo> result = new List<ReportePrestamo>();

            ExecuteManager(uow =>
            {
                var manager = new SD_PLAN_DE_PAGOManager(uow);
                var managerPrestamo = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                var deudores = manager.BuscarTodos(x => x.FECHA_PAGO < FECHA_INI && x.ESTADO != "CANCELADO").GroupBy(y => y.ID_PRESTAMO).Select(z => new
                {
                    ID_PRESTAMO = z.Key,
                    COUTAS_CANCELADAS = z.Count(),
                    FECHA = z.Max(xy => xy.FECHA_PAGO)

                });
                foreach (var item in deudores)
                {
                    var prestamo = managerPrestamo.BuscarTodos(x => x.ID_PRESTAMO == item.ID_PRESTAMO).FirstOrDefault();


                    var detalleRep = new ReportePrestamo()
                    {
                        SOCIO = prestamo.SD_SOCIO_MOVILES.ObtenerNombreSocio(),
                        MOVIL = prestamo.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                        FECHA_INI = FECHA_INI,
                        FECHA_PRESTAMO = prestamo.FECHA,
                        FECHA_LIMITE_PAGO = prestamo.SD_PLAN_DE_PAGO.Max(x => x.FECHA_PAGO),
                        CANTIDAD_CANCELADAS = item.COUTAS_CANCELADAS

                    };
                    result.Add(detalleRep);

                }

            });
            return result;

        }

        public IEnumerable<ReportePrestamo> ObtenerReporteTotalPrestamos(DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            List<ReportePrestamo> result = new List<ReportePrestamo>();
            NumLetra n = new NumLetra();
            ExecuteManager(uow =>
            {
                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                var managerIngresos = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                var managerMoras = new SD_PRESTAMOS_MORAManager(uow);
                var managerPagos = new SD_PAGO_DE_PRESTAMOSManager(uow);
                var detalles = managerIngresos.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin && x.ESTADO != "ANULADO").GroupBy(xy => xy.ID_TIPO_PRESTAMO);

                var ingresosSocios = managerIngresos.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin).GroupBy(xy => xy.ID_TIPO_PRESTAMO).Select(y => new
                {
                    CANTIDAD_PRESTAMO = y.Count(),
                    IMPORTE_PRESTAMO = y.Sum(z => z.IMPORTE_PRESTAMO),
                    TIPO_PRESTAMO = y.FirstOrDefault().SD_TIPOS_PRESTAMOS.NOMBRE,
                    IMPORTE_INTERES = y.Sum(z => z.IMPORTE_INTERES),
                    ID_TIPO_PRESTAMO = y.Key,
                    //MORAS = y.Sum(z => z.SD_PRESTAMOS_MORA.Sum()),
                    TOTAL_CUOTAS = y.Sum(z => z.SEMANAS),
                    //TOTAL_CUOTAS_CANCELADAS = y.Sum(z => z.SD_PAGO_DE_PRESTAMOS.Count()),
                    //TOTAL_CANCELADO = y.Sum(z => z.SD_PAGO_DE_PRESTAMOS.Sum(xy => xy.IMPORTE))
                });
                foreach (var item in ingresosSocios)
                {
                    var moras = managerMoras.BuscarTodos(x => x.SD_PRESTAMOS_POR_SOCIOS.FECHA >= FECHA_INI && x.SD_PRESTAMOS_POR_SOCIOS.FECHA < Fecha_fin && x.SD_PRESTAMOS_POR_SOCIOS.ID_TIPO_PRESTAMO == item.ID_TIPO_PRESTAMO);
                    var pagos = managerPagos.BuscarTodos(x => x.SD_PRESTAMOS_POR_SOCIOS.FECHA >= FECHA_INI && x.SD_PRESTAMOS_POR_SOCIOS.FECHA < Fecha_fin && x.SD_PRESTAMOS_POR_SOCIOS.ID_TIPO_PRESTAMO == item.ID_TIPO_PRESTAMO && x.ESTADO != "ANULADO");
                    //var nropagos = managerPagos.BuscarTodos(x => x.SD_PRESTAMOS_POR_SOCIOS.FECHA >= FECHA_INI && x.SD_PRESTAMOS_POR_SOCIOS.FECHA < Fecha_fin && x.SD_PRESTAMOS_POR_SOCIOS.ID_TIPO_PRESTAMO == item.ID_TIPO_PRESTAMO);

                    var detalleRep = new ReportePrestamo()
                    {

                        FECHA_INI = FECHA_INI,
                        FECHA_FIN = FECHA_FIN,
                        TIPO_PRESTAMO = item.TIPO_PRESTAMO,
                        CANTIDAD = item.CANTIDAD_PRESTAMO,
                        IMPORTE_PRESTAMO = item.IMPORTE_PRESTAMO,
                        IMPORTE_INTERES = item.IMPORTE_INTERES,
                        IMPORTE_MORA = moras.Count() > 0 ? moras.Sum(x => x.IMPORTE_MORA) : 0,
                        NRO_SEMANA = item.TOTAL_CUOTAS,
                        CANTIDAD_CANCELADAS = pagos.Count(),
                        IMPORTE_TOTAL = pagos.Count() > 0 ? pagos.Sum(x => x.IMPORTE) : 0

                    };
                    result.Add(detalleRep);
                }
                //FE
            });
            return result;
        }

        #endregion

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
                if (!ban)
                {
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
                            reporte.CANT_HOJAS_VEND = (int?)hojas.Sum(x => x.CANTIDAD);
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


        public IEnumerable<ReportePrestamo> ObtenerReporteDeudoresHojas(DateTime FECHA_INI)
        {
            List<ReportePrestamo> result = new List<ReportePrestamo>();

            ExecuteManager(uow =>
            {
                var manager = new SD_KARDEX_HOJASManager(uow);
                var context = (SindicatoContext)uow.Context;
                var managerSocio = new SD_SOCIO_MOVILESManager(uow);
                var deudores = manager.BuscarTodos(x => x.MES < FECHA_INI).GroupBy(x => x.ID_SOCIO_MOVIL).Select(x => new
                {
                    ID_SOCIO_MOVIL = x.Key,
                    DEBE = x.Sum(y => y.DEBE)
                });
                foreach (var item in deudores)
                {
                    if (item.DEBE > 0)
                    {
                        var socio = managerSocio.BuscarTodos(x => x.ID_SOCIO_MOVIL == item.ID_SOCIO_MOVIL && x.ESTADO == "ACTIVO").FirstOrDefault();
                        if (socio != null)
                        {
                            ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                            context.P_SD_ACT_KARDEX_HOJA(item.ID_SOCIO_MOVIL, socio.FECHA_ALTA, "admin", p_RES);
                        }
                    }
                }
                deudores = manager.BuscarTodos(x => x.MES < FECHA_INI).GroupBy(x => x.ID_SOCIO_MOVIL).Select(x => new
                {
                    ID_SOCIO_MOVIL = x.Key,
                    DEBE = x.Sum(y => y.DEBE)
                });
                foreach (var item in deudores)
                {


                    if (item.DEBE > 0)
                    {
                        var socio = managerSocio.BuscarTodos(x => x.ID_SOCIO_MOVIL == item.ID_SOCIO_MOVIL && x.ESTADO == "ACTIVO").FirstOrDefault();

                        if (socio != null)
                        {
                            var detalleRep = new ReportePrestamo()
                            {
                                SOCIO = socio.ObtenerNombreSocio(),
                                MOVIL = socio.SD_MOVILES.NRO_MOVIL,
                                FECHA_INI = FECHA_INI,
                                CANTIDAD_CANCELADAS = (int)item.DEBE

                            };
                            result.Add(detalleRep);
                        }

                    }
                }

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
            decimal[] numbers = new decimal[100];
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

        public IEnumerable<CierreAhorroSocioMovilModel> ReporteAhorrosCobros(DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            List<CierreAhorroSocioMovilModel> result = new List<CierreAhorroSocioMovilModel>();
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLE_CIERRES_AHORROManager(uow);
                var managerSocio = new SD_SOCIO_MOVILESManager(uow);
                manager.generarPagosAhorros("admin");

                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                string Intervalo = string.Format("{0} - {1}", FECHA_INI.ToString("dd/MM/yyyy"), FECHA_FIN.ToString("dd/MM/yyyy"));


                var socios = manager.BuscarTodos(x => x.SD_CIERRES.FECHA_INI >= FECHA_INI && x.SD_CIERRES.FECHA_FIN < Fecha_fin).GroupBy(y => y.ID_SOCIO_MOVIL)
                    .Select(z =>
                        new
                        {
                            ID_SOCIO_MOVIL = z.Key,
                            TOTAL_CANT_HOJAS = z.Sum(xy => xy.CANT_HOJAS),
                            TOTAL_CANT_REGULACIONES = z.Sum(xy => xy.CANT_REGULACIONES),
                            TOTAL_AHORRO_HOJAS = z.Sum(xy => xy.AHORRO_HOJA),
                            TOTAL_AHORRO_REGULACIONES = z.Sum(xy => xy.AHORRO_REGULACIONES),
                            TOTAL_AHORRO = z.Sum(xy => xy.TOTAL_AHORRO),
                            TOTAL_CANCELADO = z.Sum(xy => xy.TOTAL_CANCELADO)
                        });
                foreach (var item in socios)
                {
                    var socio = managerSocio.BuscarTodos(x => x.ID_SOCIO_MOVIL == item.ID_SOCIO_MOVIL).FirstOrDefault();
                    if (socios != null)
                    {



                        CierreAhorroSocioMovilModel reporte = new CierreAhorroSocioMovilModel();
                        reporte.SOCIO = socio == null ? "S/N" : socio.ObtenerNombreSocio();
                        reporte.NRO_MOVIL = socio == null ? 0 : socio.SD_MOVILES.NRO_MOVIL;
                        reporte.CANT_HOJAS = item.TOTAL_CANT_HOJAS;
                        reporte.CANT_REGULACIONES = item.TOTAL_CANT_REGULACIONES;
                        reporte.AHORRO_HOJA = item.TOTAL_AHORRO_HOJAS;
                        reporte.AHORRO_REGULACIONES = item.TOTAL_AHORRO_REGULACIONES;
                        reporte.INTERVALO = Intervalo;
                        reporte.TOTAL_AHORRO = item.TOTAL_AHORRO;
                        reporte.TOTAL_CANCELADO = item.TOTAL_CANCELADO;
                        result.Add(reporte);
                    }

                }


            });

            return result;
        }


        public IEnumerable<EstadoResultadoCompletoModel> ReporteEstadoResultadoPorCaja(int ID_CAJA, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            List<EstadoResultadoCompletoModel> result = new List<EstadoResultadoCompletoModel>();

            ExecuteManager(uow =>
            {
                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                string Intervalo = string.Format("{0} - {1}", FECHA_INI.ToString("dd/MM/yyyy"), FECHA_FIN.ToString("dd/MM/yyyy"));
                var managerCaja = new SD_CAJASManager(uow);
                var managerEgresos = new SD_EGRESOSManager(uow);
                var managerRegularizaciones = new SD_DETALLES_REGULARIZACIONESManager(uow);
                var managerDetalleHoja = new SD_DETALLES_HOJAS_CONTROLManager(uow);
                var managerIngresos = new SD_INGRESOSManager(uow);
                var managerIngresosSoscios = new SD_INGRESOS_POR_SOCIOSManager(uow);
                var managerPrestamos = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                var managerPagosPrestamos = new SD_PAGO_DE_PRESTAMOSManager(uow);
                var managerRetiros = new SD_RETIRO_SOCIO_MOVILManager(uow);
                var managerTransferencias = new SD_TRANSFERENCIASManager(uow);
                int cnt = 0;
                var cajas = managerCaja.BuscarTodos(x => x.ID_CAJA == ID_CAJA).FirstOrDefault();
                var caja = cajas == null ? null : string.Format("{0} : {1}", cajas.CODIGO, cajas.NOMBRE);
                var moneda = cajas.MONEDA;
                var detalleshojas = managerDetalleHoja.BuscarTodos(x => x.ID_CAJA == ID_CAJA && x.SD_HOJAS_CONTROL.ESTADO != "ANULADO" && x.SD_HOJAS_CONTROL.FECHA_COMPRA >= FECHA_INI && x.SD_HOJAS_CONTROL.FECHA_COMPRA < Fecha_fin);
                if (detalleshojas.Count() > 0)
                {
                    var detallegrupo = detalleshojas.GroupBy(x => x.OBLIGACION);
                    if (detallegrupo.Count() > 0)
                    {
                        foreach (var item in detallegrupo)
                        {
                            EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                                {
                                    NRO = cnt,
                                    OPERACION = "INGRESOS",
                                    SUBOPERACION = "VENTA DE HOJAS",
                                    DETALLE = item.Key,
                                    PERIODO = Intervalo,
                                    CAJA = caja,
                                    MONEDA = moneda,
                                    //MES =  item.FECHA.ToString("MMMM").ToUpper();
                                    IMPORTE = item.Sum(x => x.IMPORTE),
                                    //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                                };
                            result.Add(res);
                            cnt++;

                        }

                    }
                }
                var detalleregularizaciones = managerRegularizaciones.BuscarTodos(x => x.ID_CAJA == ID_CAJA && x.SD_REGULARIZACIONES.ESTADO != "ANULADO" && x.SD_REGULARIZACIONES.FECHA_COMPRA >= FECHA_INI && x.SD_REGULARIZACIONES.FECHA_COMPRA < Fecha_fin);
                if (detalleregularizaciones.Count() > 0)
                {
                    var detallegrupoReg = detalleregularizaciones.GroupBy(x => x.OBLIGACION);
                    if (detallegrupoReg.Count() > 0)
                    {
                        foreach (var item in detallegrupoReg)
                        {
                            EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                            {
                                NRO = cnt,
                                OPERACION = "INGRESOS",
                                SUBOPERACION = "REGULARIZACIONES",
                                DETALLE = item.Key,
                                PERIODO = Intervalo,
                                CAJA = caja,
                                MONEDA = moneda,
                                //MES =  item.FECHA.ToString("MMMM").ToUpper();
                                IMPORTE = item.Sum(x => x.IMPORTE),
                                //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                            };
                            result.Add(res);
                            cnt++;

                        }

                    }
                }
                var detallesIngresosPorSocios = managerIngresosSoscios.BuscarTodos(x => x.ID_CAJA == ID_CAJA && x.ESTADO != "ANULADO" && x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin);
                if (detallesIngresosPorSocios.Count() > 0)
                {
                    var grupoDetalleIngresosPorSocioss = detallesIngresosPorSocios.GroupBy(x => x.SD_TIPOS_INGRESOS_SOCIO.NOMBRE);
                    if (grupoDetalleIngresosPorSocioss.Count() > 0)
                    {
                        foreach (var item in grupoDetalleIngresosPorSocioss)
                        {
                            EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                            {
                                NRO = cnt,
                                OPERACION = "INGRESOS",
                                SUBOPERACION = "DIVIDENDOS",
                                DETALLE = item.Key,
                                PERIODO = Intervalo,
                                CAJA = caja,
                                MONEDA = moneda,
                                //MES =  item.FECHA.ToString("MMMM").ToUpper();
                                IMPORTE = item.Sum(x => x.IMPORTE),
                                //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                            };
                            result.Add(res);
                            cnt++;
                        }
                    }
                }
                var detallesPagosPrestamos = managerPagosPrestamos.BuscarTodos(x => x.ID_CAJA == ID_CAJA && x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin && x.ESTADO != "ANULADO").GroupBy(y => y.SD_PRESTAMOS_POR_SOCIOS.SD_TIPOS_PRESTAMOS.NOMBRE);
                if (detallesPagosPrestamos.Count() > 0)
                {
                    foreach (var item in detallesPagosPrestamos)
                    {
                        EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                        {
                            NRO = cnt,
                            OPERACION = "INGRESOS",
                            SUBOPERACION = "PAGO DE PRESTAMOS",
                            DETALLE = item.Key,
                            PERIODO = Intervalo,
                            CAJA = caja,
                            MONEDA = moneda,
                            //MES =  item.FECHA.ToString("MMMM").ToUpper();
                            IMPORTE = item.Sum(x => x.IMPORTE),
                            //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                        };
                        result.Add(res);
                        cnt++;
                    }
                }
                var detalleTransferencias = managerTransferencias.BuscarTodos(x => x.ID_CAJA_DESTINO == ID_CAJA && x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin);
                foreach (var item in detalleTransferencias)
                {
                    EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                       {
                           NRO = cnt,
                           OPERACION = "INGRESOS",
                           SUBOPERACION = "TRANSFERENCIAS",
                           DETALLE = item.CONCEPTO,
                           PERIODO = Intervalo,
                           CAJA = caja,
                           MONEDA = moneda,
                           //MES =  item.FECHA.ToString("MMMM").ToUpper();
                           IMPORTE = item.IMPORTE,
                           //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                       };
                    result.Add(res);
                    cnt++;
                }
                var detalleEgresos = managerEgresos.BuscarTodos(x => x.ID_CAJA == ID_CAJA && x.ESTADO != "ANULADO" && x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin).GroupBy(y => y.SD_TIPOS_EGRESOS.NOMBRE);
                foreach (var item in detalleEgresos)
                {
                    EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                       {
                           NRO = cnt,
                           OPERACION = "EGRESOS",
                           SUBOPERACION = "OTROS EGRESOS",
                           DETALLE = item.Key,
                           PERIODO = Intervalo,
                           CAJA = caja,
                           MONEDA = moneda,
                           //MES =  item.FECHA.ToString("MMMM").ToUpper();
                           IMPORTE = -item.Sum(x => x.IMPORTE),
                           //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                       };
                    result.Add(res);
                    cnt++;
                }
                var detallePrestamos = managerPrestamos.BuscarTodos(x => x.ID_CAJA == ID_CAJA && x.ESTADO != "ANULADO" && x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin).GroupBy(y => y.SD_TIPOS_PRESTAMOS.NOMBRE);
                foreach (var item in detallePrestamos)
                {
                    EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                        {
                            NRO = cnt,
                            OPERACION = "EGRESOS",
                            SUBOPERACION = "PRESTAMOS",
                            DETALLE = item.Key,
                            PERIODO = Intervalo,
                            CAJA = caja,
                            MONEDA = moneda,
                            //MES =  item.FECHA.ToString("MMMM").ToUpper();
                            IMPORTE = -item.Sum(x => x.IMPORTE_PRESTAMO),
                            //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                        };
                    result.Add(res);
                    cnt++;
                }
                var detallesRetiros = managerRetiros.BuscarTodos(x => x.ID_CAJA == ID_CAJA && x.ESTADO != "ANULADO" && x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin).GroupBy(y => y.FECHA);
                foreach (var item in detallesRetiros)
                {
                    EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                       {
                           NRO = cnt,
                           OPERACION = "EGRESOS",
                           SUBOPERACION = "RETIROS AHORROS",
                           DETALLE = string.Format("RETIRO EN : {0}", item.Key.Value.ToString("dd/MM/yyyy")),
                           PERIODO = Intervalo,
                           CAJA = caja,
                           MONEDA = moneda,
                           //MES =  item.FECHA.ToString("MMMM").ToUpper();
                           IMPORTE = -item.Sum(x => x.RETIRO),
                           //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                       };
                    result.Add(res);
                    cnt++;
                }
                var detalleTransferenciasEgreso = managerTransferencias.BuscarTodos(x => x.ID_CAJA_ORIGEN == ID_CAJA && x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin);
                foreach (var item in detalleTransferenciasEgreso)
                {
                    EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                    {
                        NRO = cnt,
                        OPERACION = "EGRESOS",
                        SUBOPERACION = "TRANSFERENCIAS",
                        DETALLE = item.CONCEPTO,
                        PERIODO = Intervalo,
                        CAJA = caja,
                        MONEDA = moneda,
                        //MES =  item.FECHA.ToString("MMMM").ToUpper();
                        IMPORTE = -item.IMPORTE,
                        //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                    };
                    result.Add(res);
                    cnt++;
                }


            });
            return result;



        }

        public IEnumerable<EstadoResultadoCompletoModel> ReporteEstadoResultadoPorMoneda(string MONEDA, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            List<EstadoResultadoCompletoModel> result = new List<EstadoResultadoCompletoModel>();

            ExecuteManager(uow =>
            {
                DateTime Fecha_fin = FECHA_FIN.AddDays(1);
                string Intervalo = string.Format("{0} - {1}", FECHA_INI.ToString("dd/MM/yyyy"), FECHA_FIN.ToString("dd/MM/yyyy"));
                var managerCaja = new SD_CAJASManager(uow);
                var managerEgresos = new SD_EGRESOSManager(uow);
                var managerRegularizaciones = new SD_DETALLES_REGULARIZACIONESManager(uow);
                var managerDetalleHoja = new SD_DETALLES_HOJAS_CONTROLManager(uow);
                var managerIngresos = new SD_INGRESOSManager(uow);
                var managerIngresosSoscios = new SD_INGRESOS_POR_SOCIOSManager(uow);
                var managerPrestamos = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                var managerPagosPrestamos = new SD_PAGO_DE_PRESTAMOSManager(uow);
                var managerRetiros = new SD_RETIRO_SOCIO_MOVILManager(uow);
                var managerTransferencias = new SD_TRANSFERENCIASManager(uow);
                int cnt = 0;
                var moneda = MONEDA;
                var detalleshojas = managerDetalleHoja.BuscarTodos(x => x.SD_CAJAS.MONEDA == MONEDA && x.SD_HOJAS_CONTROL.ESTADO != "ANULADO" && x.SD_HOJAS_CONTROL.FECHA_COMPRA >= FECHA_INI && x.SD_HOJAS_CONTROL.FECHA_COMPRA < Fecha_fin);
                if (detalleshojas.Count() > 0)
                {
                    var detallegrupo = detalleshojas.GroupBy(x => new { x.SD_CAJAS.CODIGO, x.OBLIGACION });
                    if (detallegrupo.Count() > 0)
                    {
                        foreach (var item in detallegrupo)
                        {
                            EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                            {
                                NRO = cnt,
                                OPERACION = "INGRESOS",
                                SUBOPERACION = "VENTA DE HOJAS",
                                DETALLE = string.Format("{0} : {1}", item.Key.CODIGO, item.Key.OBLIGACION),
                                PERIODO = Intervalo,
                                MONEDA = moneda,
                                IMPORTE = item.Sum(x => x.IMPORTE),
                                //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                            };
                            result.Add(res);
                            cnt++;

                        }

                    }
                }
                var detalleregularizaciones = managerRegularizaciones.BuscarTodos(x => x.SD_CAJAS.MONEDA == MONEDA && x.SD_REGULARIZACIONES.ESTADO != "ANULADO" && x.SD_REGULARIZACIONES.FECHA_COMPRA >= FECHA_INI && x.SD_REGULARIZACIONES.FECHA_COMPRA < Fecha_fin);
                if (detalleregularizaciones.Count() > 0)
                {
                    var detallegrupoReg = detalleregularizaciones.GroupBy(x => new { x.SD_CAJAS.CODIGO, x.OBLIGACION });
                    if (detallegrupoReg.Count() > 0)
                    {
                        foreach (var item in detallegrupoReg)
                        {
                            EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                            {
                                NRO = cnt,
                                OPERACION = "INGRESOS",
                                SUBOPERACION = "REGULARIZACIONES",
                                DETALLE = string.Format("{0} : {1}", item.Key.CODIGO, item.Key.OBLIGACION),
                                PERIODO = Intervalo,
                                MONEDA = moneda,
                                //MES =  item.FECHA.ToString("MMMM").ToUpper();
                                IMPORTE = item.Sum(x => x.IMPORTE),
                                //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                            };
                            result.Add(res);
                            cnt++;

                        }

                    }
                }
                var detallesIngresosPorSocios = managerIngresosSoscios.BuscarTodos(x => x.SD_CAJAS.MONEDA == MONEDA && x.ESTADO != "ANULADO" && x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin);
                if (detallesIngresosPorSocios.Count() > 0)
                {
                    var grupoDetalleIngresosPorSocioss = detallesIngresosPorSocios.GroupBy(x => new { x.SD_CAJAS.CODIGO, x.SD_TIPOS_INGRESOS_SOCIO.NOMBRE });
                    if (grupoDetalleIngresosPorSocioss.Count() > 0)
                    {
                        foreach (var item in grupoDetalleIngresosPorSocioss)
                        {
                            EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                            {
                                NRO = cnt,
                                OPERACION = "INGRESOS",
                                SUBOPERACION = "DIVIDENDOS",
                                DETALLE = string.Format("{0} : {1}", item.Key.CODIGO, item.Key.NOMBRE),
                                PERIODO = Intervalo,
                                MONEDA = moneda,
                                //MES =  item.FECHA.ToString("MMMM").ToUpper();
                                IMPORTE = item.Sum(x => x.IMPORTE),
                                //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                            };
                            result.Add(res);
                            cnt++;
                        }
                    }
                }
                var detallesPagosPrestamos = managerPagosPrestamos.BuscarTodos(x => x.SD_CAJAS.MONEDA == MONEDA && x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin && x.ESTADO != "ANULADO").GroupBy(y => new { y.SD_CAJAS.CODIGO, y.SD_PRESTAMOS_POR_SOCIOS.SD_TIPOS_PRESTAMOS.NOMBRE });
                if (detallesPagosPrestamos.Count() > 0)
                {
                    foreach (var item in detallesPagosPrestamos)
                    {
                        EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                        {
                            NRO = cnt,
                            OPERACION = "INGRESOS",
                            SUBOPERACION = "PAGO DE PRESTAMOS",
                            DETALLE = string.Format("{0} : {1}", item.Key.CODIGO, item.Key.NOMBRE),
                            PERIODO = Intervalo,
                            MONEDA = moneda,
                            //MES =  item.FECHA.ToString("MMMM").ToUpper();
                            IMPORTE = item.Sum(x => x.IMPORTE),
                            //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                        };
                        result.Add(res);
                        cnt++;
                    }
                }
                var detalleTransferencias = managerTransferencias.BuscarTodos(x => x.SD_CAJAS1.MONEDA == MONEDA && x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin);
                foreach (var item in detalleTransferencias)
                {
                    EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                    {
                        NRO = cnt,
                        OPERACION = "INGRESOS",
                        SUBOPERACION = "TRANSFERENCIAS",
                        DETALLE = string.Format("{0} - {1}", item.SD_CAJAS1.CODIGO, item.CONCEPTO),
                        PERIODO = Intervalo,
                        MONEDA = moneda,
                        //MES =  item.FECHA.ToString("MMMM").ToUpper();
                        IMPORTE = item.IMPORTE,
                        //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                    };
                    result.Add(res);
                    cnt++;
                }
                var detalleEgresos = managerEgresos.BuscarTodos(x => x.SD_CAJAS.MONEDA == MONEDA && x.ESTADO != "ANULADO" && x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin).GroupBy(y => new { y.SD_CAJAS.CODIGO, y.SD_TIPOS_EGRESOS.NOMBRE });
                foreach (var item in detalleEgresos)
                {
                    EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                    {
                        NRO = cnt,
                        OPERACION = "EGRESOS",
                        SUBOPERACION = "OTROS EGRESOS",
                        DETALLE = string.Format("{0} : {1}", item.Key.CODIGO, item.Key.NOMBRE),
                        PERIODO = Intervalo,
                        MONEDA = moneda,
                        //MES =  item.FECHA.ToString("MMMM").ToUpper();
                        IMPORTE = -item.Sum(x => x.IMPORTE),
                        //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                    };
                    result.Add(res);
                    cnt++;
                }
                var detallePrestamos = managerPrestamos.BuscarTodos(x => x.SD_CAJAS.MONEDA == MONEDA && x.ESTADO != "ANULADO" && x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin).GroupBy(y => new { y.SD_CAJAS.CODIGO, y.SD_TIPOS_PRESTAMOS.NOMBRE });
                foreach (var item in detallePrestamos)
                {
                    EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                    {
                        NRO = cnt,
                        OPERACION = "EGRESOS",
                        SUBOPERACION = "PRESTAMOS",
                        DETALLE = string.Format("{0} : {1}", item.Key.CODIGO, item.Key.NOMBRE),
                        PERIODO = Intervalo,
                        MONEDA = moneda,
                        //MES =  item.FECHA.ToString("MMMM").ToUpper();
                        IMPORTE = -item.Sum(x => x.IMPORTE_PRESTAMO),
                        //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                    };
                    result.Add(res);
                    cnt++;
                }
                var detallesRetiros = managerRetiros.BuscarTodos(x => x.SD_CAJAS.MONEDA == MONEDA && x.ESTADO != "ANULADO" && x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin).GroupBy(y => new { y.SD_CAJAS.CODIGO, y.FECHA });
                foreach (var item in detallesRetiros)
                {
                    EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                    {
                        NRO = cnt,
                        OPERACION = "EGRESOS",
                        SUBOPERACION = "RETIROS AHORROS",
                        DETALLE = string.Format("{0} - RETIRO EN : {1}", item.Key.CODIGO, item.Key.FECHA.Value.ToString("dd/MM/yyyy")),
                        PERIODO = Intervalo,
                        MONEDA = moneda,
                        //MES =  item.FECHA.ToString("MMMM").ToUpper();
                        IMPORTE = -item.Sum(x => x.RETIRO),
                        //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                    };
                    result.Add(res);
                    cnt++;
                }
                var detalleTransferenciasEgreso = managerTransferencias.BuscarTodos(x => x.SD_CAJAS.MONEDA == MONEDA && x.FECHA >= FECHA_INI && x.FECHA < Fecha_fin);
                foreach (var item in detalleTransferenciasEgreso)
                {
                    EstadoResultadoCompletoModel res = new EstadoResultadoCompletoModel()
                    {
                        NRO = cnt,
                        OPERACION = "EGRESOS",
                        SUBOPERACION = "TRANSFERENCIAS",
                        DETALLE = string.Format("{0} - {1}", item.SD_CAJAS.CODIGO, item.CONCEPTO),
                        PERIODO = Intervalo,
                        MONEDA = moneda,
                        //MES =  item.FECHA.ToString("MMMM").ToUpper();
                        IMPORTE = -item.IMPORTE,
                        //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                    };
                    result.Add(res);
                    cnt++;
                }


            });
            return result;



        }

        public IEnumerable<ReporteMatrizHojas> ReporteMatrizHojasAhorro(DateTime FECHA_INI, DateTime FECHA_FIN, string reporte = "AHORRO")
        {
            List<ReporteMatrizHojas> result = new List<ReporteMatrizHojas>();

            ExecuteManager(uow =>
            {
                var managerCierre = new SD_CIERRES_CAJASManager(uow);
                var managerDetalleCierre = new SD_DETALLE_CIERRES_AHORROManager(uow);
                managerDetalleCierre.generarPagosAhorros("reporte");
                DateTime fecha_fin = FECHA_FIN.AddDays(1);
                var detallescierre = managerDetalleCierre.BuscarTodos(x => x.SD_CIERRES.FECHA_INI >= FECHA_INI && x.SD_CIERRES.FECHA_FIN < fecha_fin).OrderBy(y => y.SD_CIERRES.FECHA_INI);
                foreach (var item in detallescierre)
                {
                    result.Add(new ReporteMatrizHojas()
                    {
                        NRO_MOVIL = (int)item.NRO_MOVIL,
                        SOCIO = item.SOCIO,
                        FECHA_INI = item.SD_CIERRES.FECHA_INI,
                        PERIODO = string.Format("{0} al {1}", item.SD_CIERRES.FECHA_INI.ToString("dd-MM-yyy"), item.SD_CIERRES.FECHA_FIN.ToString("dd-MM-yyyy")),
                        TOTAL = reporte == "AHORRO" ? item.TOTAL_AHORRO : reporte == "DEBE" ? (item.TOTAL_AHORRO - item.TOTAL_CANCELADO) : item.TOTAL_CANCELADO,

                    });

                }
            });
            result.OrderBy(x => x.FECHA_INI);
            return result;
        }

        public IEnumerable<SocioReporteKardexMovil> ReporteKardexMovilSocio(int ID_SOCIO_MOVIL)
        {
            List<SocioReporteKardexMovil> result = new List<SocioReporteKardexMovil>();
            return result;
        }
        public IEnumerable<KardexMovilReporte> ReporteKardexMovil() {
            List<KardexMovilReporte> result = new List<KardexMovilReporte>();
            return result;
         
        }

        public IEnumerable<KardexNroMovilReporte> ReporteKardexNroMovil()
        {
            List<KardexNroMovilReporte> result = new List<KardexNroMovilReporte>();
            return result;

        }

    }
}
