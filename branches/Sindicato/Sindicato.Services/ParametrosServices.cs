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
    public class ParametrosServices : BaseService, IParametrosServices
    {
        //private ISD_LISTASManager _manListas;

        public ParametrosServices(/*ISD_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        public IEnumerable<SD_PARAMETROS_LINEA> ObtenerParametrosPaginados(PagingInfo paginacion, FiltrosModel<ParametrosModel> filtros)
        {
            IQueryable<SD_PARAMETROS_LINEA> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_PARAMETROS_LINEAManager(uow);
                //obtener un query de la tabla choferes
                result = manager.BuscarTodos();

                //arma dinamicamente la consulta de criterios
                filtros.FiltrarDatos();
                //si tiene filtros se adiciona al query si no es la query
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
               

                paginacion.total = result.Count();
                if (paginacion != null)
                {
                    result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
                }
               
            });
            return result;
        }
        public IEnumerable<SD_PARAMETROS_LINEA> ObtenerParametros(Expression<Func<SD_PARAMETROS_LINEA, bool>> criterio)
        {
            IQueryable<SD_PARAMETROS_LINEA> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_PARAMETROS_LINEAManager(uow);
                //obtener un query de la tabla choferes
                result = manager.BuscarTodos(criterio);


            });
            return result;
        }
        public RespuestaSP ObtenerParametro(string COD_PAR , int ID_LINEA = 1)
        {
            RespuestaSP result = null;
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_REC_PARAMETROS(COD_PAR, ID_LINEA, p_res);
                if (p_res.Value.ToString().Contains("Error"))
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }
                else {
                    result.success = true;
                    result.msg = p_res.Value.ToString();
                }
            });
            return result;
        }

        public RespuestaSP GuardarParametros(SD_PARAMETROS_LINEA parametro, int ID_USR)
        {
            throw new NotImplementedException();
            //RespuestaSP result = new RespuestaSP();
            //ExecuteManager(uow =>
            //{
            //    var context = (SindicatoContext)uow.Context;
            //    ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
            //    context.P_SD_ALTA_SD_CHOFERES(chofer.ID_CHOFER, chofer.NRO_CHOFER, chofer.NOMBRE, chofer.APELLIDO_PATERNO, chofer.APELLIDO_MATERNO,
            //        chofer.NRO_LICENCIA, chofer.CATEGORIA_LIC, chofer.CI, chofer.EXPEDIDO, chofer.FECHA_NAC, chofer.FECHA_INGRESO, chofer.DOMICILIO,
            //        chofer.OBSERVACION, chofer.ESTADO_CIVIL, chofer.TELEFONO, chofer.CELULAR, chofer.ID_SOCIO, ID_USR, p_res);

            //    int id;
            //    bool esNumero = int.TryParse(p_res.Value.ToString(), out id);

            //    if (esNumero && id > 0)
            //    {
            //        result.success = true;
            //        result.msg = "Proceso Ejecutado Correctamente";
            //        result.id = id;
            //    }
            //    else
            //    {
            //        result.success = false;
            //        result.msg = p_res.Value.ToString();
            //    }

            //});

            //return result;
        }
    }
}
