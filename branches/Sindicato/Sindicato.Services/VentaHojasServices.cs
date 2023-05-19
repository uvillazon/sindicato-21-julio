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
                    result = result.Where(SD_HOJAS_CONTROL.Contiene(filtros.Contiene));

                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_IMPRESION_HOJAS> ObtenerImpresionesHojasPaginados(PagingInfo paginacion, FiltrosModel<HojasModel> filtros)
        {
            IQueryable<SD_IMPRESION_HOJAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_IMPRESION_HOJASManager(uow);
                //obtener un query de la tabla choferes
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    result = result.Where(SD_IMPRESION_HOJAS.Contiene(filtros.Contiene));

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


        public RespuestaSP GuardarVentaHoja(SD_HOJAS_CONTROL venta, int CANTIDAD, string HOJAS, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var managerCierre = new SD_CIERRES_CAJASManager(uow);
                var valid = managerCierre.VerificarCierre((DateTime)venta.FECHA_COMPRA);
                if (!valid.success)
                {
                    throw new NullReferenceException(valid.msg);
                }
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_GUARDAR_HOJA(venta.ID_SOCIO_MOVIL, venta.ID_PARADA, venta.ID_CHOFER, venta.FECHA_COMPRA, CANTIDAD, HOJAS, login, p_res);
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
            return result = resultado == null ? result : resultado;
        }

        public RespuestaSP GuardarImpresionHojas(SD_HOJAS_CONTROL venta, int CANTIDAD, string HOJAS, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {


                var manager = new SD_IMPRESION_HOJASManager(uow);
                SD_IMPRESION_HOJAS imp = new SD_IMPRESION_HOJAS()
                {
                    FECHA = venta.FECHA_COMPRA,
                    ID_SOCIO_SOCIO_MOVIL = venta.ID_SOCIO_MOVIL,
                    LOGIN = login,
                    TOTAL_HOJAS = CANTIDAD
                };
                var res = manager.GuardarImpresionHojas(imp, login);
                int id;
                bool esNumero = int.TryParse(res.ToString(), out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = res.ToString();
                }



            });
            return result = resultado == null ? result : resultado;
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

        public SD_DETALLES_HOJAS_USO ObtenerHojaDetalleUso(Expression<Func<SD_DETALLES_HOJAS_USO, bool>> criterio)
        {
            SD_DETALLES_HOJAS_USO result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLES_HOJAS_USOManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();
            });
            return result;
        }

        public SD_DETALLES_IMPRESION_HOJAS ObtenerImpresionHojas(Expression<Func<SD_DETALLES_IMPRESION_HOJAS, bool>> criterio)
        {
            SD_DETALLES_IMPRESION_HOJAS result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DETALLES_IMPRESION_HOJASManager(uow);
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
                //var res = result.Select(x=> x.SD_DETALLES_HOJAS_USO)

            });
            return result;
        }

        public List<SD_DETALLES_HOJAS_USO> ObtenerHojasDetallesPorVentas(int ID_VENTA)
        {
            List<SD_DETALLES_HOJAS_USO> result = new List<SD_DETALLES_HOJAS_USO>();
            ExecuteManager(uow =>
            {
                var manager = new SD_VENTA_HOJASManager(uow);
                //obtener un query de la tabla choferes
                var res = manager.BuscarTodos(x => x.ID_VENTA == ID_VENTA);
                var hojas = res.Select(x => x.SD_HOJAS_CONTROL).OrderByDescending(x => x.FECHA_USO);
                foreach (var item in hojas)
                {
                    foreach (var detalle in item.SD_DETALLES_HOJAS_USO.OrderByDescending(x => x.FECHA_USO))
                    {
                        result.Add(detalle);
                    }
                }


            });
            return result;
        }

        public List<SD_DETALLES_IMPRESION_HOJAS> ObtenerDetallesPorImpresiones(int ID_IMPRESION)
        {
            List<SD_DETALLES_IMPRESION_HOJAS> result = new List<SD_DETALLES_IMPRESION_HOJAS>();
            ExecuteManager(uow =>
            {
                var manager = new SD_IMPRESION_HOJASManager(uow);
                //obtener un query de la tabla choferes
                var res = manager.BuscarTodos(x => x.ID_IMPRESION == ID_IMPRESION).FirstOrDefault();
                foreach (var item in res.SD_DETALLES_IMPRESION_HOJAS.OrderByDescending(x => x.FECHA_USO))
                {
                    result.Add(item);
                }
            });
            return result;
        }

        public List<SD_DETALLES_HOJAS_USO> ObtenerHojasDetallesPorVentasRefuerzos(int ID_VENTA)
        {
            List<SD_DETALLES_HOJAS_USO> result = new List<SD_DETALLES_HOJAS_USO>();
            ExecuteManager(uow =>
            {
                var manager = new SD_VENTA_HOJAS_REFUERZOManager(uow);
                //obtener un query de la tabla choferes
                var res = manager.BuscarTodos(x => x.ID_VENTA == ID_VENTA);
                foreach (var item in res)
                {
                    foreach (var detalle in item.SD_DETALLES_HOJAS_USO.OrderByDescending(x => x.FECHA_USO))
                    {
                        result.Add(detalle);
                    }
                }


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

        public string obtenerPlada(int ID_SOCIO_MOVIL)
        {
            string result = "";
            ExecuteManager(uow =>
            {
                var manager = new SD_SOCIO_MOVILESManager(uow);
                //obtener un query de la tabla choferes
                var socio = manager.BuscarTodos(x => x.ID_SOCIO_MOVIL == ID_SOCIO_MOVIL).FirstOrDefault();
                if (socio != null)
                {
                    var autos = socio.SD_SOCIO_MOVIL_AUTOS.Count() > 0 ? socio.SD_SOCIO_MOVIL_AUTOS.Where(y => y.ESTADO == "ACTIVO").FirstOrDefault() : null;
                    if (autos != null)
                    {
                        result = autos.SD_AUTOS.PLACA;
                    }
                }

            });
            return result;
        }

        public RespuestaSP VerificarVentaHoja(int ID_SOCIO_MOVIL, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_VENTA_HOJASManager(uow);
                var resp = manager.VerificarVentaHoja(ID_SOCIO_MOVIL, login);
                int id;
                bool esNumero = int.TryParse(resp, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = resp;
                }

            });

            return result;
        }

        public IEnumerable<SD_VENTA_HOJAS_REFUERZO> ObtenerVentasRefuerzosPaginados(PagingInfo paginacion, FiltrosModel<HojasModel> filtros)
        {
            IQueryable<SD_VENTA_HOJAS_REFUERZO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_VENTA_HOJAS_REFUERZOManager(uow);
                //obtener un query de la tabla choferes
                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    result = result.Where(SD_VENTA_HOJAS_REFUERZO.Contiene(filtros.Contiene));

                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarVentaRefuerzos(SD_VENTA_HOJAS_REFUERZO venta, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var managerCierre = new SD_CIERRES_CAJASManager(uow);
                var valid = managerCierre.VerificarCierre((DateTime)venta.FECHA);
                if (!valid.success)
                {
                    throw new NullReferenceException(valid.msg);
                }
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_GUARDAR_VENTA_REFUERZO(venta.ID_VENTA, venta.ID_PARADA, venta.NOMBRE, venta.OBSERVACION, venta.FECHA, venta.CODIGO, venta.CANTIDAD, venta.COSTO_UNITARIO, venta.TOTAL, venta.ID_CAJA, venta.PLACA, login, p_res);
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
            return result = resultado == null ? result : resultado;
        }

        public RespuestaSP AnularVentaRefuerzo(int ID_VENTA, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_ANULAR_VENTA_REFUERZO(ID_VENTA, login, p_res);
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


    }
}
