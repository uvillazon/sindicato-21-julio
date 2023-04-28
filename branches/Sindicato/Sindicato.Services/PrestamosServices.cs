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

                context.P_SD_GUARDAR_TIPO_PRESTAMO(tipo.ID_TIPO, tipo.ID_CAJA, tipo.NOMBRE, tipo.OBSERVACION, tipo.MONEDA, tipo.IMPORTE_MAXIMO, tipo.IMPORTE_MINIMO, tipo.INTERES, tipo.MULTA_POR_MORA, tipo.SEMANAS, tipo.CATEGORIA, tipo.TIPO_INTERES, tipo.INTERES_FIJO, tipo.DIAS_ESPERA_MORA, login, p_res);
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
                result = manager.GuardarPrestamo(prestamo, login);


            });
            if (msgError != "")
            {
                result.msg = msgError;
                result.success = false;
            }
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
                result = manager.GenerarPlanDePagos(ID_PRESTAMO, login);


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

        public RespuestaSP GuardarPagoTotalPrestamo(SD_PAGO_DE_PRESTAMOS pago, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_PAGO_DE_PRESTAMOSManager(uow);
                result = manager.GuardarPagoTotalPrestamo(pago, login);


            });
            return result;
        }

        public RespuestaSP GuardarRefinanciamientoPrestamo(SD_PAGO_DE_PRESTAMOS pago, SD_PRESTAMOS_POR_SOCIOS pres, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_PAGO_DE_PRESTAMOSManager(uow);
                var managerPrestamo = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                var managerPlan = new SD_PLAN_DE_PAGOManager(uow);

                result = manager.GuardarPagoTotalPrestamo(pago, login);
                if (!result.success) {
                    throw new InvalidOperationException(result.msg);

                }
                pres.IMPORTE_PRESTAMO = pres.IMPORTE_A_PRESTAR;
                pres.ID_PRESTAMO_REF = pres.ID_PRESTAMO;
                result = managerPrestamo.GuardarPrestamo(pres, login);
                if (!result.success)
                {
                    throw new InvalidOperationException(result.msg);

                }

                result = managerPlan.GenerarPlanDePagos(result.id, login);
                if (!result.success)
                {
                    throw new InvalidOperationException(result.msg);

                }


            });
            if (msgError != "")
            {
                result.msg = msgError;
                result.success = false;
            }
            return result;
        }

        public RespuestaSP EliminarPagoPrestamo(int ID_PAGO, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_PAGO_DE_PRESTAMOSManager(uow);
                
                result = manager.EliminarPagoPrestamo(ID_PAGO, login);
                
            });
            if (msgError != "")
            {
                result.msg = msgError;
                result.success = false;
            }
            return result;


        }

        public RespuestaSP GuardarMora(SD_PRESTAMOS_MORA mora, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_PRESTAMOS_MORAManager(uow);
                result = manager.GuardarMora(mora, login);


            });
            return result;
        }

        public RespuestaSP EliminarMora(int ID_MORA)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_PRESTAMOS_MORAManager(uow);
                result = manager.EliminarMora(ID_MORA, "Anular");


            });
            return result;


        }

        public RespuestaSP ObtenerPlanDePagoACancelar(int ID_PRESTAMO)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_PLAN_DE_PAGOManager(uow);
                var res = manager.BuscarTodos(x => x.ID_PRESTAMO == ID_PRESTAMO && x.ESTADO == "NUEVO").OrderBy(y => y.NRO_SEMANA).FirstOrDefault();
                if (res == null)
                {
                    result.success = false;
                    result.msg = "No tiene Cuota Pendiente";
                }
                else
                {
                    result.success = true;
                    result.msg = "Proceso ejecutado correctamente";
                    decimal mora = res.SD_PRESTAMOS_MORA.Where(x => x.ESTADO == "NUEVO").Count() > 0 ? res.SD_PRESTAMOS_MORA.Where(x => x.ESTADO == "NUEVO").Sum(x => x.IMPORTE_MORA) : 0;
                    string observacion = mora > 0 ? String.Format("El importe incluye la mora de la semana de {0}",res.NRO_SEMANA): String.Format("Pago de Cuota Nro de Semana {0}",res.NRO_SEMANA);
                    result.data = new
                    {
                        ID_PRESTAMO = res.ID_PRESTAMO,
                        NUMERO = res.SD_PRESTAMOS_POR_SOCIOS.NUMERO,
                        NRO_MOVIL = res.SD_PRESTAMOS_POR_SOCIOS.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                        NRO_SEMANA = res.NRO_SEMANA,
                        DIAS_RETRASO = res.DIAS_RETRASO,
                        ID_PLAN = res.ID_PLAN,

                        MORA =mora,
                        SOCIO = res.SD_PRESTAMOS_POR_SOCIOS.SD_SOCIO_MOVILES.ObtenerNombreSocio(),
                        ID_CAJA = res.SD_PRESTAMOS_POR_SOCIOS.ID_CAJA,
                        CAJA = res.SD_PRESTAMOS_POR_SOCIOS.SD_CAJAS.NOMBRE,
                        IMPORTE_PRESTAMO = res.SD_PRESTAMOS_POR_SOCIOS.IMPORTE_PRESTAMO,
                        CUOTA = res.IMPORTE_A_PAGAR + res.INTERES_A_PAGAR + mora,
                        OBSERVACION = observacion

                    };
                }

            });
            return result;


        }

        public RespuestaSP ObtenerTotalACancelar(int ID_PRESTAMO)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                var manager = new SD_PLAN_DE_PAGOManager(uow);
                var res1 = manager.BuscarTodos(x => x.ID_PRESTAMO == ID_PRESTAMO && x.ESTADO == "NUEVO").OrderBy(y => y.NRO_SEMANA);
                if (res1.Count() == 0)
                {
                    result.success = false;
                    result.msg = "No tiene Cuota Pendiente";
                }
                else
                {
                    result.success = true;
                    result.msg = "Proceso ejecutado correctamente";
                    DateTime fechaActual = DateTime.Now.Date.AddDays(7);
                    decimal total = 0;
                    decimal condonacion = 0;
                    var moras = context.SD_PRESTAMOS_MORA.Where(x => x.ID_PRESTAMO == ID_PRESTAMO && x.ESTADO == "NUEVO");
                    decimal total_mora = 0;
                    if (moras.Count() > 0) {
                         total_mora = context.SD_PRESTAMOS_MORA.Where(x => x.ID_PRESTAMO == ID_PRESTAMO && x.ESTADO == "NUEVO").Sum(x => x.IMPORTE_MORA);

                    }
                    

                    
                    foreach (var item in res1)
                    {
                        if (item.FECHA_PAGO < fechaActual)
                        {
                            total = total + (item.IMPORTE_A_PAGAR + item.INTERES_A_PAGAR);
                        }
                        else
                        {
                            total = total + item.IMPORTE_A_PAGAR;
                            condonacion = condonacion + item.INTERES_A_PAGAR;
                        }
                    }
                    var res = res1.FirstOrDefault();

                    result.data = new
                    {
                        ID_PRESTAMO = res.ID_PRESTAMO,
                        ID_SOCIO_MOVIL = res.SD_PRESTAMOS_POR_SOCIOS.ID_SOCIO_MOVIL,
                        NUMERO = res.SD_PRESTAMOS_POR_SOCIOS.NUMERO,
                        NRO_MOVIL = res.SD_PRESTAMOS_POR_SOCIOS.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                        NRO_SEMANA = res.NRO_SEMANA,
                        SOCIO = res.SD_PRESTAMOS_POR_SOCIOS.SD_SOCIO_MOVILES.ObtenerNombreSocio(),
                        ID_CAJA = res.SD_PRESTAMOS_POR_SOCIOS.ID_CAJA,
                        CAJA = res.SD_PRESTAMOS_POR_SOCIOS.SD_CAJAS.NOMBRE,
                        IMPORTE_PRESTAMO = res.SD_PRESTAMOS_POR_SOCIOS.IMPORTE_PRESTAMO,
                        DIAS_RETRASO = res.DIAS_RETRASO,
                        CUOTA = total + total_mora,
                        TOTAL_CONDONACION = condonacion

                    };
                }

            });
            return result;


        }



        public IEnumerable<SD_PRESTAMOS_MORA> ObtenerMorasPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros)
        {
            IQueryable<SD_PRESTAMOS_MORA> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_PRESTAMOS_MORAManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(x => x.LOGIN_USR.Contains(contiene));

                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }
    }

}
