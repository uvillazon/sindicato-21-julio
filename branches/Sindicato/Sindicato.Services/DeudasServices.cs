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
    public class DeudasServices : BaseService, IDeudasServices
    {
        public IEnumerable<SD_DEUDAS_SOCIOS> ObtenerDeudasPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros)
        {
            IQueryable<SD_DEUDAS_SOCIOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DEUDAS_SOCIOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(SD_DEUDAS_SOCIOS.Contiene(contiene));
                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            });
            return result;
        }

        public IEnumerable<SD_DETALLES_DEUDAS> ObtenerDetallesDeudasPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros)
        {
            IQueryable<SD_DETALLES_DEUDAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLES_DEUDASManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(SD_DETALLES_DEUDAS.Contiene(contiene));
                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            });
            return result;
        }

        public RespuestaSP GuardarDeuda(SD_DEUDAS_SOCIOS deuda, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_GUARDAR_DEUDAS_SOCIOS(deuda.ID_DEUDA, deuda.ID_CAJA, deuda.MOTIVO, deuda.FECHA, deuda.OBSERVACION, deuda.IMPORTE, login, p_res);
                int id;
                bool esNumero = int.TryParse(p_res.Value.ToString(), out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }

            });
            return result;
        }

        public RespuestaSP EliminarDeuda(int ID_DEUDA)
        {
            RespuestaSP result = new RespuestaSP();
            int ID_CAJA = 0;
            DateTime? fecha = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DEUDAS_SOCIOSManager(uow);
                var managerDetalle = new SD_DETALLES_DEUDASManager(uow);
                var ant = manager.BuscarTodos(x => x.ID_DEUDA == ID_DEUDA).FirstOrDefault();
                var cnt = ant.SD_DETALLES_DEUDAS.Where(x => x.IMPORTE_CANCELADO > 0);
                if (ant != null && cnt.Count() == 0)
                {
                    fecha = ant.FECHA;
                    ID_CAJA = ant.ID_CAJA;
                    var detalles = managerDetalle.BuscarTodos(x => x.ID_DEUDA == ant.ID_DEUDA);
                    foreach (var item in detalles)
                    {
                        if (item != null)
                        {
                            managerDetalle.Delete(item);
                        }
                    }
                    manager.Delete(ant);
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";

                }
                else
                {
                    result.success = false;
                    result.msg = "La Deuda tiene algunos detalles cancelados";
                }
            });
            return result;
        }

        public RespuestaSP GuardarDetalleDeuda(SD_DETALLES_DEUDAS detalle, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLES_DEUDASManager(uow);
                var context = (SindicatoContext)uow.Context;
                var managerDeuda = new SD_DEUDAS_SOCIOSManager(uow);
                var cnt = manager.BuscarTodos(x => x.ID_DEUDA == detalle.ID_DEUDA && x.ID_SOCIO_MOVIL == detalle.ID_SOCIO_MOVIL);
                if (cnt.Count() > 0)
                {
                    result.success = false;
                    result.msg = "El Socio  ya cuenta con la dueda. Por favor seleccionar Otro Registro";
                }
                else
                {
                    var deuda = managerDeuda.BuscarTodos(x => x.ID_DEUDA == detalle.ID_DEUDA).FirstOrDefault();
                    if (deuda != null)
                    {
                        ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                        context.P_EE_SECUENCIA("SD_DETALLES_DEUDAS", 0, p_RES);
                        int idKardex = Convert.ToInt32(p_RES.Value);

                        detalle.ID_DETALLE = idKardex;
                        detalle.ID_CAJA = deuda.ID_CAJA;
                        detalle.IMPORTE = (decimal)deuda.IMPORTE;
                        detalle.MOTIVO = deuda.MOTIVO;
                        detalle.ESTADO = "NUEVO";
                        detalle.IMPORTE_CANCELADO = 0;
                        detalle.FECHA_REG = DateTime.Now;
                        detalle.LOGIN_USR = login;
                        manager.Add(detalle);
                        result.success = true;
                        result.msg = "Proceso Ejecutado Correctamente";
                    }
                    else
                    {
                        result.success = false;
                        result.msg = "No Existe la Deuda favor verificar.";
                    }
                }
            });
            return result;
        }

        public RespuestaSP EliminarDetalleDeuda(int ID_DETALLE)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLES_DEUDASManager(uow);
                var det = manager.BuscarTodos(x => x.IMPORTE_CANCELADO == 0 && x.ID_DETALLE == ID_DETALLE);
                if (det.Count() > 0)
                {
                    manager.Delete(det.FirstOrDefault());
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = "La Deuda ya fue cancelado por el socio o anulado";
                }
            });
            return result;
        }

        public RespuestaSP PagoDetalleDeuda(SD_DETALLES_DEUDAS detalle, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var managerCierre = new SD_CIERRES_CAJASManager(uow);
                var valid = managerCierre.VerificarCierre(DateTime.Now);
                if (!valid.success)
                {
                    throw new NullReferenceException(valid.msg);
                }

                var manager = new SD_DETALLES_DEUDASManager(uow);
                var context = (SindicatoContext)manager.Context;
                var det = manager.BuscarTodos(x => x.ID_DETALLE == detalle.ID_DETALLE && x.IMPORTE_CANCELADO == 0 && x.ESTADO != "ANULADO").FirstOrDefault();
                if (det != null)
                {
                    det.IMPORTE_CANCELADO = det.IMPORTE;
                    det.FECHA_CANCELADO = DateTime.Now;
                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                    context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                    int idKardex = Convert.ToInt32(p_RES.Value);
                    SD_KARDEX_EFECTIVO kardex = new SD_KARDEX_EFECTIVO()
                    {
                        ID_KARDEX = idKardex,
                        DETALLE = "CENCELACION DEUDA " + det.SD_DEUDAS_SOCIOS.MOTIVO + " Movil:" + det.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL + " Socio :" + det.SD_SOCIO_MOVILES.ObtenerNombreSocio(),
                        FECHA = (DateTime)det.FECHA_CANCELADO,
                        FECHA_REG = DateTime.Now,
                        ID_OPERACION = det.ID_DETALLE,
                        ID_CAJA = (int)det.ID_CAJA,
                        INGRESO = (decimal)det.IMPORTE_CANCELADO,
                        LOGIN = login,
                        OPERACION = "CUENTAS POR COBRAR"
                    };
                    context.SD_KARDEX_EFECTIVO.AddObject(kardex);
                    manager.Save();
                    context.P_SD_ACT_KARDEX_EFECTIVO(det.ID_CAJA, det.FECHA_CANCELADO, 0, p_RES);
                    result.success = true;
                    result.msg = "Proceso ejecutado correctamente";

                }
                else
                {
                    result.success = false;
                    result.msg = "La dueda ya se encuentra cancelado o no existe el registro";
                }

            });

            return result = resultado == null ? result : resultado;
        }

        public RespuestaSP AnularDeuda(SD_DETALLES_DEUDAS detalle, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLES_DEUDASManager(uow);
                var context = (SindicatoContext)manager.Context;
                var det = manager.BuscarTodos(x => x.ID_DETALLE == detalle.ID_DETALLE && x.IMPORTE_CANCELADO == 0 && x.ESTADO != "ANULADO").FirstOrDefault();
                if (det != null)
                {
                    det.ESTADO = "ANULADO";
                    det.OBSERVACION = detalle.OBSERVACION;
                    manager.Save();
                    result.success = true;
                    result.msg = "Proceso ejecutado correctamente";

                }
                else
                {
                    result.success = false;
                    result.msg = "La dueda ya se encuentra cancelado o no existe el registro";
                }

            });

            return result;
        }

        public RespuestaSP AnularDetalleDeuda(int ID_DETALLE)
        {
            RespuestaSP result = new RespuestaSP();
            int ID_CAJA = 0;
            DateTime? fecha = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLES_DEUDASManager(uow);
                var context = (SindicatoContext)manager.Context;
                var det = manager.BuscarTodos(x => x.ID_DETALLE == ID_DETALLE && x.IMPORTE_CANCELADO > 0 && x.ESTADO != "APROBADO").FirstOrDefault();
                if (det != null)
                {
                    fecha = det.FECHA_CANCELADO;
                    ID_CAJA = (int)det.ID_CAJA;
                    det.FECHA_CANCELADO = null;
                    det.IMPORTE_CANCELADO = 0;
                    //manager.Delete(ant);
                    var kardex = context.SD_KARDEX_EFECTIVO.Where(x => x.OPERACION == "CUENTAS POR COBRAR" && x.ID_OPERACION == det.ID_DETALLE && x.ID_CAJA == det.ID_CAJA);
                    foreach (var item in kardex)
                    {
                        context.SD_KARDEX_EFECTIVO.DeleteObject(item);
                    }

                    manager.Save();
                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                    context.P_SD_ACT_KARDEX_EFECTIVO(det.ID_CAJA, fecha, 0, p_RES);
                    result.success = true;
                    result.msg = "Se Anulo Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = "Ocurrio algun Problema";
                }
            });
            return result;
        }
    }
}
