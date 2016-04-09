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
using Newtonsoft.Json;

namespace Sindicato.Services
{
    public class VentaHojasServices : BaseService, IVentaHojasServices
    {
        public IEnumerable<SD_HOJAS_CONTROL> ObtenerVentasPaginados(PagingInfo paginacion, FiltrosModel<HojasModel> filtros)
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
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x => x.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE.ToUpper() == contiene);

                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }



        public IEnumerable<SD_DETALLES_HOJAS_CONTROL> ObtenerDetallesPaginado(PagingInfo paginacion, FiltrosModel<HojasModel> filtros)
        {
            IQueryable<SD_DETALLES_HOJAS_CONTROL> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLES_HOJAS_CONTROLManager(uow);
                //obtener un query de la tabla choferes
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }


        public RespuestaSP AnularVentaHoja(int ID_HOJA, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_ANULAR_HOJA(ID_HOJA, "Anulacion de Venta de Hoja", login, p_res);
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


        public RespuestaSP GuardarVentaHoja(SD_HOJAS_CONTROL venta, int CANTIDAD, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_GUARDAR_HOJA(venta.ID_SOCIO_MOVIL, venta.ID_PARADA, venta.ID_CHOFER, venta.FECHA_COMPRA, CANTIDAD, login, p_res);
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





        public SD_HOJAS_CONTROL ObtenerHoja(Expression<Func<SD_HOJAS_CONTROL, bool>> criterio)
        {
            SD_HOJAS_CONTROL result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_HOJAS_CONTROLManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();
            });
            return result;
        }


        public IEnumerable<SD_HOJAS_CONTROL> ObtenerHojasPorVentas(int ID_VENTA)
        {
            IQueryable<SD_HOJAS_CONTROL> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_VENTA_HOJASManager(uow);
                //obtener un query de la tabla choferes
                var res = manager.BuscarTodos(x => x.ID_VENTA == ID_VENTA);
                result = res.Select(x => x.SD_HOJAS_CONTROL);

            });
            return result;
        }


        public RespuestaSP Reimprimir(SD_IMPRESIONES imp, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_GRABAR_IMPRESION(imp.NRO_INICIO, imp.NRO_FIN, imp.OBSERVACION, login, p_res);
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


        public SD_IMPRESIONES obtenerImpresion(Expression<Func<SD_IMPRESIONES, bool>> criterio)
        {
            SD_IMPRESIONES result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_IMPRESIONESManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();
            });
            return result;
        }


        public IEnumerable<SD_HOJAS_CONTROL> ObtenerHojasPorCriterio(Expression<Func<SD_HOJAS_CONTROL, bool>> criterio)
        {
            IQueryable<SD_HOJAS_CONTROL> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_HOJAS_CONTROLManager(uow);
                //obtener un query de la tabla choferes
                result = manager.BuscarTodos(criterio);

            });
            return result;
        }
    }
}
