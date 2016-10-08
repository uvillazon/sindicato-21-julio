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
    public class PrestamosServices : BaseService, IPrestamosServices
    {
        //public IEnumerable<SD_INGRESOS_POR_SOCIOS> ObtenerIngresosPorSocioPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros)
        //{
        //    IQueryable<SD_INGRESOS_POR_SOCIOS> result = null;
        //    ExecuteManager(uow =>
        //    {
        //        var manager = new SD_INGRESOS_POR_SOCIOSManager(uow);

        //        result = manager.BuscarTodos();
        //        filtros.FiltrarDatos();
        //        result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
        //        if (!string.IsNullOrEmpty(filtros.Contiene))
        //        {
        //            var contiene = filtros.Contiene.Trim().ToUpper();
        //            result = result.Where(x => x.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO.Contains(contiene)||  x.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE.Contains(contiene) || x.SD_CAJAS.NOMBRE.Contains(contiene));

        //        }
        //        paginacion.total = result.Count();

        //        result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

        //    });
        //    return result;
        //}
        public IEnumerable<SD_PRESTAMOS_POR_SOCIOS> ObtenerPrestamosPorSocioPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros)
        {
            IQueryable<SD_PRESTAMOS_POR_SOCIOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_PRESTAMOS_POR_SOCIOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(SD_PRESTAMOS_POR_SOCIOS.Contiene(filtros.Contiene));

                    //result = result.Where(x => x.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO.Contains(contiene) || x.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE.Contains(contiene) || x.SD_CAJAS.NOMBRE.Contains(contiene));

                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_TIPOS_PRESTAMOS> ObtenerTiposPrestamosPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros)
        {
            IQueryable<SD_TIPOS_PRESTAMOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_TIPOS_PRESTAMOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x => x.CATEGORIA.Contains(contiene) || x.NOMBRE.Contains(contiene));

                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_PLAN_DE_PAGO> ObtenerPlanDePagosPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros)
        {
            IQueryable<SD_PLAN_DE_PAGO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_PLAN_DE_PAGOManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                //if (!string.IsNullOrEmpty(filtros.Contiene))
                //{
                //    var contiene = filtros.Contiene.Trim().ToUpper();
                //    result = result.Where(x => x.CATEGORIA.Contains(contiene) || x.NOMBRE.Contains(contiene));

                //}
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_PAGO_DE_PRESTAMOS> ObtenerPagosPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros)
        {
            IQueryable<SD_PAGO_DE_PRESTAMOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_PAGO_DE_PRESTAMOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                //if (!string.IsNullOrEmpty(filtros.Contiene))
                //{
                //    var contiene = filtros.Contiene.Trim().ToUpper();
                //    result = result.Where(x => x.CATEGORIA.Contains(contiene) || x.NOMBRE.Contains(contiene));

                //}
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarTipoPrestamo(SD_TIPOS_PRESTAMOS tipo, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

                context.P_SD_GUARDAR_TIPO_PRESTAMO(tipo.ID_TIPO, tipo.ID_CAJA, tipo.NOMBRE, tipo.OBSERVACION, tipo.MONEDA, tipo.IMPORTE_MAXIMO, tipo.IMPORTE_MINIMO, tipo.INTERES, tipo.MULTA_POR_MORA, tipo.SEMANAS, tipo.CATEGORIA, tipo.TIPO_INTERES, tipo.INTERES_FIJO, login, p_res);
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

        public RespuestaSP EliminarTipoPrestamo(int ID_TIPO)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_TIPOS_PRESTAMOSManager(uow);
                var res = manager.EliminarTipoPrestamo(ID_TIPO);
                int id;
                bool esNumero = int.TryParse(res, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = res;
                }

            });
            return result;
        }

        public RespuestaSP GuardarPrestamo(SD_PRESTAMOS_POR_SOCIOS prestamo, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                result = manager.GuardarPrestamo(prestamo , login);
              

            });
            return result;
        }
       
        

        public RespuestaSP EliminarPrestamo(int ID_PRESTAMO)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                result = manager.EliminarPrestamo(ID_PRESTAMO);


            });
            return result;
        }

        //
        public RespuestaSP GenerarPlanDePagos(int ID_PRESTAMO, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_PLAN_DE_PAGOManager(uow);
                result = manager.GenerarPlanDePagos(ID_PRESTAMO,login);


            });
            return result;
        }

        public RespuestaSP GuardarPagoPrestamo(SD_PAGO_DE_PRESTAMOS pago, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_PAGO_DE_PRESTAMOSManager(uow);
                result = manager.GuardarPagoPrestamo(pago, login);


            });
            return result;
        }

        public RespuestaSP EliminarPagoPrestamo(int ID_PAGO)
        {
            throw new NotImplementedException();
        }
    }

}
