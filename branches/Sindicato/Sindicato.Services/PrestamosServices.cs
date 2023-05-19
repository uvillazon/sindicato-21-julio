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

                var managerCierre = new SD_CIERRES_CAJASManager(uow);
                var manager = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                var managerPlan = new SD_PLAN_DE_PAGOManager(uow);
                var valid = managerCierre.VerificarCierre((DateTime)prestamo.FECHA);
                if (!valid.success)
                {
                    throw new NullReferenceException(valid.msg);
                }
                
                result = manager.GuardarPrestamo(prestamo, login);
                if (!result.success)
                {
                    throw new InvalidOperationException(result.msg);

                }
                var planPagos = generarPlanDeCuotasFrances((double)prestamo.IMPORTE_PRESTAMO, (double)prestamo.TASA_INTERES_ANUAL, prestamo.SEMANAS, (DateTime)prestamo.FECHA_INICIO_CUOTA, 1);
                DateTime? fechaFin = null;
                foreach (var item in planPagos)
                {
                    SD_PLAN_DE_PAGO plan = new SD_PLAN_DE_PAGO();
                    plan.ID_PLAN = managerPlan.ObtenerSecuencia();
                    plan.ID_PRESTAMO = result.id;
                    plan.LOGIN_USR = login;
                    plan.NRO_SEMANA = item.NRO_CCUOTA;
                    plan.INTERES_INICIAL = item.INTERES;
                    plan.IMPORTE_A_PAGAR = item.CUOTA;
                    plan.INTERES_A_PAGAR = item.INTERES;
                    plan.CAPITAL_A_PAGAR = item.CAPITAL;
                    plan.SALDO_PRESTAMO = item.SALDO;
                    plan.SALDO_PLAN = item.TOTAL_AMORTIZACION;
                    plan.FECHA_REG = DateTime.Now;
                    plan.FECHA_PAGO = item.FECHA_CUOTA;
                    plan.ESTADO = "NUEVO";
                    managerPlan.Add(plan);
                    fechaFin = item.FECHA_CUOTA;
                }
                prestamo.ESTADO = "CON_PLAN_PAGOS";
                prestamo.FECHA_LIMITE_PAGO = fechaFin ;

            });
            return result = resultado == null ? result : resultado;
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
                var managerCierre = new SD_CIERRES_CAJASManager(uow);
                var manager = new SD_PAGO_DE_PRESTAMOSManager(uow);
                var managerPlan = new SD_PLAN_DE_PAGOManager(uow);

                var valid = managerCierre.VerificarCierre((DateTime)pago.FECHA);
                if (!valid.success)
                {
                    throw new NullReferenceException(valid.msg);
                }
                result = manager.GuardarPagoPrestamo(pago, login);
                if (pago.TIPO_PAGO == "EXTENDER PRESTAMO")
                {
                    var resp = managerPlan.GenerarPlanDePagos((int)pago.ID_PRESTAMO_REF, login);
                }


            });
            return result = resultado == null ? result : resultado;
        }

        public RespuestaSP GuardarPagoTotalPrestamo(SD_PAGO_DE_PRESTAMOS pago, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_PAGO_DE_PRESTAMOSManager(uow);
                var managerPlan = new SD_PLAN_DE_PAGOManager(uow);
                result = manager.GuardarPagoTotalPrestamo(pago, login);
                if (!result.success)
                {
                    throw new NullReferenceException(result.msg);
                }
                var planPago = managerPlan.BuscarTodos(x => x.ID_PAGO == result.id).FirstOrDefault();
                //  var detalles = generarPlanDeCuotasFrances(planPago.SALDO_PRESTAMO,planPago.SD_PRESTAMOS_POR_SOCIOS.TASA_INTERES_ANUAL,




            });
            return result = resultado == null ? result : resultado;
        }

        public RespuestaSP EliminarPagoPrestamo(int ID_PAGO, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_PAGO_DE_PRESTAMOSManager(uow);
                result = manager.EliminarPagoPrestamo(ID_PAGO, login);


            });
            return result = resultado == null ? result : resultado;
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

        public RespuestaSP ObtenerImporteDeuda(string TIPO, DateTime FECHA, int ID_PRESTAMO, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                var managerPlan = new SD_PLAN_DE_PAGOManager(uow);
                var managerPagos = new SD_PAGO_DE_PRESTAMOSManager(uow);
                var prestamo = manager.BuscarTodos(x => x.ID_PRESTAMO == ID_PRESTAMO).FirstOrDefault();
                decimal importe = 0;
                decimal cuota_capital = 0;
                decimal cuota_interes = 0;
                decimal condonacion_interes = 0;
                string msg = "";
                if (TIPO == "PAGAR CUOTA")
                {
                    var plan = managerPlan.BuscarTodos(x => x.ID_PRESTAMO == ID_PRESTAMO && x.ESTADO != "CANCELADO").OrderBy(y => y.NRO_SEMANA).FirstOrDefault();
                    if (plan != null)
                    {
                        importe = plan.IMPORTE_A_PAGAR + plan.INTERES_A_PAGAR;
                        cuota_capital = plan.IMPORTE_A_PAGAR;
                        cuota_interes = plan.INTERES_A_PAGAR;

                    }
                    else
                    {
                        importe = 0;
                        cuota_capital = 0;
                        cuota_interes = 0;
                    }
                    result.success = true;
                    result.data = new { importe = importe, cuota_capital = cuota_capital, cuota_interes = cuota_interes, condonacion_interes = condonacion_interes };

                }
                else if (TIPO == "PAGAR TOTAL DEUDA")
                {
                    FECHA = FECHA.AddMonths(1);
                    var planes = managerPlan.BuscarTodos(x => x.ID_PRESTAMO == ID_PRESTAMO && x.ESTADO != "CANCELADO");
                    foreach (var item in planes)
                    {
                        if (item.FECHA_PAGO <= FECHA)
                        {
                            importe = importe + item.IMPORTE_A_PAGAR + item.INTERES_A_PAGAR;
                            cuota_capital = cuota_capital + item.IMPORTE_A_PAGAR;
                            cuota_interes = cuota_interes + item.INTERES_A_PAGAR;
                        }
                        else
                        {
                            importe = importe + item.IMPORTE_A_PAGAR;
                            cuota_capital = cuota_capital + item.IMPORTE_A_PAGAR;
                            condonacion_interes = condonacion_interes + item.INTERES_A_PAGAR;

                        }
                    }
                    result.success = true;
                    result.data = new { importe = importe, cuota_capital = cuota_capital, cuota_interes = cuota_interes, condonacion_interes = condonacion_interes };

                }
                else if (TIPO == "EXTENDER PRESTAMO")
                {
                    FECHA = FECHA.AddMonths(1);
                    decimal cancelado = managerPagos.BuscarTodos(x => x.ID_PRESTAMO == ID_PRESTAMO && x.ESTADO != "ANULADO").Count() > 0 ? managerPagos.BuscarTodos(x => x.ID_PRESTAMO == ID_PRESTAMO && x.ESTADO != "ANULADO").Sum(y => y.IMPORTE) : 0;
                    if (cancelado > 0)
                    {
                        result.success = false;
                        result.msg = string.Format("El prestamo Nro: {0} tiene el importe : {1} CANCELADO", ID_PRESTAMO, cancelado);
                    }
                    else
                    {
                        var planes = managerPlan.BuscarTodos(x => x.ID_PRESTAMO == ID_PRESTAMO && x.ESTADO != "CANCELADO");
                        foreach (var item in planes)
                        {
                            importe = importe + item.INTERES_A_PAGAR;
                            cuota_interes = cuota_interes + item.INTERES_A_PAGAR;
                        }
                        result.success = true;
                        result.data = new { importe = importe, cuota_capital = cuota_capital, cuota_interes = cuota_interes, condonacion_interes = condonacion_interes };
                    }

                }
                else
                {
                    result.success = false;
                    result.msg = "No Existe el Tipo de PAGO definido";
                }



            });
            return result;
        }

        public List<PlanPagosModel> generarPlanDeCuotasFrances(double capital, double tasaAnual, int plazoMeses, DateTime fechaPago , int decimales)
        {
            List<PlanPagosModel> result = new List<PlanPagosModel>();


            double pagoMensual = (capital * tasaAnual / 12) / (1 - Math.Pow(1 + tasaAnual / 12, -plazoMeses));
            double interesMensual, capitalRestante = capital, totalPagado = 0, totalIntereses = 0,totalAmortizacion = 0;

            for (int i = 1; i <= plazoMeses; i++)
            {
                PlanPagosModel item = new PlanPagosModel();
                interesMensual = capitalRestante * tasaAnual / 12;
              
                // Verificar si la fecha de pago cae en domingo
                if (fechaPago.DayOfWeek == DayOfWeek.Sunday)
                {
                    // Si la fecha de pago es domingo, sumar un día y aumentar el interés en consecuencia
                    fechaPago = fechaPago.AddDays(1);
                    interesMensual += capitalRestante * tasaAnual / 12 / 30;
                }

                double cuota = pagoMensual;
                if (i == plazoMeses)
                {
                    cuota = capitalRestante + interesMensual;
                }
                cuota = Math.Round(cuota, decimales);
                double interesCuota = Math.Round(interesMensual, decimales);
                double capitalCuota = Math.Round(cuota - interesCuota, decimales);
                totalAmortizacion += capitalCuota;
                capitalRestante -= capitalCuota;
                // Console.WriteLine("Mes: {0} - Pago mensual: {1:C2} - Interés mensual: {2:C2} - Capital restante: {3:C2} - Fecha de pago: {4:d}", i, pagoMensual, interesMensual, capitalRestante, fechaPago);
                item.NRO_CCUOTA = i;
                item.CUOTA = (decimal)cuota;
                item.INTERES = (decimal)interesCuota;
                item.CAPITAL = (decimal)capitalCuota;
                item.SALDO = (decimal)Math.Round(capitalRestante, decimales); 
                item.TOTAL_AMORTIZACION = (decimal)Math.Round(totalAmortizacion, decimales); 
                item.FECHA_CUOTA = fechaPago;
                if (i < plazoMeses)
                {
                    totalPagado += cuota;
                }
                else
                {
                    item.NRO_CCUOTA = i;
                    item.CUOTA = (decimal)cuota;
                    item.INTERES = (decimal)interesCuota;
                    item.CAPITAL = (decimal)capitalCuota;
                    item.SALDO = 0;
                    item.FECHA_CUOTA = fechaPago;
                    //Console.WriteLine("Mes: {0} - Pago mensual: {1:C2} - Interés mensual: {2:C2} - Capital restante: {3:C2} - Fecha de pago: {4:d}", i, pagoMensualUltimo, interesMensual, 0, fechaPago);
                }
                totalIntereses += interesMensual;
                fechaPago = fechaPago.AddMonths(1);
                result.Add(item);
            }


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
                    string observacion = mora > 0 ? String.Format("El importe incluye la mora de la semana de {0}", res.NRO_SEMANA) : String.Format("Pago de Cuota Nro de Semana {0}", res.NRO_SEMANA);
                    result.data = new
                    {
                        ID_PRESTAMO = res.ID_PRESTAMO,
                        NRO_MOVIL = res.SD_PRESTAMOS_POR_SOCIOS.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                        NRO_SEMANA = res.NRO_SEMANA,
                        DIAS_RETRASO = res.DIAS_RETRASO,
                        ID_PLAN = res.ID_PLAN,

                        MORA = mora,
                        SOCIO = res.SD_PRESTAMOS_POR_SOCIOS.SD_SOCIO_MOVILES.ObtenerNombreSocio(),
                        ID_CAJA = res.SD_PRESTAMOS_POR_SOCIOS.ID_CAJA,
                        CAJA = res.SD_PRESTAMOS_POR_SOCIOS.SD_CAJAS.NOMBRE,
                        IMPORTE_PRESTAMO = res.SD_PRESTAMOS_POR_SOCIOS.IMPORTE_PRESTAMO,
                        CUOTA = res.IMPORTE_A_PAGAR + mora,
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
                var managerPrestamo = new SD_PRESTAMOS_POR_SOCIOSManager(uow);
                var res1 = manager.BuscarTodos(x => x.ID_PRESTAMO == ID_PRESTAMO && x.ESTADO == "NUEVO").OrderBy(y => y.NRO_SEMANA);
                if (res1.Count() == 0)
                {
                    result.success = false;
                    result.msg = "No tiene Cuota Pendiente";
                }
                else
                {
                    DateTime fechaInicio;
                    decimal capital;
                    var prestamo = managerPrestamo.BuscarTodos(x => x.ID_PRESTAMO == ID_PRESTAMO).FirstOrDefault();
                    var pago = context.SD_PAGO_DE_PRESTAMOS.Where(x => x.ID_PRESTAMO == ID_PRESTAMO && x.ESTADO != "ANULADO").OrderByDescending(y=>y.ID_PAGO).FirstOrDefault();
                    if (pago == null)
                    {
                        fechaInicio = prestamo.FECHA;
                        capital = prestamo.IMPORTE_PRESTAMO;
                    }
                    else {
                        fechaInicio = pago.SD_PLAN_DE_PAGO.FECHA_PAGO;
                        capital = pago.SD_PLAN_DE_PAGO.SALDO_PRESTAMO;
                    }
                    decimal interesDiario = (decimal)prestamo.TASA_INTERES_ANUAL / 365;
                    TimeSpan  diferencia = DateTime.Now - fechaInicio;
                    int dias = diferencia.Days;
                    result.success = true;
                    result.msg = "Proceso ejecutado correctamente";
                    DateTime fechaActual = DateTime.Now.Date.AddDays(7);
                    decimal total = 0;
                    decimal condonacion = 0;
                    decimal interes_calculado = dias * interesDiario * capital;
                    var moras = context.SD_PRESTAMOS_MORA.Where(x => x.ID_PRESTAMO == ID_PRESTAMO && x.ESTADO == "NUEVO");
                    decimal total_mora = 0;
                    if (moras.Count() > 0)
                    {
                        total_mora = context.SD_PRESTAMOS_MORA.Where(x => x.ID_PRESTAMO == ID_PRESTAMO && x.ESTADO == "NUEVO").Sum(x => x.IMPORTE_MORA);

                    }
                    var res = res1.FirstOrDefault();

                    result.data = new
                    {
                        ID_PRESTAMO = res.ID_PRESTAMO,
                        ID_SOCIO_MOVIL = res.SD_PRESTAMOS_POR_SOCIOS.ID_SOCIO_MOVIL,
                        NRO_MOVIL = res.SD_PRESTAMOS_POR_SOCIOS.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                        NRO_SEMANA = res.NRO_SEMANA,
                        SOCIO = res.SD_PRESTAMOS_POR_SOCIOS.SD_SOCIO_MOVILES.ObtenerNombreSocio(),
                        ID_CAJA = res.SD_PRESTAMOS_POR_SOCIOS.ID_CAJA,
                        CAJA = res.SD_PRESTAMOS_POR_SOCIOS.SD_CAJAS.NOMBRE,
                        IMPORTE_PRESTAMO = res.SD_PRESTAMOS_POR_SOCIOS.IMPORTE_PRESTAMO,
                        DIAS_RETRASO = res.DIAS_RETRASO,
                        TOTAL_CONDONACION = condonacion,
                        INTERES_CALCULADO_A_FECHA = interes_calculado ,
                        CAPITAL = capital,
                        MORA = total_mora,
                        FECHA_CUOTA = res.FECHA_PAGO.ToString("yyyy-MM-dd"),
                        CUOTA = (decimal)total_mora + (decimal)capital + (decimal)interes_calculado,


                    };
                }

            });
            return result;


        }

    }
}
