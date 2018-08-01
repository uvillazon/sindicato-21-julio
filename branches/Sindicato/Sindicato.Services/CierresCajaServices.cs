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
using Newtonsoft.Json;

namespace Sindicato.Services
{
    public class CierresCajaServices : BaseService, ICierresCajaServices
    {
        public IEnumerable<SD_CIERRES_CAJAS> ObtenerCierresPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_CIERRES_CAJAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_CIERRES_CAJASManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_DETALLE_CIERRES_CAJA> ObtenerDetallesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_DETALLE_CIERRES_CAJA> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLE_CIERRES_CAJAManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;

                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;

        }

        public SD_CIERRES_CAJAS ObtenerUltimoRegistroCierre()
        {
            SD_CIERRES_CAJAS result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_CIERRES_CAJASManager(uow);
                result = manager.BuscarTodos().OrderByDescending(x => x.ID_CIERRE).FirstOrDefault();
            });
            return result;
        }

        public RespuestaSP GuardarCierre(SD_CIERRES_CAJAS cierre, string detalles, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_CIERRES_CAJASManager(uow);
                var managerDetalle = new SD_DETALLE_CIERRES_CAJAManager(uow);
                var managerHojas = new SD_HOJAS_CONTROLManager(uow);
                var managerReg = new SD_REGULARIZACIONESManager(uow);
                var managerEgresos = new SD_EGRESOSManager(uow);
                var managerIngresos = new SD_INGRESOSManager(uow);
                var managerIngresosSoscios = new SD_INGRESOS_POR_SOCIOSManager(uow);
                var managerPrestamos = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                var managerPagosPrestamos = new SD_PAGO_DE_PRESTAMOSManager(uow);
                var managerRetiros = new SD_RETIRO_SOCIO_MOVILManager(uow);
                var managerTransferencias = new SD_TRANSFERENCIASManager(uow);
                var resp = manager.GuardarCierre(cierre, login);
                int id_venta;
                bool esNumero = int.TryParse(resp, out id_venta);
                if (esNumero)
                {
                    dynamic detalle_ventas = JsonConvert.DeserializeObject(detalles);
                    foreach (var item in detalle_ventas)
                    {
                        var cant = item.ID_SOCIO_MOVIL;
                        SD_DETALLE_CIERRES_CAJA det = new SD_DETALLE_CIERRES_CAJA()
                        {
                            ID_CIERRE = id_venta,
                            ID_DETALLE = managerDetalle.ObtenerSecuencia(),
                            ID_CAJA = item.ID_CAJA,
                            SALDO = item.SALDO,
                            ESTADO = "NUEVO",
                            FECHA_REG = DateTime.Now,
                            LOGIN = login,
                            OBSERVACION = cierre.OBSERVACION,


                        };
                        managerDetalle.Add(det);
                    }
                    DateTime fecha_fin = cierre.FECHA_FIN.AddDays(1);

                    var ingresosSocios = managerIngresosSoscios.BuscarTodos(x => x.ESTADO == "NUEVO" && x.FECHA >= cierre.FECHA_INI && x.FECHA < fecha_fin);
                    foreach (var item in ingresosSocios)
                    {
                        item.ESTADO = "APROBADO";
                    }

                    var detallesPagosPrestamos = managerPagosPrestamos.BuscarTodos(x => x.FECHA >= cierre.FECHA_INI && x.FECHA < fecha_fin && x.ESTADO == "NUEVO");
                    foreach (var item in detallesPagosPrestamos)
                    {
                        item.ESTADO = "APROBADO";
                    }

                    var detalleTransferencias = managerTransferencias.BuscarTodos(x => x.FECHA >= cierre.FECHA_INI && x.FECHA < fecha_fin && x.ESTADO == "NUEVO");
                    foreach (var item in detalleTransferencias)
                    {
                        item.ESTADO = "APROBADO";
                    }

                    var detalleEgresos = managerEgresos.BuscarTodos(x => x.ESTADO == "NUEVO" && x.FECHA >= cierre.FECHA_INI && x.FECHA < fecha_fin);
                    foreach (var item in detalleEgresos)
                    {
                        item.ESTADO = "APROBADO";
                    }

                    var detallePrestamos = managerPrestamos.BuscarTodos(x => x.ESTADO_CIERRE == "NUEVO" && x.FECHA >= cierre.FECHA_INI && x.FECHA < fecha_fin);
                    foreach (var item in detallePrestamos)
                    {
                        item.ESTADO_CIERRE = "APROBADO";
                    }

                    var detallesRetiros = managerRetiros.BuscarTodos(x => x.ESTADO == "ACTIVO" && x.FECHA >= cierre.FECHA_INI && x.FECHA < fecha_fin);
                    foreach (var item in detallesRetiros)
                    {
                        item.ESTADO = "APROBADO";
                    }
                    //vamos a poner en APROBADO todas las ventas de hoja
                    //var ventas = managerHojas.BuscarTodos(x => x.FECHA_COMPRA >= cierre.FECHA_INI && x.FECHA_COMPRA < fecha_fin && x.ESTADO == "NUEVO");
                    //foreach (var item in ventas)
                    //{
                    //    item.ESTADO = "APROBADO";
                    //}
                    //var regulaciones = managerReg.BuscarTodos(x => x.FECHA_COMPRA >= cierre.FECHA_INI && x.FECHA_COMPRA < fecha_fin && x.ESTADO == "NUEVO");
                    //foreach (var item in regulaciones)
                    //{
                    //    item.ESTADO = "APROBADO";
                    //}

                    result.msg = "Proceso Ejecutado Correctamente.";
                    result.success = true;
                    result.id = cierre.ID_CIERRE;

                }
                else
                {
                    result.msg = resp.ToString();
                    result.success = false;
                }

            });
            return result;
        }

        public IEnumerable<CierreCajaModel> ObtenerCierreCajaGenerado(DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            List<CierreCajaModel> result = new List<CierreCajaModel>();
            ExecuteManager(uow =>
            {

                var managerCaja = new SD_CAJASManager(uow);
                var managerEgresos = new SD_EGRESOSManager(uow);
                var managerIngresos = new SD_INGRESOSManager(uow);
                var managerIngresosSoscios = new SD_INGRESOS_POR_SOCIOSManager(uow);
                var managerRegularizaciones = new SD_DETALLES_REGULARIZACIONESManager(uow);
                var managerDetalleHoja = new SD_DETALLES_HOJAS_CONTROLManager(uow);
                var managerPrestamos = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                var managerPagosPrestamos = new SD_PAGO_DE_PRESTAMOSManager(uow);
                var managerRetiros = new SD_RETIRO_SOCIO_MOVILManager(uow);
                var managerTransferencias = new SD_TRANSFERENCIASManager(uow);
                string msg = "";
                DateTime fecha_fin = FECHA_FIN.AddDays(1);

                var detalleshojas = managerDetalleHoja.BuscarTodos(x => x.SD_HOJAS_CONTROL.ESTADO != "ANULADO" && x.SD_HOJAS_CONTROL.FECHA_COMPRA >= FECHA_INI && x.SD_HOJAS_CONTROL.FECHA_COMPRA < fecha_fin).GroupBy(y => new { y.SD_CAJAS.CODIGO, y.ID_CAJA, y.SD_CAJAS.MONEDA });
                if (detalleshojas.Count() > 0)
                {
                    foreach (var item in detalleshojas)
                    {

                        CierreCajaModel res = new CierreCajaModel()
                        {
                            SUBOPERACION = "VENTA DE HOJAS",
                            OPERACION = "INGRESOS",
                            CAJA = item.Key.CODIGO,
                            MONEDA = item.Key.MONEDA,
                            ID_CAJA = item.Key.ID_CAJA,
                            SALDO = item.Sum(x => x.IMPORTE)
                        };
                        result.Add(res);
                    }
                }
                var detalleregularizaciones = managerRegularizaciones.BuscarTodos(x => x.SD_REGULARIZACIONES.ESTADO != "ANULADO" && x.SD_REGULARIZACIONES.FECHA_COMPRA >= FECHA_INI && x.SD_REGULARIZACIONES.FECHA_COMPRA < fecha_fin).GroupBy(y => new { y.SD_CAJAS.CODIGO, y.ID_CAJA, y.SD_CAJAS.MONEDA });
                if (detalleregularizaciones.Count() > 0)
                {
                    foreach (var item in detalleshojas)
                    {

                        CierreCajaModel res = new CierreCajaModel()
                        {
                            SUBOPERACION = "REGULARIZACIONES",
                            OPERACION = "INGRESOS",
                            CAJA = item.Key.CODIGO,
                            MONEDA = item.Key.MONEDA,
                            ID_CAJA = item.Key.ID_CAJA,
                            SALDO = item.Sum(x => x.IMPORTE)
                        };
                        result.Add(res);
                    }
                }


                var detallesIngresosPorSocios = managerIngresosSoscios.BuscarTodos(x => x.ESTADO == "NUEVO" && x.FECHA >= FECHA_INI && x.FECHA < fecha_fin).GroupBy(y => new { y.SD_CAJAS.CODIGO, y.ID_CAJA, y.SD_CAJAS.MONEDA });
                if (detallesIngresosPorSocios.Count() > 0)
                {
                    foreach (var item in detallesIngresosPorSocios)
                    {

                        CierreCajaModel res = new CierreCajaModel()
                           {
                               SUBOPERACION = "DIVIDENDOS",
                               OPERACION = "INGRESOS",
                               CAJA = item.Key.CODIGO,
                               MONEDA = item.Key.MONEDA,
                               ID_CAJA = item.Key.ID_CAJA,
                               SALDO = item.Sum(x => x.IMPORTE)
                           };
                        result.Add(res);
                    }
                }
                var detallesPagosPrestamos = managerPagosPrestamos.BuscarTodos(x=> x.FECHA >= FECHA_INI && x.FECHA < fecha_fin && x.ESTADO == "NUEVO").GroupBy(y => new { y.SD_CAJAS.CODIGO, y.ID_CAJA,y.SD_CAJAS.MONEDA });
                if (detallesPagosPrestamos.Count() > 0)
                {
                    foreach (var item in detallesPagosPrestamos)
                    {

                        CierreCajaModel res = new CierreCajaModel()
                        {
                            SUBOPERACION = "PAGO DE PRESTAMOS",
                            OPERACION = "INGRESOS",
                            CAJA = item.Key.CODIGO,
                            MONEDA = item.Key.MONEDA,
                            ID_CAJA = item.Key.ID_CAJA,
                            SALDO = item.Sum(x => x.IMPORTE)
                        };
                        result.Add(res);
                    }
                }
                var detalleTransferencias = managerTransferencias.BuscarTodos(x =>  x.FECHA >= FECHA_INI && x.FECHA < fecha_fin && x.ESTADO == "NUEVO").GroupBy(y => new { y.SD_CAJAS1.CODIGO, y.ID_CAJA_DESTINO,y.SD_CAJAS1.MONEDA });
                foreach (var item in detalleTransferencias)
                {
                    CierreCajaModel res = new CierreCajaModel()
                    {
                        SUBOPERACION = "TRANSFERENCIAS",
                        OPERACION = "INGRESOS",
                        CAJA = item.Key.CODIGO,
                        MONEDA = item.Key.MONEDA,
                        ID_CAJA = item.Key.ID_CAJA_DESTINO,
                        SALDO = item.Sum(x => x.IMPORTE)
                    };
                    result.Add(res);
                }
                var detalleEgresos = managerEgresos.BuscarTodos(x =>  x.ESTADO == "NUEVO" && x.FECHA >= FECHA_INI && x.FECHA < fecha_fin).GroupBy(y => new { y.SD_CAJAS.CODIGO,y.ID_CAJA ,y.SD_CAJAS.MONEDA });
                foreach (var item in detalleEgresos)
                {
                    CierreCajaModel res = new CierreCajaModel()
                    {
                        SUBOPERACION = "OTROS EGRESOS",
                        OPERACION = "EGRESOS",
                        CAJA = item.Key.CODIGO,
                        MONEDA = item.Key.MONEDA,
                        ID_CAJA = item.Key.ID_CAJA,
                        SALDO = -item.Sum(x => x.IMPORTE)
                    };
                    result.Add(res);
                }
                var detallePrestamos = managerPrestamos.BuscarTodos(x =>x.ESTADO_CIERRE == "NUEVO" && x.FECHA >= FECHA_INI && x.FECHA < fecha_fin).GroupBy(y => new { y.SD_CAJAS.CODIGO, y.ID_CAJA , y.SD_CAJAS.MONEDA });
                foreach (var item in detallePrestamos)
                {
                    CierreCajaModel res = new CierreCajaModel()
                    {
                        SUBOPERACION = "PRESTAMOS",
                        OPERACION = "EGRESOS",
                        CAJA = item.Key.CODIGO,
                        MONEDA = item.Key.MONEDA,
                        ID_CAJA = item.Key.ID_CAJA,
                        SALDO = -item.Sum(x => x.IMPORTE_PRESTAMO)
                    };
                    result.Add(res);
                }
                var detallesRetiros = managerRetiros.BuscarTodos(x => x.ESTADO == "ACTIVO" && x.FECHA >= FECHA_INI && x.FECHA < fecha_fin).GroupBy(y => new { y.SD_CAJAS.CODIGO, y.ID_CAJA , y.SD_CAJAS.MONEDA });
                foreach (var item in detallesRetiros)
                {
                    CierreCajaModel res = new CierreCajaModel()
                    {
                        OPERACION = "EGRESOS",
                        SUBOPERACION = "RETIROS AHORROS",
                        CAJA = item.Key.CODIGO,
                        MONEDA = item.Key.MONEDA,
                        ID_CAJA = item.Key.ID_CAJA,
                        SALDO = -item.Sum(x => x.RETIRO)
                    };
                    result.Add(res);
                }

                var detalleTransferenciasEgreso = managerTransferencias.BuscarTodos(x => x.ESTADO == "NUEVO" && x.FECHA >= FECHA_INI && x.FECHA < fecha_fin).GroupBy(y => new { y.SD_CAJAS.CODIGO, y.ID_CAJA_ORIGEN, y.SD_CAJAS.MONEDA });
                foreach (var item in detalleTransferenciasEgreso)
                {
                    CierreCajaModel res = new CierreCajaModel()
                    {
                        OPERACION = "EGRESOS",
                        SUBOPERACION = "TRANSFERENCIAS",
                        CAJA = item.Key.CODIGO,
                        MONEDA = item.Key.MONEDA,
                        ID_CAJA = item.Key.ID_CAJA_ORIGEN,
                        SALDO = -item.Sum(x => x.IMPORTE)
                        //UTILIDA_BRUTA_NETA = (decimal)(totalventa - totalcosto)
                    };
                    result.Add(res);
                }

                //falta transferencias egresos y retiros egresso

            });
            //return result;
            return result.GroupBy(x => new { x.CAJA, x.ID_CAJA, x.MONEDA }).Select(y => new CierreCajaModel
            {
                ID_CAJA = y.Key.ID_CAJA,
                CAJA = y.Key.CAJA,
                MONEDA = y.Key.MONEDA,
                SALDO = y.Max(z => z.SALDO)
            });
        }

        //public IEnumerable<SD_CIERRES> ObtenerCierresPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        //{
        //    IQueryable<SD_CIERRES> result = null;
        //    ExecuteManager(uow =>
        //    {
        //        var manager = new SD_CIERRESManager(uow);

        //        result = manager.BuscarTodos();
        //        filtros.FiltrarDatos();
        //        result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
        //        paginacion.total = result.Count();

        //        result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

        //    });
        //    return result;
        //}


        //public IEnumerable<CierreAhorroSocioMovilModel> ObtenerCierreAhorroSocioMovil(DateTime FECHA_INI, DateTime FECHA_FIN)
        //{
        //    List<CierreAhorroSocioMovilModel> result = new List<CierreAhorroSocioMovilModel>();
        //    ExecuteManager(uow =>
        //    {

        //        var managerSocio = new SD_SOCIOSManager(uow);
        //        var managerSociosMovil = new SD_SOCIO_MOVILESManager(uow);
        //        var managerHojas = new SD_HOJAS_CONTROLManager(uow);
        //        var managerReg = new SD_REGULARIZACIONESManager(uow);
        //        var managerOblig = new SD_OBLIGACIONES_HOJAManager(uow);
        //        decimal? cant_hojas = 0;
        //        decimal? cant_regulaciones = 0;
        //        decimal? ahorro_hojas = 0;
        //        decimal? ahorro_regulaciones = 0;
        //        string msg = "";
        //        DateTime fecha_fin = FECHA_FIN.AddDays(1);

        //        //cant_hojas = 0;

        //        //cant_regulaciones = 0;
        //        //ahorro_hojas = 0;
        //        //ahorro_regulaciones = 0;
        //        //msg = "";
        //        var sociosMovil = managerSociosMovil.BuscarTodos(x => x.ESTADO == "ACTIVO");
        //        var obligAhorro = managerOblig.BuscarTodos(x => x.OBLIGACION == "AHORRO").FirstOrDefault();

        //        if (sociosMovil.Count() > 0)
        //        {
        //            foreach (var item1 in sociosMovil)
        //            {
        //                decimal? cant_hojas_mov = 0;
        //                decimal? cant_regulaciones_mov = 0;
        //                decimal? ahorro_hojas_mov = 0;
        //                decimal? ahorro_regulaciones_mov = 0;
        //                cant_hojas_mov = item1.SD_HOJAS_CONTROL.Where(x => x.ESTADO == "NUEVO" && x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < fecha_fin).Count();
        //                cant_hojas = cant_hojas + cant_hojas_mov;
        //                cant_regulaciones_mov = item1.SD_REGULARIZACIONES.Where(x => x.ESTADO == "NUEVO" && x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < fecha_fin).Sum(x => x.CANTIDAD);
        //                cant_regulaciones = cant_regulaciones + cant_regulaciones_mov;
        //                var detalleHojas = item1.SD_HOJAS_CONTROL.Where(x => x.ESTADO == "NUEVO" && x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < fecha_fin);
        //                foreach (var det in detalleHojas)
        //                {
        //                    ahorro_hojas_mov = ahorro_hojas_mov + det.SD_DETALLES_HOJAS_CONTROL.Where(x => x.OBLIGACION == "AHORRO").Sum(x => x.IMPORTE);
        //                    ahorro_hojas = ahorro_hojas + ahorro_hojas_mov;
        //                }
        //                var detalleReg = item1.SD_REGULARIZACIONES.Where(x => x.ESTADO == "NUEVO" && x.FECHA_COMPRA >= FECHA_INI && x.FECHA_COMPRA < fecha_fin);
        //                foreach (var reg in detalleReg)
        //                {
        //                    ahorro_regulaciones_mov = ahorro_regulaciones_mov + reg.SD_DETALLES_REGULARIZACIONES.Where(x => x.OBLIGACION == "AHORRO").Sum(x => x.IMPORTE);
        //                    ahorro_regulaciones = ahorro_regulaciones + ahorro_regulaciones_mov;
        //                }
        //                //msg = string.Format("{0}  Movil : {1}  Hojas => {2} ,Ahorro Por Hojas => {3} , Regulaciones => {4} , Ahorro por Regulacion => {5}", msg, item1.SD_MOVILES.NRO_MOVIL, cant_hojas_mov, ahorro_hojas_mov, cant_regulaciones_mov, ahorro_regulaciones_mov);
        //                CierreAhorroSocioMovilModel res = new CierreAhorroSocioMovilModel()
        //                {
        //                    ID_SOCIO_MOVIL = item1.ID_SOCIO_MOVIL,
        //                    SOCIO = item1.ObtenerNombreSocio(),
        //                    NRO_MOVIL = item1.SD_MOVILES.NRO_MOVIL,
        //                    CANT_HOJAS = cant_hojas_mov,
        //                    CANT_REGULACIONES = cant_regulaciones_mov,
        //                    AHORRO_HOJA = ahorro_hojas_mov,
        //                    AHORRO_REGULACIONES = ahorro_regulaciones_mov,
        //                    AHORRO = cant_hojas_mov * (decimal?)obligAhorro.IMPORTE_DEFECTO,
        //                    AHORRO_PAGADO = (cant_hojas_mov * (decimal?)obligAhorro.IMPORTE_DEFECTO) - ahorro_hojas_mov,
        //                    TOTAL_AHORRO = ahorro_hojas_mov + ahorro_regulaciones_mov,
        //                    MSG = "",
        //                    FECHA_INI = FECHA_INI,
        //                    FECHA_FIN = FECHA_FIN

        //                };
        //                result.Add(res);
        //            }
        //        }

        //    });
        //    return result;
        //}
        //public RespuestaSP GuardarCierre(SD_CIERRES cierre, string detalles, string login)
        //{
        //    RespuestaSP result = new RespuestaSP();
        //    ExecuteManager(uow =>
        //    {
        //        var manager = new SD_CIERRESManager(uow);
        //        var managerDetalle = new SD_DETALLE_CIERRES_AHORROManager(uow);
        //        var managerHojas = new SD_HOJAS_CONTROLManager(uow);
        //        var managerReg = new SD_REGULARIZACIONESManager(uow);
        //        var resp = manager.GuardarCierre(cierre, login);
        //        int id_venta;
        //        bool esNumero = int.TryParse(resp, out id_venta);
        //        if (esNumero)
        //        {
        //            dynamic detalle_ventas = JsonConvert.DeserializeObject(detalles);
        //            foreach (var item in detalle_ventas)
        //            {
        //                var cant = item.ID_SOCIO_MOVIL;
        //                SD_DETALLE_CIERRES_AHORRO det = new SD_DETALLE_CIERRES_AHORRO()
        //                {
        //                    ID_CIERRE = id_venta,
        //                    ID_DETALLE = managerDetalle.ObtenerSecuencia(),
        //                    ID_SOCIO_MOVIL = item.ID_SOCIO_MOVIL,
        //                    CANT_HOJAS = item.CANT_HOJAS,
        //                    CANT_REGULACIONES = item.CANT_REGULACIONES,
        //                    ESTADO = "NUEVO",
        //                    AHORRO_HOJA = item.AHORRO_HOJA,
        //                    AHORRO_REGULACIONES = item.AHORRO_REGULACIONES,
        //                    TOTAL_AHORRO = item.TOTAL_AHORRO,
        //                    FECHA_REG = DateTime.Now,
        //                    LOGIN = login,
        //                    OBSERVACION = cierre.OBSERVACION,
        //                    SOCIO = item.SOCIO,
        //                    NRO_MOVIL = item.NRO_MOVIL


        //                };
        //                managerDetalle.Add(det);
        //            }
        //            DateTime fecha_fin = cierre.FECHA_FIN.AddDays(1);
        //            //vamos a poner en APROBADO todas las ventas de hoja
        //            var ventas = managerHojas.BuscarTodos(x => x.FECHA_COMPRA >= cierre.FECHA_INI && x.FECHA_COMPRA < fecha_fin && x.ESTADO == "NUEVO");
        //            foreach (var item in ventas)
        //            {
        //                item.ESTADO = "APROBADO";
        //            }
        //            var regulaciones = managerReg.BuscarTodos(x => x.FECHA_COMPRA >= cierre.FECHA_INI && x.FECHA_COMPRA < fecha_fin && x.ESTADO == "NUEVO");
        //            foreach (var item in regulaciones)
        //            {
        //                item.ESTADO = "APROBADO";
        //            }

        //            result.msg = "Proceso Ejecutado Correctamente.";
        //            result.success = true;
        //            result.id = cierre.ID_CIERRE;

        //        }
        //        else
        //        {
        //            result.msg = resp.ToString();
        //            result.success = false;
        //        }

        //    });
        //    ExecuteManager(uow =>
        //    {
        //        var context = (SindicatoContext)uow.Context;
        //        ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
        //        context.P_SD_ACT_KARDEX_CIERRE_AHORRO(result.id, login, p_res);
        //        if (p_res.Value.ToString() == "1")
        //        {
        //            result.success = true;
        //            result.msg = "Proceso Ejecutado Correctamente";
        //        }
        //        else
        //        {
        //            result.success = false;
        //            result.msg = p_res.Value.ToString();
        //        }
        //    });
        //    return result;
        //}


        //public IEnumerable<SD_DETALLE_CIERRES_AHORRO> ObtenerDetallesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        //{
        //    IQueryable<SD_DETALLE_CIERRES_AHORRO> result = null;
        //    ExecuteManager(uow =>
        //    {
        //        var manager = new SD_DETALLE_CIERRES_AHORROManager(uow);

        //        result = manager.BuscarTodos();
        //        filtros.FiltrarDatos();
        //        result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;

        //        if (!string.IsNullOrEmpty(filtros.codigo))
        //        {
        //            switch (filtros.codigo)
        //            {
        //                case "POR_CANCELAR":
        //                    result = result.Where(x => (x.TOTAL_AHORRO - x.TOTAL_CANCELADO) > 0);
        //                    break;
        //                default:
        //                    break;
        //            }
        //        }

        //        paginacion.total = result.Count();

        //        result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

        //    });
        //    return result;
        //}



    }
}
