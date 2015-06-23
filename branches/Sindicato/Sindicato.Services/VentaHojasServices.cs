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
        public IEnumerable<SD_VENTA_HOJAS> ObtenerVentasPaginados(PagingInfo paginacion, FiltrosModel<HojasModel> filtros)
        {
            IQueryable<SD_VENTA_HOJAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_VENTA_HOJASManager(uow);
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
        public IEnumerable<HojasModel> ObtenerFechasDisponibles(DateTime FECHA_VENTA, int ID_SOCIO_MOVIL)
        {
            List<HojasModel> result = new List<HojasModel>();
            ExecuteManager(uow =>
            {

                var manager = new SD_DETALLE_HOJASManager(uow);
                var vendidas = manager.BuscarTodos(x => x.SD_VENTA_HOJAS.FECHA_VENTA.Month == FECHA_VENTA.Month && x.SD_VENTA_HOJAS.FECHA_VENTA.Year == FECHA_VENTA.Year && x.SD_VENTA_HOJAS.ID_SOCIO_MOVIL == ID_SOCIO_MOVIL);
                int day = 31;
                for (int i = 1; i <= day; i++)
                {
                    HojasModel list = new HojasModel();
                    DateTime date = new DateTime(FECHA_VENTA.Year, FECHA_VENTA.Month, i);
                    var valid = vendidas.Where(x => x.FECHA_USO.Day == date.Day && x.FECHA_USO.Month == date.Month && x.FECHA_USO.Year == date.Year);
                    if (valid.Count() == 0)
                    {
                        list.FECHA = date;
                        list.FECHA_TEXT = String.Format("{0:d/MM/yyyy}", date);
                        result.Add(list);
                    }
                }

            });
            return result;

        }


        public IEnumerable<SD_DETALLE_HOJAS> ObtenerDetallesPaginado(PagingInfo paginacion, FiltrosModel<HojasModel> filtros)
        {
            IQueryable<SD_DETALLE_HOJAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLE_HOJASManager(uow);
                //obtener un query de la tabla choferes
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }


        public RespuestaSP AnularVentaHoja(int ID_VENTA, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_VENTA_HOJASManager(uow);
                var resp = manager.AnularVenta(ID_VENTA);
                decimal tot;
                bool esNumero = decimal.TryParse(resp, out tot);
                if (esNumero)
                {
                    result.msg = "Proceso Ejecutado Correctamente.";
                    result.success = true;
                }
                else
                {
                    result.msg = resp.ToString();
                    result.success = false;
                }

            });
            return result;
        }


        public RespuestaSP GuardarVentaHoja(SD_VENTA_HOJAS venta, string detalles, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_VENTA_HOJASManager(uow);
                var managerDetalle = new SD_DETALLE_HOJASManager(uow);
                var resp = manager.GuardarVenta(venta, login);
                int id_venta;
                bool esNumero = int.TryParse(resp, out id_venta);
                if (esNumero)
                {
                    dynamic detalle_ventas = JsonConvert.DeserializeObject(detalles);
                    foreach (var item in detalle_ventas)
                    {
                        SD_DETALLE_HOJAS det = new SD_DETALLE_HOJAS()
                        {
                            ID_VENTA = id_venta,
                            MONTO = item.MONTO,
                            OBSERVACION = item.OBSERVACION,
                            FECHA_USO = item.FECHA_USO

                        };
                        managerDetalle.GuardarDetalleVenta(det, login);
                    }

                    result.msg = "Proceso Ejecutado Correctamente.";
                    result.success = true;
                }
                else
                {
                    result.msg = resp.ToString();
                    result.success = false;
                }

            });
            return result;
        }
    }
}
