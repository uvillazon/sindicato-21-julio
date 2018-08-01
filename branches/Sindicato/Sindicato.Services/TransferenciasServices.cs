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
    public class TransferenciasServices : BaseService, ITrasferenciasServices
    {


        public IEnumerable<SD_INGRESOS> ObtenerIngresosPaginados(PagingInfo paginacion, FiltrosModel<TransferenciasModel> filtros)
        {
            IQueryable<SD_INGRESOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_INGRESOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x => x.CONCEPTO.Contains(contiene) || x.SD_CAJAS.NOMBRE.Contains(contiene));

                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_EGRESOS> ObtenerEgresosPaginados(PagingInfo paginacion, FiltrosModel<TransferenciasModel> filtros)
        {
            IQueryable<SD_EGRESOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_EGRESOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x => x.CONCEPTO.Contains(contiene) || x.SD_CAJAS.NOMBRE.Contains(contiene));

                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarIngreso(SD_INGRESOS ingreso, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_INGRESOSManager(uow);
                var ing = manager.GuardarIngreso(ingreso, login);
                int id;
                bool esNumero = int.TryParse(ing, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = ing;
                }

            });

            return result;
        }

        public RespuestaSP EliminarIngreso(int ID_INGRESO)
        {
            RespuestaSP result = new RespuestaSP();
            int ID_CAJA = 0;
            DateTime? fecha = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_INGRESOSManager(uow);
                var context = (SindicatoContext)manager.Context;
                var ant = manager.BuscarTodos(x => x.ID_INGRESO == ID_INGRESO).FirstOrDefault();
                if (ant != null)
                {
                    fecha = ant.FECHA;
                    ID_CAJA = ant.ID_CAJA;
                    manager.Delete(ant);
                    var kardex = context.SD_KARDEX_EFECTIVO.Where(x => x.OPERACION == "INGRESOS" && x.ID_OPERACION == ant.ID_INGRESO && x.ID_CAJA == ant.ID_CAJA);
                    foreach (var item in kardex)
                    {
                        context.SD_KARDEX_EFECTIVO.DeleteObject(item);
                    }

                    manager.Save();
                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                    context.P_SD_ACT_KARDEX_EFECTIVO(ant.ID_CAJA, fecha, 0, p_RES);
                    result.success = true;
                    result.msg = "Se elimino Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = "Ocurrio algun Problema";
                }
            });
            //ExecuteManager(uow =>
            //    {
            //        var context = (SindicatoContext)uow.Context;
            //        ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
            //        context.P_SD_ACT_KARDEX_EFECTIVO(ID_CAJA, fecha, 0, p_RES);
            //    });
            return result;
        }

        public RespuestaSP EliminarIngresoPorSocio(int ID_INGRESO)
        {
            RespuestaSP result = new RespuestaSP();
            int ID_CAJA = 0;
            DateTime? fecha = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_INGRESOS_POR_SOCIOSManager(uow);
                var context = (SindicatoContext)manager.Context;
                var ant = manager.BuscarTodos(x => x.ID_INGRESO == ID_INGRESO &&  x.ESTADO =="NUEVO").FirstOrDefault();
                if (ant != null)
                {
                    fecha = ant.FECHA;
                    ID_CAJA = ant.ID_CAJA;
                    ant.ESTADO = "ANULADO";
                    //manager.Delete(ant);
                    var kardex = context.SD_KARDEX_EFECTIVO.Where(x => x.OPERACION == "INGRESOS POR SOCIOS" && x.ID_OPERACION == ant.ID_INGRESO && x.ID_CAJA == ant.ID_CAJA);
                    foreach (var item in kardex)
                    {
                        context.SD_KARDEX_EFECTIVO.DeleteObject(item);
                    }

                    manager.Save();
                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                    context.P_SD_ACT_KARDEX_EFECTIVO(ant.ID_CAJA, fecha, 0, p_RES);
                    result.success = true;
                    result.msg = "Se Anulo Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = "Ocurrio algun Problema";
                }
            });
            //ExecuteManager(uow =>
            //    {
            //        var context = (SindicatoContext)uow.Context;
            //        ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
            //        context.P_SD_ACT_KARDEX_EFECTIVO(ID_CAJA, fecha, 0, p_RES);
            //    });
            return result;
        }

        public RespuestaSP GuardarEgreso(SD_EGRESOS egreso, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_EGRESOSManager(uow);
                var ing = manager.GuardarEgreso(egreso, login);
                int id;
                bool esNumero = int.TryParse(ing, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = ing;
                }

            });

            return result;
        }

        public RespuestaSP EliminarEgreso(int ID_EGRESO)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_EGRESOSManager(uow);
                var context = (SindicatoContext)manager.Context;
                var ant = manager.BuscarTodos(x => x.ID_EGRESO == ID_EGRESO && x.ESTADO == "NUEVO").FirstOrDefault();
                if (ant != null)
                {
                    ant.ESTADO = "ANULADO";
                    //manager.Delete(ant);
                    var kardex = context.SD_KARDEX_EFECTIVO.Where(x => x.OPERACION == "EGRESOS" && x.ID_OPERACION == ant.ID_EGRESO && x.ID_CAJA == ant.ID_CAJA);
                    foreach (var item in kardex)
                    {
                        context.SD_KARDEX_EFECTIVO.DeleteObject(item);
                    }
                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                    manager.Save();
                    context.P_SD_ACT_KARDEX_EFECTIVO(ant.ID_CAJA, ant.FECHA, 0, p_RES);
                    result.success = true;
                    result.msg = "Se elimino Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = "No existe el EGRESO o esta en estado diferente a NUEVO";
                }
            });
            return result;
        }


        public IEnumerable<SD_TRANSFERENCIAS> ObtenerTransferenciasPaginados(PagingInfo paginacion, FiltrosModel<TransferenciasModel> filtros)
        {
            IQueryable<SD_TRANSFERENCIAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_TRANSFERENCIASManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x => x.CONCEPTO.Contains(contiene) || x.SD_CAJAS.NOMBRE.Contains(contiene));

                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarTransferencia(SD_TRANSFERENCIAS transf, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_TRANSFERENCIASManager(uow);
                var ing = manager.GuardarTransferencia(transf, login);
                int id;
                bool esNumero = int.TryParse(ing, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = ing;
                }

            });

            return result;
        }

        public RespuestaSP EliminarTransferencia(int ID_TRANSFERENCIA)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_TRANSFERENCIASManager(uow);
                var context = (SindicatoContext)manager.Context;
                var ant = manager.BuscarTodos(x => x.ID_TRANSFERENCIA == ID_TRANSFERENCIA).FirstOrDefault();
                if (ant != null)
                {
                    //manager.Delete(ant);
                    ant.ESTADO = "ANULADO";
                    var kardexIngreso = context.SD_KARDEX_EFECTIVO.Where(x => x.OPERACION == "TRANSFERENCIAS" && x.ID_OPERACION == ant.ID_TRANSFERENCIA && x.ID_CAJA == ant.ID_CAJA_DESTINO);
                    var kardexEgreso = context.SD_KARDEX_EFECTIVO.Where(x => x.OPERACION == "TRANSFERENCIAS" && x.ID_OPERACION == ant.ID_TRANSFERENCIA && x.ID_CAJA == ant.ID_CAJA_ORIGEN);
                    foreach (var item in kardexIngreso)
                    {
                        context.SD_KARDEX_EFECTIVO.DeleteObject(item);
                    }
                    foreach (var item in kardexEgreso)
                    {
                        context.SD_KARDEX_EFECTIVO.DeleteObject(item);
                    }
                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                    manager.Save();
                    context.P_SD_ACT_KARDEX_EFECTIVO(ant.ID_CAJA_DESTINO, ant.FECHA, 0, p_RES);
                    context.P_SD_ACT_KARDEX_EFECTIVO(ant.ID_CAJA_ORIGEN, ant.FECHA, 0, p_RES);
                    result.success = true;
                    result.msg = "Se elimino Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = "Ocurrio algun Problema";
                }
            });
            return result;
        }

        #region Tipo de Egresos
        public IEnumerable<SD_TIPOS_EGRESOS> ObtenerITiposEgresosPaginados(PagingInfo paginacion, FiltrosModel<TransferenciasModel> filtros)
        {
            IQueryable<SD_TIPOS_EGRESOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_TIPOS_EGRESOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x => x.NOMBRE.Contains(contiene));
                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarTipoEgreso(SD_TIPOS_EGRESOS tipo, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_TIPOS_EGRESOSManager(uow);
                string p_res = manager.GuardarTipoEgreso(tipo, login);
                int id;
                bool esNumero = int.TryParse(p_res, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = p_res;
                }

            });
            return result;
        }

        #endregion
    }
}
