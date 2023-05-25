
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Common.Data;
using Sindicato.Model;
using Sindicato.Common.Data.Interfaces;
using System.Data.Objects;

namespace Sindicato.Business
{
    public class SD_PAGO_DE_PRESTAMOSManager : Repository<SD_PAGO_DE_PRESTAMOS>
    {


        public SD_PAGO_DE_PRESTAMOSManager(IUnitOfWork uow) : base(uow) { }

        public RespuestaSP GuardarPagoTotalPrestamo(SD_PAGO_DE_PRESTAMOS pago, string login)
        {
            RespuestaSP result = new RespuestaSP();
            try
            {
                var context = (SindicatoContext)Context;
                var pres = context.SD_PRESTAMOS_POR_SOCIOS.Where(x => x.ID_PRESTAMO == pago.ID_PRESTAMO && x.ESTADO != "ANULADO").FirstOrDefault();
                if (pres == null)
                {
                    result.success = false;
                    result.msg = "No existe prestamo";
                    return result;
                }
                var planPago = context.SD_PLAN_DE_PAGO.Where(x => x.ID_PLAN == pago.ID_PLAN && x.ESTADO == "NUEVO").FirstOrDefault();
                if (planPago == null)
                {
                    result.success = false;
                    result.msg = "la cuota ya fue cancelado o no tiene nada pendiente de pagos";
                    return result;
                }
                var mora = context.SD_PRESTAMOS_MORA.Where(x => x.ID_PLAN == planPago.ID_PLAN && x.ESTADO == "NUEVO").FirstOrDefault();
                decimal total_mora_cuota = 0;
                decimal total_mora = 0;

                if (mora != null)
                {
                    total_mora_cuota = mora.IMPORTE_MORA;
                }


                var cuotaminina = planPago.CAPITAL_A_PAGAR + pago.INTERES_CALCULADO_A_FECHA + total_mora_cuota;
                if (cuotaminina > pago.IMPORTE)
                {
                    result.success = false;
                    result.msg = "el importe debe ser mayor a la cuota minima , cuota minima = "+ cuotaminina;
                    return result;
                }
                var moras = context.SD_PRESTAMOS_MORA.Where(x => x.ID_PRESTAMO == pago.ID_PRESTAMO && x.ESTADO == "NUEVO");
                foreach (var item in moras)
                {
                    total_mora = total_mora + item.IMPORTE_MORA;
                }

                //no puede pagar mas del credito
                var cuotaMaxima = (planPago.SALDO_PRESTAMO+planPago.CAPITAL_A_PAGAR)  + pago.INTERES_CALCULADO_A_FECHA + total_mora;
                if (pago.IMPORTE > cuotaMaxima)
                {
                    result.success = false;
                    result.msg = "el importe es mayor a lo adeudado";
                    return result;
                }
                decimal saldo_amortizacion = 0;
                decimal saldo_prestamo = 0;
                if (planPago.NRO_SEMANA > 1) {
                    var planPagoAnterior = context.SD_PLAN_DE_PAGO.Where(x => x.ID_PRESTAMO == planPago.ID_PRESTAMO && x.NRO_SEMANA < planPago.NRO_SEMANA).OrderByDescending(x => x.NRO_SEMANA).FirstOrDefault();
                    if (planPagoAnterior != null) {
                        saldo_amortizacion = planPagoAnterior.SALDO_PLAN;
                        saldo_prestamo = planPagoAnterior.SALDO_PRESTAMO;
                    }
                }
                pago.ID_PAGO = ObtenerSecuencia();
                planPago.ID_PAGO = pago.ID_PAGO;
                planPago.INTERES_A_PAGAR = (decimal)pago.INTERES_CALCULADO_A_FECHA;
                pago.ID_PLAN = planPago.ID_PLAN;

                pago.LOGIN_USR = login;
                pago.MONEDA = pres.MONEDA;
                pago.ID_CAJA = pres.ID_CAJA;
                pago.FECHA_REG = DateTime.Now;
                pago.ESTADO = "NUEVO";
                

                //si se paga todo el credito solo se debe poner en 0 el ressto sin actualizar el plan de pago
                if (pago.IMPORTE == cuotaMaxima)
                {
                    pago.TIPO = "TOTAL";
                    planPago.CAPITAL_A_PAGAR = pago.IMPORTE - ((decimal)pago.INTERES_CALCULADO_A_FECHA + total_mora);
                    planPago.MORA_A_PAGAR = total_mora;
                    planPago.IMPORTE_A_PAGAR = pago.IMPORTE;
                    pago.IMPORTE_MORA = total_mora;
                    planPago.FECHA_PAGO = pago.FECHA;
                    planPago.SALDO_PRESTAMO = 0;
                    planPago.ESTADO = "CANCELADO";
                    planPago.SALDO_PLAN =saldo_amortizacion + planPago.CAPITAL_A_PAGAR;
                    planPago.CONDONACION = planPago.INTERES_INICIAL - planPago.INTERES_A_PAGAR;

                }
                else
                {
                    pago.TIPO = "PARCIAL";
                    var capital = planPago.CAPITAL_A_PAGAR;
                    planPago.CAPITAL_A_PAGAR = pago.IMPORTE - ((decimal)pago.INTERES_CALCULADO_A_FECHA + total_mora_cuota);
                    planPago.MORA_A_PAGAR = total_mora_cuota;
                    pago.IMPORTE_MORA = total_mora_cuota;
                    planPago.IMPORTE_A_PAGAR = pago.IMPORTE;
                    planPago.FECHA_PAGO = pago.FECHA;
                    planPago.SALDO_PRESTAMO = (planPago.SALDO_PRESTAMO + capital) - planPago.CAPITAL_A_PAGAR;
                    planPago.ESTADO = "CANCELADO";
                    planPago.SALDO_PLAN =saldo_amortizacion+ planPago.CAPITAL_A_PAGAR;
                    planPago.CONDONACION = planPago.INTERES_INICIAL - planPago.INTERES_A_PAGAR;


                }
                Add(pago);
             
        
                //pres.SALDO = pres.SALDO + pago.IMPORTE;
                //pres.CONDONACION_INTERES = pago.TOTAL_CONDONACION;

                ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                int idKardex = Convert.ToInt32(p_RES.Value);
                SD_KARDEX_EFECTIVO kardex = new SD_KARDEX_EFECTIVO()
                {
                    ID_KARDEX = idKardex,
                    DETALLE = string.Format("PAGO {3} DEL PRESTAMO {0} NRO : {1} - NRO MOVIL : {2}", pres.SD_TIPOS_PRESTAMOS.NOMBRE, pres.ID_PRESTAMO, pres.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL , pago.TIPO),
                    //DETALLE = "Pago de Prestamo Nro :"+ pres.ID_PRESTAMO,
                    FECHA = (DateTime)pago.FECHA,
                    FECHA_REG = DateTime.Now,
                    ID_OPERACION = pago.ID_PAGO,
                    ID_CAJA = pago.ID_CAJA,
                    INGRESO = pago.IMPORTE,
                    LOGIN = login,
                    OPERACION = "PAGO PRESTAMO"
                };
                context.SD_KARDEX_EFECTIVO.AddObject(kardex);
                Save();
                context.P_SD_ACT_KARDEX_EFECTIVO(pago.ID_CAJA, pago.FECHA, 0, p_RES);
                result.success = true;
                result.msg = "proceso Ejectuado correctamente";
                result.id = pago.ID_PAGO;
            }
            catch (Exception e)
            {

                throw new InvalidOperationException(e.Message);

            }

            return result;
        }
        public RespuestaSP GuardarPagoPrestamo(SD_PAGO_DE_PRESTAMOS pago, string login)
        {
            RespuestaSP result = new RespuestaSP();
            try
            {
                var context = (SindicatoContext)Context;
                int ID_PAGO = 0;
                var pres = context.SD_PRESTAMOS_POR_SOCIOS.Where(x => x.ID_PRESTAMO == pago.ID_PRESTAMO && x.ESTADO != "ANULADO").FirstOrDefault();
                if (pres == null)
                {
                    result.success = false;
                    result.msg = "No existe prestamo";
                    return result;
                }

                var plan = context.SD_PLAN_DE_PAGO.Where(x => x.ID_PLAN == pago.ID_PLAN && x.ESTADO == "NUEVO").FirstOrDefault();
                if (plan == null)
                {
                    result.success = false;
                    result.msg = "No existe Plan";
                    return result;
                }

                var moraPlan = context.SD_PRESTAMOS_MORA.Where(x => x.ID_PLAN == pago.ID_PLAN && x.ESTADO == "NUEVO").FirstOrDefault();
                decimal importeMora = 0;
                if (moraPlan != null)
                {
                    importeMora = moraPlan.IMPORTE_MORA;


                }

                if (pago.IMPORTE > (plan.IMPORTE_A_PAGAR + importeMora))
                {
                    result.success = false;
                    result.msg = "No puede pagar mas de la cuota establecida y la mora establecida, este ultimo si existiera";
                    return result;
                }


                var moras = pres.SD_PRESTAMOS_MORA.Where(x => x.ID_PRESTAMO == pago.ID_PRESTAMO && x.ESTADO != "ANULADO").Sum(x => x.IMPORTE_MORA);
                var cancelado = pres.SD_PAGO_DE_PRESTAMOS.Where(x => x.ESTADO != "ANULADO").Sum(x => x.IMPORTE);
                if (cancelado + pago.IMPORTE > (pres.IMPORTE_INTERES + pres.IMPORTE_PRESTAMO + moras))
                {
                    result.success = false;
                    result.msg = "No puedo pagar mas del total prestado + el interes + moras";
                    return result;
                }

                pago.LOGIN_USR = login;
                pago.MONEDA = pres.MONEDA;
                pago.ID_CAJA = pres.ID_CAJA;
                pago.ID_PLAN = pago.ID_PLAN;
                pago.ID_PAGO = ObtenerSecuencia();
                pago.FECHA_REG = DateTime.Now;
                pago.ESTADO = "NUEVO";
                pago.TIPO = "CUOTA";
                pago.IMPORTE = plan.IMPORTE_A_PAGAR;
                if (importeMora > 0)
                {
                    pago.ID_MORA = moraPlan.ID_MORA;
                    pago.IMPORTE_MORA = importeMora;
                    moraPlan.ESTADO = "CANCELADO";
                }
                Add(pago);
                plan.ID_PAGO = pago.ID_PAGO;
                plan.ESTADO = "CANCELADO";
                pres.SALDO = pres.SALDO + pago.IMPORTE;


                ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                int idKardex = Convert.ToInt32(p_RES.Value);
                SD_KARDEX_EFECTIVO kardex = new SD_KARDEX_EFECTIVO()
                {
                    ID_KARDEX = idKardex,
                    DETALLE = string.Format("PAGO PRESTAMO {0} NRO : {1} - NRO_CUOTA : {2} - NRO MOVIL : {3} , OBSERV : {4}", pres.SD_TIPOS_PRESTAMOS.NOMBRE, pres.ID_PRESTAMO, plan.NRO_SEMANA, pres.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL, pago.OBSERVACION),
                    //DETALLE = "Pago de Prestamo Nro :"+ pres.ID_PRESTAMO,
                    FECHA = (DateTime)pago.FECHA,
                    FECHA_REG = DateTime.Now,
                    ID_OPERACION = pago.ID_PAGO,
                    ID_CAJA = pago.ID_CAJA,
                    INGRESO = pago.IMPORTE + importeMora,
                    LOGIN = login,
                    OPERACION = "PAGO PRESTAMO"
                };
                context.SD_KARDEX_EFECTIVO.AddObject(kardex);
                Save();

                context.P_SD_ACT_KARDEX_EFECTIVO(pago.ID_CAJA, pago.FECHA, 0, p_RES);
                //context.P_SD_ACT_PLAN_PAGOS(pago.ID_PRESTAMO, 1, p_RES);
                result.success = true;
                result.msg = "proceso Ejectuado correctamente";
                //result.id = pago.ID_PAGO;
                result.id = pago.ID_PAGO;
            }
            catch (Exception e)
            {

                result.success = false;
                result.msg = e.Message.ToString();
            }

            return result;
        }

