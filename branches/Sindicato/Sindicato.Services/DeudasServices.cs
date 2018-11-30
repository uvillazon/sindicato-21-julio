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
                    foreach (var item in ant.SD_DETALLES_DEUDAS)
                    {
                        managerDetalle.Delete(item);
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
                var cnt = manager.BuscarTodos(x => x.ID_DEUDA == detalle.ID_DEUDA && x.ID_SOCIO_MOVIL == detalle.ID_SOCIO_MOVIL);
                if (cnt.Count() > 0)
                {
                    result.success = false;
                    result.msg = "El Socio  ya cuenta con la dueda. Por favor seleccionar Otro Registro";
                }
                else {
                    detalle.IMPORTE_CANCELADO = 0;
                    detalle.FECHA_REG = DateTime.Now;
                    detalle.LOGIN_USR = login;
                    manager.Add(detalle);
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                }
            });
            return result;
        }

        public RespuestaSP EliminarDetalleDeuda(int ID_DETALLE)
        {
            throw new NotImplementedException();
        }


        public RespuestaSP CancelarDetalleDeuda(SD_DETALLES_DEUDAS detalle, string login)
        {
            throw new NotImplementedException();
        }
    }
}
