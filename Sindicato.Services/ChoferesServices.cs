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
    public class ChoferesServices : BaseService, IChoforesServices
    {
        //private ISD_LISTASManager _manListas;

        public ChoferesServices(/*ISD_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        
        public IEnumerable<SD_CHOFERES> ObtenerChoferesPaginados(PagingInfo paginacion, FiltrosModel<ChoferesModel> filtros)
        {
            IQueryable<SD_CHOFERES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_CHOFERESManager(uow);
                //obtener un query de la tabla choferes
                result = manager.BuscarTodos();

                //arma dinamicamente la consulta de criterios
                filtros.FiltrarDatos();
                //si tiene filtros se adiciona al query si no es la query
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    //result = result.Where(SD_SOCIOS
                    //query filtrado por la variable contiene
                    result = result.Where(SD_CHOFERES.Contiene(filtros.Contiene));

                }

                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarChofer(SD_CHOFERES chofer, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SD_ALTA_SD_CHOFERES(chofer.ID_CHOFER, chofer.NRO_CHOFER, chofer.NOMBRE, chofer.APELLIDO_PATERNO, chofer.APELLIDO_MATERNO,
                    chofer.NRO_LICENCIA, chofer.CATEGORIA_LIC, chofer.CI, chofer.EXPEDIDO, chofer.FECHA_NAC, chofer.FECHA_INGRESO, chofer.DOMICILIO,
                    chofer.OBSERVACION, chofer.ESTADO_CIVIL, chofer.TELEFONO, chofer.CELULAR, chofer.ID_SOCIO, ID_USR, p_res);

                int id;
                bool esNumero = int.TryParse(p_res.Value.ToString(), out id);

                if (esNumero && id > 0)
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
