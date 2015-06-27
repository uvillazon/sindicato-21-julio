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
    public class ParadasServices : BaseService, IParadasServices
    {

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
                if (filtros.Contiene != null)
                {
                    result = result.Where(x => x.NOMBRE.ToUpper().Contains(filtros.Contiene.ToUpper()));
                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }


        public IEnumerable<SD_CIERRES_PARADA> ObtenerCierresParadasPaginados(PagingInfo paginacion, FiltrosModel<ParadasModel> filtros)
        {
            IQueryable<SD_CIERRES_PARADA> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_CIERRES_PARADAManager(uow);
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                //
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                //if (filtros.Contiene != null)
                //{
                //    result = result.Where(x => x.NOMBRE.ToUpper().Contains(filtros.Contiene.ToUpper()));
                //}
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_DETALLE_CIERRE_PARADA> ObtenerDetallesCierreParadaPaginados(PagingInfo paginacion, FiltrosModel<ParadasModel> filtros)
        {
            IQueryable<SD_DETALLE_CIERRE_PARADA> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLE_CIERRE_PARADAManager(uow);
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                //
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                //if (filtros.Contiene != null)
                //{
                //    result = result.Where(x => x.NOMBRE.ToUpper().Contains(filtros.Contiene.ToUpper()));
                //}
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarCierre(SD_CIERRES_PARADA cierre, string detalles, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_CIERRES_PARADAManager(uow);
                var managerDetalle = new SD_DETALLE_CIERRE_PARADAManager(uow);
                var managerVenta = new SD_VENTA_HOJASManager(uow);
                var resp = manager.GuardarCierreParada(cierre, login);
                int id_venta;
                bool esNumero = int.TryParse(resp, out id_venta);
                if (esNumero)
                {
                    dynamic detalle_ventas = JsonConvert.DeserializeObject(detalles);
                    foreach (var item in detalle_ventas)
                    {
                        SD_DETALLE_CIERRE_PARADA det = new SD_DETALLE_CIERRE_PARADA()
                        {
                            ID_CIERRE = id_venta,
                            DETALLE = item.DETALLE,
                            INGRESO = item.INGRESO,
                            EGRESO = item.EGRESO

                        };
                        managerDetalle.GuardarDetalleCierreParada(det, login);
                    }
                    //vamos a poner en APROBADO todas las ventas de hoja
                    var ventas = managerVenta.BuscarTodos(x => x.FECHA_VENTA >= cierre.FECHA_INI && x.FECHA_VENTA <= cierre.FECHA_FIN && x.ID_PARADA == cierre.ID_PARADA);
                    foreach (var item in ventas)
                    {
                        item.ESTADO = "APROBADO";
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

        public SD_CIERRES_PARADA ObtenerUltimoRegistroCierre()
        {
            SD_CIERRES_PARADA result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_CIERRES_PARADAManager(uow);
                result = manager.BuscarTodos().OrderByDescending(x => x.ID_CIERRE).FirstOrDefault();
            });
            return result;
        }

        public List<DetalleCierreParadaModel> ObtenerDetalleCierreParada(int ID_PARADA, DateTime FECHA_DESDE, DateTime FECHA_HASTA)
        {
            List<DetalleCierreParadaModel> result = new List<DetalleCierreParadaModel>();
            ExecuteManager(uow =>
            {
                var managerParada = new SD_PARADASManager(uow);
                var managerVentas = new SD_VENTA_HOJASManager(uow);
                var parada = managerParada.BuscarTodos(x => x.ID_PARADA == ID_PARADA).FirstOrDefault();
                var ventas = parada.SD_VENTA_HOJAS.Where(x => x.FECHA_VENTA >= FECHA_DESDE && x.FECHA_VENTA <= FECHA_HASTA);
                var ingresos = parada.SD_CAJAS.SD_INGRESOS.Where(x => x.FECHA >= FECHA_DESDE && x.FECHA <= FECHA_HASTA);
                var egresos = parada.SD_CAJAS.SD_EGRESOS.Where(x => x.FECHA >= FECHA_DESDE && x.FECHA <= FECHA_HASTA);

                //var ingresos para
                if (ventas.Count() > 0) {
                    DetalleCierreParadaModel det = new DetalleCierreParadaModel()
                    {
                        CIERRE =String.Format("{0:dd/MM/yyyy} - {1:dd/MM/yyy}",FECHA_DESDE,FECHA_HASTA),
                        DETALLE = "VENTA  DE HOJAS",
                        EGRESO = 0,
                        INGRESO = (decimal)ventas.Sum(x=>x.TOTAL)
                    };
                    result.Add(det);
                }
                if (ingresos.Count() > 0) {
                    DetalleCierreParadaModel det = new DetalleCierreParadaModel()
                    {
                        CIERRE = String.Format("{0:dd/MM/yyyy} - {1:dd/MM/yyy}", FECHA_DESDE, FECHA_HASTA),
                        DETALLE = "Otros Ingresos",
                        EGRESO = 0,
                        INGRESO = (decimal)ingresos.Sum(x => x.IMPORTE)
                    };
                    result.Add(det);
                }
                if (egresos.Count() > 0)
                {
                    DetalleCierreParadaModel det = new DetalleCierreParadaModel()
                    {
                        CIERRE = String.Format("{0:dd/MM/yyyy} - {1:dd/MM/yyy}", FECHA_DESDE, FECHA_HASTA),
                        DETALLE = "Otros Egresos",
                        EGRESO = (decimal)egresos.Sum(x => x.IMPORTE),
                        INGRESO = 0
                    };
                    result.Add(det);
                }

            });
            return result;
        }
    }
}
