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
    public class ObligacionesServices : BaseService, IObligacionesServices
    {
        public IEnumerable<SD_KARDEX_SOCIO_DEBE> ObtenerKardexPaginados(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros)
        {
            IQueryable<SD_KARDEX_SOCIO_DEBE> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_KARDEX_SOCIO_DEBEManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_OTRAS_OBLIGACIONES> ObtenerObligacionesPaginados(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros)
        {
            IQueryable<SD_OTRAS_OBLIGACIONES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_OTRAS_OBLIGACIONESManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x => x.CONCEPTO.Contains(contiene) || x.SD_SOCIOS.NOMBRE.Contains(contiene) || x.SD_SOCIOS.APELLIDO_PATERNO.Contains(contiene));
                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_AMORTIZACIONES> ObtenerAmortizacionesPaginados(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros)
        {
            IQueryable<SD_AMORTIZACIONES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_AMORTIZACIONESManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x => x.CONCEPTO.Contains(contiene) || x.SD_SOCIOS.NOMBRE.Contains(contiene) || x.SD_SOCIOS.APELLIDO_PATERNO.Contains(contiene));
                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarObligacion(SD_OTRAS_OBLIGACIONES obli, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_OTRAS_OBLIGACIONESManager(uow);
                var ing = manager.GuardarObligaciones(obli, login);
                int id;
                bool esNumero = int.TryParse(ing, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = ing;
                }

            });

            return result;
        }

        public RespuestaSP EliminarObligacion(int ID_OBLIGACION)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_OTRAS_OBLIGACIONESManager(uow);
                var ant = manager.BuscarTodos(x => x.ID_OBLIGACION == ID_OBLIGACION).FirstOrDefault();
                if (ant != null)
                {
                    if (ant.ESTADO == "NUEVO")
                    {
                        manager.Delete(ant);
                        result.success = true;
                        result.msg = "Se elimino Correctamente";
                    }
                    else {
                        result.success = false;
                        result.msg = "No puede Eliminar Obligaciones en Estado diferente a NUEVO";
                    } 
                }
                else
                {
                    result.success = false;
                    result.msg = "Ocurrio algun Problema";
                }
            });
            return result;
        }

        public RespuestaSP GuardarAmortizacion(SD_AMORTIZACIONES amortizacion, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_AMORTIZACIONESManager(uow);
                var ing = manager.GuardarAmortizacion(amortizacion, login);
                int id;
                bool esNumero = int.TryParse(ing, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = ing;
                }

            });

            return result;
        }

        public RespuestaSP EliminarAmortizacion(int ID_AMORTIZACION)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_AMORTIZACIONESManager(uow);
                var context = (SindicatoContext)manager.Context;
                var ant = manager.BuscarTodos(x => x.ID_AMORTIZACION == ID_AMORTIZACION).FirstOrDefault();
                if (ant != null)
                {
                    manager.Delete(ant);
                    var kardex = context.SD_KARDEX_SOCIO_DEBE.Where(x => x.OPERACION == "AMORTIZACIONES" && x.ID_OPERACION == ant.ID_AMORTIZACION && x.ID_SOCIO == ant.ID_SOCIO);
                    foreach (var item in kardex)
                    {
                        context.SD_KARDEX_SOCIO_DEBE.DeleteObject(item);
                    }

                    var kardexIngreso = context.SD_KARDEX_EFECTIVO.Where(x => x.OPERACION == "AMORTIZACIONES" && x.ID_OPERACION == ant.ID_AMORTIZACION && x.ID_CAJA == ant.ID_CAJA);
                    foreach (var item in kardexIngreso)
                    {
                        context.SD_KARDEX_EFECTIVO.DeleteObject(item);
                    }


                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                    manager.Save();
                    context.P_SD_ACT_KARDEX_DEBE(ant.ID_SOCIO, ant.FECHA, 0, p_RES);
                    context.P_SD_ACT_KARDEX_EFECTIVO(ant.ID_CAJA, ant.FECHA, 0, p_RES);
                    result.success = true;
                    result.msg = "Se elimino Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = "Ocurrio algun Problema";
                }
            });
            return result;
        }
    }
}
