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
    public class DescuentosServices : BaseService, IDescuentosServices
    {  //{
        //    RespuestaSP result = new RespuestaSP();
        //    ExecuteManager(uow => {
        //        var manager = new SD_ANTECEDENTESManager(uow);
        //        var crear = manager.GuardarAntecedente(ant, login);
        //         int id;
        //         bool esNumero = int.TryParse(crear, out id);
        //         if (esNumero)
        //         {
        //             result.success = true;
        //             result.msg = "Proceso Ejecutado correctamente";
        //         }
        //         else {
        //             result.success = false;
        //             result.msg = crear;
        //         }

        //    });
        //    return result;
        //}

        public IEnumerable<SD_DESCUENTOS> ObtenerDescuentosPaginados(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros)
        {
            IQueryable<SD_DESCUENTOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DESCUENTOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_DESCUENTOS_SOCIO> ObtenerDetalleDescuentos(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros)
        {
            IQueryable<SD_DESCUENTOS_SOCIO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DESCUENTOS_SOCIOManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    //result = result.Where(SD_SOCIOS
                    result = result.Where(x=>x.SD_SOCIOS.NOMBRE.ToUpper().Contains(contiene)|| x.SD_SOCIOS.APELLIDO_PATERNO.ToUpper().Contains(contiene)||x.SD_SOCIOS.APELLIDO_MATERNO.ToUpper().Contains(contiene));

                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }
    }
}
