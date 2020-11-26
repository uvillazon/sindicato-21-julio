
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
                var moras = pres.SD_PRESTAMOS_MORA.Sum(x => x.IMPORTE_MORA);
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
                pago.ID_PAGO = ObtenerSecuencia();
                pago.FECHA_REG = DateTime.Now;
                pago.TIPO = "PAGO";
                pago.ESTADO = "NUEVO";
                ID_PAGO = pago.ID_PAGO;
                Add(pago);
                if (pago.TIPO_PAGO == "PAGAR TOTAL DEUDA")
                {
                    pres.SALDO = cancelado + pago.IMPORTE + (decimal)pago.CONDONACION_INTERES;
                    if (pago.CONDONACION_INTERES > 0)
                    {
                        SD_PAGO_DE_PRESTAMOS condonacion_pago = new SD_PAGO_DE_PRESTAMOS();
                        condonacion_pago.LOGIN_USR = login;
                        condonacion_pago.MONEDA = pres.MONEDA;
                        condonacion_pago.ID_PRESTAMO = pago.ID_PRESTAMO;
                        condonacion_pago.ID_CAJA = pres.ID_CAJA;
                        condonacion_pago.ID_PAGO = ObtenerSecuencia();
                        condonacion_pago.IMPORTE = (decimal)pago.CONDONACION_INTERES;
                        condonacion_pago.FECHA_REG = DateTime.Now;
                        condonacion_pago.FECHA = pago.FECHA;
                        condonacion_pago.OBSERVACION = "CONDONACION DE INTERES POR PAGO ADELANTADO DEL TOTAL";
                        condonacion_pago.ESTADO = "NUEVO";
                        condonacion_pago.TIPO = "CONDONACION";
                        condonacion_pago.ID_PAGO_REF = pago.ID_PAGO;
                        Add(condonacion_pago);
                    }
                }
                else if (pago.TIPO_PAGO == "EXTENDER PRESTAMO")
                {
                    if (cancelado > 0)
                    {
                        result.success = false;
                        result.msg = "no debe existir ningun monto cancelado ";
                        return result;
                    }
                    else
                    {
                        pres.SALDO = pres.IMPORTE_PRESTAMO + pago.IMPORTE;
                        SD_PRESTAMOS_POR_SOCIOS prestamo = new SD_PRESTAMOS_POR_SOCIOS();
                        ObjectParameter p_Resp = new ObjectParameter("p_res", typeof(Int32));
                        context.P_EE_SECUENCIA("SD_PRESTAMOS_POR_SOCIOS", 0, p_Resp);
                        prestamo.ID_PRESTAMO = Convert.ToInt32(p_Resp.Value);
                        prestamo.ID_CAJA = pres.ID_CAJA;
                        prestamo.ID_PRESTAMO_REF = pres.ID_PRESTAMO;
                        prestamo.ID_SOCIO_MOVIL = pres.ID_SOCIO_MOVIL;
                        prestamo.ID_TIPO_PRESTAMO = pres.ID_TIPO_PRESTAMO;
                        prestamo.IMPORTE_INTERES = pres.IMPORTE_INTERES;
                        prestamo.IMPORTE_PRESTAMO = pres.IMPORTE_PRESTAMO;
                        prestamo.INTERES = pres.INTERES;
                        prestamo.SEMANAS = pres.SEMANAS;
                        prestamo.TIPO_INTERES = pres.TIPO_INTERES;
                        prestamo.LOGIN_USR = login;
                        prestamo.MONEDA = pres.MONEDA;
                        prestamo.OBSERVACION = string.Format("PRESTAMO EXTENDIDO DEL NRO PRESTAMO : {0} , con la cancelacion del importe total : {1} que corresponde a los interes", pres.ID_PRESTAMO, pago.IMPORTE);
                        prestamo.FECHA_REG = DateTime.Now;
                        prestamo.ESTADO = "NUEVO";
                        prestamo.ESTADO_CIERRE = "NUEVO";
                        prestamo.FECHA = pago.FECHA;
                        context.SD_PRESTAMOS_POR_SOCIOS.AddObject(prestamo);
                        pago.ID_PRESTAMO_REF = prestamo.ID_PRESTAMO;

                        
                        SD_PAGO_DE_PRESTAMOS condonacion_pago = new SD_PAGO_DE_PRESTAMOS();
                        condonacion_pago.LOGIN_USR = login;
                        condonacion_pago.MONEDA = pres.MONEDA;
                        condonacion_pago.ID_PRESTAMO = pago.ID_PRESTAMO;
                        condonacion_pago.ID_CAJA = pres.ID_CAJA;
                        condonacion_pago.ID_PAGO = ObtenerSecuencia();
                        condonacion_pago.IMPORTE = (decimal)pres.IMPORTE_PRESTAMO;
                        condonacion_pago.FECHA_REG = DateTime.Now;
                        condonacion_pago.FECHA = pago.FECHA;
                        condonacion_pago.OBSERVACION = string.Format("IMPORTE TRASLADADO A UN NUEVO PRESTAMO NRO:{0}",prestamo.ID_PRESTAMO);
                        condonacion_pago.ESTADO = "NUEVO";
                        condonacion_pago.TIPO = "CONDONACION";
                        condonacion_pago.ID_PAGO_REF = pago.ID_PAGO;
                        Add(condonacion_pago);

                    }

                }
                else
                {

                    pres.SALDO = cancelado + pago.IMPORTE;
                }



                ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                int idKardex = Convert.ToInt32(p_RES.Value);
                SD_KARDEX_EFECTIVO kardex = new SD_KARDEX_EFECTIVO()
                {
                    ID_KARDEX = idKardex,
                    DETALLE = string.Format("PAGO PRESTAMO {0} NRO : {1} - NRO MOVIL : {2}", pres.SD_TIPOS_PRESTAMOS.NOMBRE, pres.ID_PRESTAMO, pres.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL),
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
                context.P_SD_ACT_PLAN_PAGOS(pago.ID_PRESTAMO, 1, p_RES);
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
                if (pago == null && pago.ESTADO != "NUEVO" && pago.TIPO == "PAGO")
                {
                    result.success = false;
                    result.msg = "No existe el pago de  prestamo o esta en estado diferente a NUEVO";
                    return result;
                }
                fecha = pago.FECHA;
                ID_CAJA = pago.ID_CAJA;
                pago.ESTADO = "ANULADO";
                var pagoRef = BuscarTodos(x => x.ID_PAGO_REF == ID_PAGO).FirstOrDefault();
                if (pagoRef != null)
                {
                    pagoRef.ESTADO = "ANULADO";
                }
                var planpagos = context.SD_PLAN_DE_PAGO.Where(x => x.ID_PRESTAMO == pago.ID_PRESTAMO);
                foreach (var item in planpagos)
                {
                    item.ESTADO = "NUEVO";
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
