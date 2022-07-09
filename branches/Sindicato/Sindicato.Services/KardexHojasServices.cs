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
    public class KardexHojasServices : BaseService, IKardexHojasServices
    {
        
        //public IEnumerable<SD_AUTOS> ObtenerAutosPaginados(PagingInfo paginacion, FiltrosModel<AutosModel> filtros)
        //{
        //    IQueryable<SD_AUTOS> result = null;
        //    ExecuteManager(uow =>
        //    {
        //        var manager = new SD_AUTOSManager(uow);

        //        result = manager.BuscarTodos();
        //        filtros.FiltrarDatos();
        //        result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
        //        if (filtros.codigo == "AutosSinSocios") {
        //            result = result.Where(x=>x.SD_SOCIO_MOVIL_AUTOS.Count()== 0 || !x.SD_SOCIO_MOVIL_AUTOS.Any(y=>y.ESTADO=="ACTIVO"));

        //        }
        //        if (filtros.codigo == "AutoConSocios") { 
        //            result = result.Where(x=>x.SD_SOCIO_MOVIL_AUTOS.Any(y=>y.ESTADO=="ACTIVO"));
        //        }
        //        if (!string.IsNullOrEmpty(filtros.Contiene))
        //        {
        //            string contiene = filtros.Contiene.Trim().ToUpper();
        //            result = result.Where(x => x.COLOR.ToUpper().Contains(contiene) || x.MODELO.ToUpper().Contains(contiene) || x.PLACA.ToUpper().Contains(contiene));
        //        }
        //        paginacion.total = result.Count();
        //        result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

        //    });
        //    return result;
        //}


        public IEnumerable<SD_KARDEX_HOJAS> ObtenerKardex(PagingInfo paginacion, FiltrosModel<AutosModel> filtros , string codigo)
        {
            IQueryable<SD_KARDEX_HOJAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_KARDEX_HOJASManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    string contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(SD_KARDEX_HOJAS.Contiene(contiene));
                   
                    //result = result.Where(x => x.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE.ToUpper().Contains(contiene) || x.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO.ToUpper().Contains(contiene) || x.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO.ToUpper().Contains(contiene));
                }
                if (codigo == "Debe")
                {
                    var date = DateTime.Now;
                    var firstDayOfMonth = new DateTime(date.Year, date.Month, 1);
                    result = result.Where(x => x.DEBE > 0 && x.MES < firstDayOfMonth);
                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_SOCIO_MOVIL_AUTOS> ObtenerKardexHojaPorMovilPaginados(PagingInfo paginacion, FiltrosModel<AutosModel> filtros)
        {
            throw new NotImplementedException();
        }


        public IEnumerable<object> ObtenerMesDeKardex()
        {
            IQueryable<object> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_KARDEX_HOJASManager(uow);

                result = manager.BuscarTodos().GroupBy(x => x.MES).Select(y => new { MES = y.Key});
                //foreach (var item in query)
                //{
                    
                //}

            });
            return result;
        }
    }
}
