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
    public class VentaHojasServices : BaseService, IVentaHojasServices
    {
        //private ISD_LISTASManager _manListas;

        public VentaHojasServices(/*ISD_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }
        public IEnumerable<SD_HOJAS_CONTROL> ObtenerHojasPaginados(PagingInfo paginacion, FiltrosModel<HojasModel> filtros)
        {
            IQueryable<SD_HOJAS_CONTROL> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_HOJAS_CONTROLManager(uow);
                //obtener un query de la tabla choferes
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    result = result.Where(SD_HOJAS_CONTROL.Contiene(filtros.Contiene));

                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarHojas(SD_HOJAS_CONTROL h, int ID_USR, int CANTIDAD_HOJA, int ID_CAJA)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                for (int i = 0; i < CANTIDAD_HOJA; i++)
                {
                    //if (h.FECHA_USO.Value.AddDays(1).DayOfWeek == DayOfWeek.Sunday)
                    //{
                    //    h.FECHA_USO = h.FECHA_COMPRA.AddDays(i + 1);
                    //}
                    //else
                    //{
                        h.FECHA_USO = h.FECHA_COMPRA.AddDays(i);
                    //}
                    context.P_SD_ALTA_SD_HOJAS_CONTROL(h.ID_MOVIL, h.ID_PARADA,ID_CAJA, h.OBSERVACION, h.FECHA_COMPRA,h.FECHA_USO, h.MONTO, ID_USR, p_res);
                }
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
