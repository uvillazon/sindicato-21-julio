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


        //    public IEnumerable<SD_HOJAS_CONTROL> ObtenerHojasPaginados(PagingInfo paginacion, FiltrosModel<HojasModel> filtros)
        //    {
        //        IQueryable<SD_HOJAS_CONTROL> result = null;
        //        ExecuteManager(uow =>
        //        {
        //            var manager = new SD_HOJAS_CONTROLManager(uow);
        //            //obtener un query de la tabla choferes
        //            result = manager.BuscarTodos();
        //            filtros.FiltrarDatos();
        //            result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
        //            if (!string.IsNullOrEmpty(filtros.Contiene))
        //            {
        //                result = result.Where(SD_HOJAS_CONTROL.Contiene(filtros.Contiene));

        //            }
        //            paginacion.total = result.Count();

        //            result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

        //        });
        //        return result;
        //    }

        //    public RespuestaSP GuardarHojas(SD_HOJAS_CONTROL h, int ID_USR, int CANTIDAD_HOJA, int ID_CAJA)
        //    {
        //        RespuestaSP result = new RespuestaSP();
        //        ExecuteManager(uow =>
        //        {
        //            var context = (SindicatoContext)uow.Context;
        //            ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
        //            for (int i = 0; i < CANTIDAD_HOJA; i++)
        //            {
        //                //if (h.FECHA_USO.Value.AddDays(1).DayOfWeek == DayOfWeek.Sunday)
        //                //{
        //                //    h.FECHA_USO = h.FECHA_COMPRA.AddDays(i + 1);
        //                //}
        //                //else
        //                //{
        //                    h.FECHA_USO = h.FECHA_COMPRA.AddDays(i);
        //                //}
        //                context.P_SD_ALTA_SD_HOJAS_CONTROL(h.ID_MOVIL, h.ID_PARADA,ID_CAJA, h.OBSERVACION, h.FECHA_COMPRA,h.FECHA_USO, h.MONTO, ID_USR, p_res);
        //            }
        //            int id;
        //            bool esNumero = int.TryParse(p_res.Value.ToString(), out id);
        //            if (esNumero && id > 0)
        //            {
        //                result.success = true;
        //                result.msg = "Proceso Ejecutado Correctamente";
        //                result.id = id;
        //            }
        //            else
        //            {
        //                result.success = false;
        //                result.msg = p_res.Value.ToString();
        //            }

        //        });

        //        return result;
        //    }
        public IEnumerable<SD_VENTA_HOJAS_CONTROL> ObtenerVentasHojasPaginados(PagingInfo paginacion, FiltrosModel<HojasModel> filtros)
        {
            IQueryable<SD_VENTA_HOJAS_CONTROL> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_VENTA_HOJAS_CONTROLManager(uow);
                //obtener un query de la tabla choferes
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    result = result.Where(SD_VENTA_HOJAS_CONTROL.Contiene(filtros.Contiene));

                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
            throw new NotImplementedException();
        }

        public IEnumerable<SD_DETALLE_HOJAS> ObtenerDetallesVentaHojaPaginado(PagingInfo paginacion, FiltrosModel<HojasModel> filtros)
        {
            throw new NotImplementedException();
        }

        public RespuestaSP GuardarVentaHoja(SD_VENTA_HOJAS_CONTROL venta, List<SD_DETALLE_HOJAS> detalles, string login)
        {
            throw new NotImplementedException();
        }

        public RespuestaSP AnularVentaHoja(int ID_VENTA, string login)
        {
            throw new NotImplementedException();
        }


        public IEnumerable<HojasModel> ObtenerFechasDisponibles(DateTime FECHA_VENTA, int ID_SOCIO, int NRO_MOVIL)
        {
            List<HojasModel> result = new List<HojasModel>();
            ExecuteManager(uow =>
            {

                var manager = new SD_DETALLE_HOJASManager(uow);
                var vendidas = manager.BuscarTodos(x => x.SD_VENTA_HOJAS_CONTROL.FECHA_VENTA.Month == FECHA_VENTA.Month && x.SD_VENTA_HOJAS_CONTROL.FECHA_VENTA.Year == FECHA_VENTA.Year && x.SD_VENTA_HOJAS_CONTROL.ID_SOCIO == ID_SOCIO && x.SD_VENTA_HOJAS_CONTROL.NRO_MOVIL == NRO_MOVIL);
                int day = 31;
                for (int i = 1; i <= day; i++)
                {
                    HojasModel list = new HojasModel();
                    DateTime date = new DateTime(FECHA_VENTA.Year, FECHA_VENTA.Month, i);
                    var valid = vendidas.Where(x => x.FECHA_USO.Day == date.Day && x.FECHA_USO.Month == date.Month && x.FECHA_USO.Year == date.Year);
                    if (valid.Count() == 0) {
                        list.FECHA = date;
                        list.FECHA_TEXT = String.Format("{0:d/MM/yyyy}", date);
                        result.Add(list);
                    }
                }

            });
            return result;

        }
    }
}
