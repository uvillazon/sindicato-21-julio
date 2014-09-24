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
    public class FamiliaresServices : BaseService, IFamiliaresServices
    {
        public IEnumerable<SD_FAMILIARES> ObtenerFamiliaresPaginados(PagingInfo paginacion, FiltrosModel<FamiliaresModel> filtros)
        {
            IQueryable<SD_FAMILIARES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_FAMILIARESManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarFamiliar(Sindicato.Model.SD_FAMILIARES fam, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                
                context.P_SD_ALTA_SD_FAMILIARES(fam.ID_FAMILIAR, fam.ID_SOCIO, fam.ID_CHOFER, fam.NOMBRE, fam.APELLIDO_PATERNO, fam.APELLIDO_MATERNO, fam.CI, fam.EXPEDIDO, fam.FECHA_NAC, fam.PARENTESCO, fam.OBSERVACION, "asdasd", fam.TELEFONO, ID_USR, p_res);
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