        public RespuestaSP EliminarPagoPrestamo(int ID_PAGO, string login)
        {
            RespuestaSP result = new RespuestaSP();
            int ID_CAJA = 0;
            DateTime? fecha = null;
            try
            {
                var context = (SindicatoContext)Context;
                var pago = BuscarTodos(x => x.ID_PAGO == ID_PAGO).FirstOrDefault();
                if (pago == null && pago.ESTADO != "NUEVO")
                {
                    result.success = false;
                    result.msg = "No existe el pago de  prestamo o esta en estado diferente a NUEVO";
                    return result;
                }
                var ultimoPago = BuscarTodos(x => x.ID_PRESTAMO == pago.ID_PRESTAMO && x.ESTADO == "NUEVO").OrderByDescending(y => y.ID_PAGO).First();
                if (ultimoPago.ID_PAGO != pago.ID_PAGO)
                {
                    result.success = false;
                    result.msg = "Debe eliminar el ultimo pago";
                    return result;
                }
                fecha = pago.FECHA;
                ID_CAJA = pago.ID_CAJA;
                pago.ESTADO = "ANULADO";
                if (pago.TIPO == "CUOTA")
                {
                    var planpagos = context.SD_PLAN_DE_PAGO.Where(x => x.ID_PLAN == pago.ID_PLAN);
                    foreach (var item in planpagos)
                    {
                        item.ESTADO = "NUEVO";
                    }
                    if (pago.SD_PRESTAMOS_MORA != null)
                    {
                        var mora = context.SD_PRESTAMOS_MORA.Where(x => x.ID_MORA == pago.ID_MORA).FirstOrDefault();
                        mora.ESTADO = "ANULADO";
                    }
                }
                else
                {
                    var planpagos = context.SD_PLAN_DE_PAGO.Where(x => x.ID_PAGO == pago.ID_PAGO);
                    foreach (var item in planpagos)
                    {
                        item.ESTADO = "NUEVO";
                        item.INTERES_A_PAGAR = item.INTERES_INICIAL;
                    }
                    if (pago.SD_PRESTAMOS_MORA != null)
                    {
                        var mora = context.SD_PRESTAMOS_MORA.Where(x => x.ID_MORA == pago.ID_MORA).FirstOrDefault();
                        mora.ESTADO = "ANULADO";
                    }
                    var prestamo = context.SD_PRESTAMOS_POR_SOCIOS.Where(x => x.ID_PRESTAMO == pago.ID_PRESTAMO).FirstOrDefault();
                    prestamo.CONDONACION_INTERES = 0;
                }

                //Delete(pago);
                var kardex = context.SD_KARDEX_EFECTIVO.Where(x => x.OPERACION == "PAGO PRESTAMO" && x.ID_OPERACION == pago.ID_PAGO && x.ID_CAJA == pago.ID_CAJA);
                foreach (var item in kardex)
                {
                    context.SD_KARDEX_EFECTIVO.DeleteObject(item);
                }

                Save();


                ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                context.P_SD_ACT_KARDEX_EFECTIVO(pago.ID_CAJA, fecha, 0, p_RES);
                result.success = true;
                result.msg = "Se Anulo Correctamente";
            }
            catch (Exception e)
            {

                result.success = false;
                result.msg = e.Message.ToString();
            }

            return result;
        }

        public RespuestaSP ActualizaPlanPagoPrestamo(int ID_PAGO, string login)
        {
            RespuestaSP result = new RespuestaSP();
            int ID_CAJA = 0;
            DateTime? fecha = null;
            try
            {
                var context = (SindicatoContext)Context;
                var pago = BuscarTodos(x => x.ID_PAGO == ID_PAGO).FirstOrDefault();

                ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                context.P_SD_ACT_PLAN_PAGOS(pago.ID_PRESTAMO, 0, p_RES);

                result.success = true;
                result.msg = "Se Anulo Correctamente";
            }
            catch (Exception e)
            {

                result.success = false;
                result.msg = e.Message.ToString();
            }

            return result;
        }
        //test

    }
}
