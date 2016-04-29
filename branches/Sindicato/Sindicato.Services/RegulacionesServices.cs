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
    public class RegulacionesServices : BaseService, IRegulacionesServices
    {
        
     
        public IEnumerable<SD_REGULARIZACIONES> ObtenerRegulacionesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_REGULARIZACIONES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_REGULARIZACIONESManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    string contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x=>x.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE.Contains(contiene));
                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

       

        public RespuestaSP GuardarRegulaciones(SD_REGULARIZACIONES regulacion,string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_GUARDAR_REGULACION(regulacion.ID_SOCIO_MOVIL,regulacion.ID_PARADA,regulacion.FECHA_COMPRA,regulacion.MES.ToString("MM-yyyy"),regulacion.CANTIDAD, login, p_res);
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

        public RespuestaSP AnularRegulacion(SD_REGULARIZACIONES regulacion, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_ANULAR_REGULACION(regulacion.ID_REGULACION,regulacion.OBSERVACION , login, p_res);
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


        public IEnumerable<SD_DETALLES_REGULARIZACIONES> ObtenerDetalleRegulacionesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_DETALLES_REGULARIZACIONES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLES_REGULARIZACIONESManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    string contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x => x.OBLIGACION.Contains(contiene));
                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }
    }
}
