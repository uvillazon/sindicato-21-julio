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
    public class PermisosServices : BaseService, IPermisosServices
    {
        public IEnumerable<SD_PERMISOS> ObtenerPermisosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_PERMISOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_PERMISOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    string contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(SD_PERMISOS.Contiene(contiene));
                    //result = result.Where(x => x.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE.ToUpper().Contains(contiene) || x.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO.ToUpper().Contains(contiene) || x.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO.ToUpper().Contains(contiene));
                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public SD_PERMISOS ObtenerePermisoPorCriterio(Expression<Func<SD_PERMISOS, bool>> criterio)
        {
            SD_PERMISOS result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_PERMISOSManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();

            });
            return result;
        }

        public RespuestaSP GuardarPermiso(SD_PERMISOS permiso, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_GRABAR_PERMISOS(permiso.ID_SOCIO_MOVIL, permiso.MOTIVO, permiso.OBSERVACION, permiso.CANT_HOJAS_OBLIG, permiso.FECHA_INI, permiso.FECHA_FIN, login, p_res);
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

        public RespuestaSP AnularPermiso(SD_PERMISOS permiso, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_ANULAR_PERMISOS(permiso.ID_PERMISO, permiso.OBSERVACION_BAJA, login, p_res);
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
    }
}
