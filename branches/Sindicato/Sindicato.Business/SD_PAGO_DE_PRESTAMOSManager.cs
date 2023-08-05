
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

        //

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
                var moras = pres.SD_PRESTAMOS_MORA.Where(x => x.ESTADO != "ANULADO").Sum(x => x.IMPORTE_MORA);
                var cancelado = pres.SD_PAGO_DE_PRESTAMOS.Where(x => x.ESTADO != "ANULADO").Sum(x => x.IMPORTE + x.IMPORTE_MORA);
                if (cancelado + pago.IMPORTE > (pres.IMPORTE_INTERES + pres.IMPORTE_PRESTAMO + moras))
                {
                    result.success = false;
                    result.msg = "No puedo pagar mas del total prestado + el interes + moras";
                    return result;
                }

                var res1 = context.SD_PLAN_DE_PAGO.Where(x => x.ID_PRESTAMO == pago.ID_PRESTAMO && x.ESTADO == "NUEVO").OrderBy(y => y.NRO_SEMANA);
                if (res1.Count() == 0)
                {
                    result.success = false;
                    result.msg = "No tiene Cuota Pendiente";
                    return result;
                }
                DateTime fechaActual = DateTime.Now.Date.AddDays(7);
                decimal total = 0;
                decimal condonacion = 0;
                decimal total_mora = 0;
                decimal idmora = 0;
                pago.ID_PAGO = ObtenerSecuencia();

                foreach (var item in res1)
                {
                    item.ID_PAGO = pago.ID_PAGO;
                    item.ESTADO = "CANCELADO";
                    if (item.SD_PRESTAMOS_MORA.Where(x => x.ESTADO == "NUEVO").Count() > 0)
                    {
                        total_mora = total_mora + item.SD_PRESTAMOS_MORA.Where(x => x.ESTADO == "NUEVO").Sum(x => x.IMPORTE_MORA);
                        var mora = item.SD_PRESTAMOS_MORA.Where(x => x.ESTADO == "NUEVO").FirstOrDefault();
                        idmora = mora.ID_MORA;
                        mora.ESTADO = "CANCELADO";


                    }

                    if (item.FECHA_PAGO < fechaActual)
                    {
                        total = total + (item.IMPORTE_A_PAGAR + item.INTERES_A_PAGAR);

                    }
                    else
                    {
                        total = total + item.IMPORTE_A_PAGAR;
                        condonacion = condonacion + item.INTERES_A_PAGAR;
                        item.CONDONACION = item.INTERES_A_PAGAR;
                    }
                }





                pago.LOGIN_USR = login;
                pago.MONEDA = pres.MONEDA;
                pago.ID_CAJA = pres.ID_CAJA;
                pago.FECHA_REG = DateTime.Now;
                pago.ESTADO = "NUEVO";
                pago.TIPO = "TOTAL";
                pago.TOTAL_CONDONACION = pago.TOTAL_CONDONACION;
                pago.IMPORTE = total;
                pago.IMPORTE_MORA = total_mora;
                pago.ID_MORA = total_mora > 0 ? (int?)idmora : null;
                pago.ID_GESTION = ObtenerGestion();
                Add(pago);
                pres.SALDO = pres.SALDO + pago.IMPORTE;
                pres.CONDONACION_INTERES = pago.TOTAL_CONDONACION;

                ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                int idKardex = Convert.ToInt32(p_RES.Value);
                SD_KARDEX_EFECTIVO kardex = new SD_KARDEX_EFECTIVO()
                {
                    ID_KARDEX = idKardex,
                    DETALLE = string.Format("PAGO TOTAL DEL PRESTAMO {0} NRO : {1} - NRO MOVIL : {2}", pres.SD_TIPOS_PRESTAMOS.NOMBRE, pres.NUMERO, pres.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL),
                    //DETALLE = "Pago de Prestamo Nro :"+ pres.ID_PRESTAMO,
                    FECHA = (DateTime)pago.FECHA,
                    FECHA_REG = DateTime.Now,
                    ID_OPERACION = pago.ID_PAGO,
                    ID_CAJA = pago.ID_CAJA,
                    INGRESO = pago.IMPORTE + pago.IMPORTE_MORA,
                    LOGIN = login,
                    OPERACION = "PAGO PRESTAMO"
                };
                context.SD_KARDEX_EFECTIVO.AddObject(kardex);
                Save();

                context.P_SD_ACT_KARDEX_EFECTIVO(pago.ID_CAJA, pago.FECHA, 0, p_RES);
                context.P_SD_ACT_PLAN_PAGOS(pago.ID_PRESTAMO, 1, p_RES);
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
        /**
         * verificamos el importe del prestamo que no sobrepase
         **/
        public RespuestaSP VerificarImporte(int ID_PRESTAMO, decimal CUOTA)
        {
            RespuestaSP result = new RespuestaSP();
            var context = (SindicatoContext)Context;

            return result;
        }

        public RespuestaSP GuardarPagoPrestamo(SD_PAGO_DE_PRESTAMOS pago, string login)
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

                if (pago.IMPORTE > (plan.IMPORTE_A_PAGAR + plan.INTERES_A_PAGAR + importeMora))
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
                pago.ID_GESTION = ObtenerGestion();
                pago.FECHA_REG = DateTime.Now;
                pago.ESTADO = "NUEVO";
                pago.TIPO = "CUOTA";
                pago.IMPORTE = plan.INTERES_A_PAGAR + plan.IMPORTE_A_PAGAR;
                if (importeMora > 0)
                {
                    pago.ID_MORA = moraPlan.ID_MORA;
                    pago.IMPORTE_MORA = importeMora;
                    moraPlan.ESTADO = "CANCELADO";
                }
                Add(pago);
                pres.SALDO = pres.SALDO + pago.IMPORTE;

                ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                int idKardex = Convert.ToInt32(p_RES.Value);
                SD_KARDEX_EFECTIVO kardex = new SD_KARDEX_EFECTIVO()
                {
                    ID_KARDEX = idKardex,
                    DETALLE = string.Format("PAGO PRESTAMO {0} NRO : {1} - NRO_SEMANA : {2} - NRO MOVIL : {3} , OBSERV : {4}", pres.SD_TIPOS_PRESTAMOS.NOMBRE, pres.NUMERO, plan.NRO_SEMANA, pres.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL, pago.OBSERVACION),
                    //DETALLE = "Pago de Prestamo Nro :"+ pres.ID_PRESTAMO,
                    FECHA = (DateTime)pago.FECHA,
                    FECHA_REG = DateTime.Now,
                    ID_OPERACION = pago.ID_PAGO,
                    ID_CAJA = pago.ID_CAJA,
                    INGRESO = plan.IMPORTE_A_PAGAR + plan.INTERES_A_PAGAR + importeMora,
                    LOGIN = login,
                    OPERACION = "PAGO PRESTAMO"
                };
                context.SD_KARDEX_EFECTIVO.AddObject(kardex);


                Save();

                context.P_SD_ACT_KARDEX_EFECTIVO(pago.ID_CAJA, pago.FECHA, 0, p_RES);
                context.P_SD_ACT_PLAN_PAGOS(pago.ID_PRESTAMO, 1, p_RES);
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
                        item.CONDONACION = 0;
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
                throw new InvalidOperationException(e.Message);
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
