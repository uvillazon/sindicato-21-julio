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

namespace Sindicato.Services
{
    public class MovilesServices : BaseService, IMovilesServices
    {
        //private ISD_LISTASManager _manListas;

        public MovilesServices(/*ISD_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }



        public IEnumerable<SD_MOVILES> ObtenerMoviles(Expression<Func<SD_MOVILES, bool>> criterio = null)
        {
            IEnumerable<SD_MOVILES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_MOVILESManager(uow);

                result = manager.BuscarTodos(criterio);


            });
            return result;
        }

        public RespuestaSP GuardarMovil(SD_MOVILES movil, string LOGIN_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_MOVILESManager(uow);
                var res = manager.GuardarMovil(movil, LOGIN_USR);
                int idMovil;
                bool esNumero = int.TryParse(res, out idMovil);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = idMovil;
                }
                else
                {
                    result.success = false;
                    result.msg = res;
                }

            });
            return result;
        }


        public IEnumerable<SD_MOVILES> ObtenerMovilesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_MOVILES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_MOVILESManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;


                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    result = result.Where(SD_MOVILES.Contiene(filtros.Contiene));
                }

                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_HIST_MOVIL> ObtenerHistoricosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_HIST_MOVIL> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_HIST_MOVILManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;

                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarCambioMovil(int ID_MOVIL , int NRO_MOVIL , string OBSERVACION, string LOGIN_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_MOVILESManager(uow);
                var res = manager.GuardarCambiosMovil(ID_MOVIL, NRO_MOVIL, OBSERVACION, LOGIN_USR);
                int idMovil;
                bool esNumero = int.TryParse(res, out idMovil);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = idMovil;
                }
                else
                {
                    result.success = false;
                    result.msg = res;
                }

            });
            return result;
        }

    }
}
