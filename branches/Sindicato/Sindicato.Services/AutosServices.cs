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
    public class AutosServices : BaseService, IAutosServices
    {
        
        public IEnumerable<SD_AUTOS> ObtenerAutosPaginados(PagingInfo paginacion, FiltrosModel<AutosModel> filtros)
        {
            IQueryable<SD_AUTOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_AUTOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (filtros.codigo == "AutosSinSocios") {
                    result = result.Where(x=>x.SD_SOCIO_MOVIL_AUTOS.Count()== 0 || !x.SD_SOCIO_MOVIL_AUTOS.Any(y=>y.ESTADO=="ACTIVO"));

                }
                if (filtros.codigo == "AutoConSocios") { 
                    result = result.Where(x=>x.SD_SOCIO_MOVIL_AUTOS.Any(y=>y.ESTADO=="ACTIVO"));
                }
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    string contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x => x.COLOR.ToUpper().Contains(contiene) || x.MODELO.ToUpper().Contains(contiene) || x.PLACA.ToUpper().Contains(contiene));
                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public SD_AUTOS ObtenereAutoPorCriterio(Expression<Func<SD_AUTOS, bool>> criterio)
        {
            SD_AUTOS result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_AUTOSManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();

            });
            return result;
        }

        public RespuestaSP GuardarAuto(SD_AUTOS auto, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_ALTA_AUTOS(auto.ID_AUTO, auto.TIPO, auto.COLOR, auto.MARCA, auto.MODELO, auto.PLACA, auto.MOTOR, auto.CHASIS, auto.DESCRIPCION, auto.FECHA_ALTA, null, login, p_res);
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


        public IEnumerable<SD_SOCIO_MOVIL_AUTOS> ObtenerAutosSociosPaginados(PagingInfo paginacion, FiltrosModel<AutosModel> filtros)
        {
            IQueryable<SD_SOCIO_MOVIL_AUTOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_SOCIO_MOVIL_AUTOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }
    }
}
