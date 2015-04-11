using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Services.Interfaces;
using Sindicato.Common;
using Sindicato.Model;
using Sindicato.Services.Model;
using System.Linq.Dynamic;
using LinqKit;
using Sindicato.Business;
using System.Linq.Expressions;
using System.Data.Objects;
using System.Diagnostics;

namespace Sindicato.Services
{
    public class ParadasServices : BaseService, IParadasServices
    {
        


        public IEnumerable<SD_KARDEX_EFECTIVO> ObtenerKardexEfectivo(PagingInfo paginacion, FiltrosModel<KardexEfectivoModel> filtros)
        {
            IQueryable<SD_KARDEX_EFECTIVO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_KARDEX_EFECTIVOManager(uow);
                //obtener todos los registros
                result = manager.BuscarTodos();
                //if (ID_CAJA != null) {
                //    result = result.Where(x => x.ID_CAJA == ID_CAJA);
                //}
                //formar un query una condicion ID_CAJA = 2 //ID_CAJA == 2
                filtros.FiltrarDatos();
                //
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

     

        public IEnumerable<SD_PARADAS> ObtenerParadasPaginado(PagingInfo paginacion, FiltrosModel<ParadasModel> filtros)
        {
            IQueryable<SD_PARADAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_PARADASManager(uow);
                //obtener todos los registros
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                //
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (filtros.Contiene != null) {
                    result = result.Where(x => x.NOMBRE.ToUpper().Contains(filtros.Contiene.ToUpper()));
                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }
    }
}
