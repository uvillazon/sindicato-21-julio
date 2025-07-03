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

                    var detallesRetiros = managerRetiros.BuscarTodos(x => x.ESTADO == "NUEVO" && x.FECHA >= cierre.FECHA_INI && x.FECHA < fecha_fin);
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
                var grupo = result.GroupBy(x => x.CAJA).Select(y => new { total = y.Sum(z => z.SALDO), caja = y.Key });
                var detalleregularizaciones = managerRegularizaciones.BuscarTodos(x => x.SD_REGULARIZACIONES.ESTADO != "ANULADO" && x.SD_REGULARIZACIONES.FECHA_COMPRA >= FECHA_INI && x.SD_REGULARIZACIONES.FECHA_COMPRA < fecha_fin).GroupBy(y => new { y.SD_CAJAS.CODIGO, y.ID_CAJA, y.SD_CAJAS.MONEDA });
                if (detalleregularizaciones.Count() > 0)
                {
                    foreach (var item in detalleregularizaciones)
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
                var grupo1 = result.GroupBy(x => x.CAJA).Select(y => new { total = y.Sum(z => z.SALDO), caja = y.Key });

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
                var grupo2 = result.GroupBy(x => x.CAJA).Select(y => new { total = y.Sum(z => z.SALDO), caja = y.Key });

                var detallesPagosPrestamos = managerPagosPrestamos.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < fecha_fin && x.ESTADO == "NUEVO").GroupBy(y => new { y.SD_CAJAS.CODIGO, y.ID_CAJA, y.SD_CAJAS.MONEDA });
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
                var detalleTransferencias = managerTransferencias.BuscarTodos(x => x.FECHA >= FECHA_INI && x.FECHA < fecha_fin && x.ESTADO == "NUEVO").GroupBy(y => new { y.SD_CAJAS1.CODIGO, y.ID_CAJA_DESTINO, y.SD_CAJAS1.MONEDA });
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
                var grupo5 = result.GroupBy(x => x.CAJA).Select(y => new { total = y.Sum(z => z.SALDO), caja = y.Key });

                var detalleEgresos = managerEgresos.BuscarTodos(x => x.ESTADO == "NUEVO" && x.FECHA >= FECHA_INI && x.FECHA < fecha_fin).GroupBy(y => new { y.SD_CAJAS.CODIGO, y.ID_CAJA, y.SD_CAJAS.MONEDA });
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
                var detallePrestamos = managerPrestamos.BuscarTodos(x => x.ESTADO_CIERRE == "NUEVO" && x.FECHA >= FECHA_INI && x.FECHA < fecha_fin).GroupBy(y => new { y.SD_CAJAS.CODIGO, y.ID_CAJA, y.SD_CAJAS.MONEDA });
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

                var detallesRetiros = managerRetiros.BuscarTodos(x => x.ESTADO == "NUEVO" && x.FECHA >= FECHA_INI && x.FECHA < fecha_fin).GroupBy(y => new { y.SD_CAJAS.CODIGO, y.ID_CAJA, y.SD_CAJAS.MONEDA });
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
                var grupo3 = result.GroupBy(x => x.CAJA).Select(y => new { total = y.Sum(z => z.SALDO), caja = y.Key });

                //falta transferencias egresos y retiros egresso

            });
            //return result;
            return result.GroupBy(x => new { x.CAJA, x.ID_CAJA, x.MONEDA }).Select(y => new CierreCajaModel
            {
                ID_CAJA = y.Key.ID_CAJA,
                CAJA = y.Key.CAJA,
                MONEDA = y.Key.MONEDA,
                SALDO = y.Sum(z => z.SALDO)
            });
        }

        public IEnumerable<SD_CAJAS_CIERRES> ObtenerCierresCajasParcialesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_CAJAS_CIERRES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_CAJAS_CIERRESManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_DETALLE_CAJA_CIERRE> ObtenerCierresCajasParcialesDetallesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_DETALLE_CAJA_CIERRE> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLE_CAJA_CIERREManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }



        public SD_CAJAS_CIERRES ObtenerUltimoRegistroCajasCierre(int ID_CAJA)
        {
            SD_CAJAS_CIERRES result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_CAJAS_CIERRESManager(uow);
                var managerKardex = new SD_KARDEX_EFECTIVOManager(uow);

                result = manager.BuscarTodos(x => x.ID_CAJA == ID_CAJA).OrderByDescending(x => x.ID_CIERRE).FirstOrDefault();

            });
            return result;
        }

        public IEnumerable<CierreCajaModel> ObtenerCierreCajaParcialDetalle(int ID_CIERRE)
        {
            List<CierreCajaModel> result = new List<CierreCajaModel>();
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLE_CAJA_CIERREManager(uow);
                var detalles = manager.BuscarTodos(x => x.ID_CIERRE == ID_CIERRE);
                foreach (var item in detalles)
                {
                    CierreCajaModel res = new CierreCajaModel()
                   {
                       ID_KARDEX = (int)item.ID_KARDEX,
                       FECHA = item.FECHA,
                       FECHA_FIN = item.SD_CAJAS_CIERRES.FECHA_FIN,
                       FECHA_INI = item.SD_CAJAS_CIERRES.FECHA_INI,
                       DETALLE = item.DETALLE,
                       IMPORTE = item.IMPORTE,
                       SALDO = item.SALDO,
                       ID_CAJA = item.SD_CAJAS_CIERRES.ID_CAJA,
                       CAJA = item.SD_CAJAS_CIERRES.SD_CAJAS.NOMBRE

                   };
                    result.Add(res);
                }
            });
            return result;
        }

        public IEnumerable<CierreCajaModel> ObtenerCierreCajaParcialGenerado(int ID_CAJA, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            List<CierreCajaModel> result = new List<CierreCajaModel>();
            ExecuteManager(uow =>
            {
                var managerCaja = new SD_CAJASManager(uow);
                var managerPrestamos = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                var managerPagosPrestamos = new SD_PAGO_DE_PRESTAMOSManager(uow);
                var managerEgresos = new SD_EGRESOSManager(uow);
                var managerIngresos = new SD_INGRESOSManager(uow);
                var managerTransferencias = new SD_TRANSFERENCIASManager(uow);
                var managerKardex = new SD_KARDEX_EFECTIVOManager(uow);


                string msg = "";
                decimal saldo = 0;

                DateTime fecha_fin = FECHA_FIN.AddDays(1);
                var ultimo = ObtenerUltimoRegistroCajasCierre(ID_CAJA);
                var caja = managerCaja.BuscarTodos(x => x.ID_CAJA == ID_CAJA).FirstOrDefault();
                if (ultimo == null)
                {
                    saldo = 0;
                }
                else
                {

                    CierreCajaModel res = new CierreCajaModel()
                    {
                        FECHA = ultimo.FECHA_FIN,
                        DETALLE = "SALDO CIERRE ANTERIOR",
                        IMPORTE = ultimo.SALDO_FINAL,
                        SALDO = saldo + ultimo.SALDO_FINAL,
                        ID_CAJA = ID_CAJA,
                        CAJA = caja.NOMBRE

                    };
                    saldo = saldo + (decimal)ultimo.SALDO_FINAL;
                    result.Add(res);
                }
                var detalles = managerKardex.BuscarTodos(x => x.ID_CAJA == ID_CAJA && x.FECHA >= FECHA_INI && x.FECHA < fecha_fin).OrderBy(y => y.FECHA).ThenBy(y => y.ID_KARDEX);
                foreach (var item in detalles)
                {
                    CierreCajaModel res = new CierreCajaModel()
                       {
                           ID_KARDEX = item.ID_KARDEX,
                           FECHA = item.FECHA,
                           DETALLE = item.DETALLE,
                           IMPORTE = item.INGRESO > 0 ? item.INGRESO : -item.EGRESO,
                           SALDO = saldo + (item.INGRESO > 0 ? item.INGRESO : -item.EGRESO),
                           ID_CAJA = caja.ID_CAJA,
                           CAJA = caja.NOMBRE

                       };
                    saldo = saldo + (decimal)res.IMPORTE;
                    result.Add(res);
                }


                //falta transferencias egresos y retiros egresso

            });
            return result;

        }

        public RespuestaSP GuardarCajaCierre(SD_CAJAS_CIERRES cierre, string detalles, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_CAJAS_CIERRESManager(uow);
                var managerDetalle = new SD_DETALLE_CAJA_CIERREManager(uow);
                var managerKardex = new SD_KARDEX_EFECTIVOManager(uow);
                var resp = manager.GuardarCierre(cierre, login);
                int id_venta;
                bool esNumero = int.TryParse(resp, out id_venta);
                if (esNumero)
                {
                    var details = ObtenerCierreCajaParcialGenerado(cierre.ID_CAJA, cierre.FECHA_INI, cierre.FECHA_FIN);
                    foreach (var item in details)
                    {
                        SD_DETALLE_CAJA_CIERRE det = new SD_DETALLE_CAJA_CIERRE()
                        {
                            ID_CIERRE = id_venta,
                            ID_DETALLE = managerDetalle.ObtenerSecuencia(),
                            ID_KARDEX = (int)item.ID_KARDEX,
                            SALDO = item.SALDO,
                            IMPORTE = item.IMPORTE,
                            FECHA = item.FECHA,
                            DETALLE = item.DETALLE,
                            FECHA_REG = DateTime.Now,
                            LOGIN = login


                        };
                        var kardex = managerKardex.BuscarTodos(x => x.ID_KARDEX == item.ID_KARDEX).FirstOrDefault();
                        if (kardex != null)
                        {
                            kardex.ID_CIERRE = id_venta;
                            kardex.ESTADO = "CERRADO";
                        }
                        managerDetalle.Add(det);

                    }


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
    }
}
