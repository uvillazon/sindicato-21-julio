
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
                var pres = context.SD_PRESTAMOS_POR_SOCIOS.Where(x => x.ID_PRESTAMO == pago.ID_PRESTAMO && x.ESTADO != "ANULADO").FirstOrDefault();
                if (pres == null)
                {
                    result.success = false;
                    result.msg = "No existe prestamo";
                    return result;
                }
                var moras = pres.SD_PRESTAMOS_MORA.Sum(x => x.IMPORTE_MORA);
                var cancelado = pres.SD_PAGO_DE_PRESTAMOS.Sum(x=>x.IMPORTE);
                if (cancelado + pago.IMPORTE > (pres.IMPORTE_INTERES + pres.IMPORTE_PRESTAMO + moras)) {
                    result.success = false;
                    result.msg = "No puedo pagar mas del total prestado + el interes + moras";
                    return result;
                }
                pago.LOGIN_USR = login;
                pago.MONEDA = pres.MONEDA;
                pago.ID_CAJA = pres.ID_CAJA;
                pago.ID_PAGO = ObtenerSecuencia();
                pago.FECHA_REG = DateTime.Now;
                pago.ESTADO = "NUEVO";
                Add(pago);
                pres.SALDO = pres.SALDO + pago.IMPORTE;
               

                ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                int idKardex = Convert.ToInt32(p_RES.Value);
                SD_KARDEX_EFECTIVO kardex = new SD_KARDEX_EFECTIVO()
                {
                    ID_KARDEX = idKardex,
                    DETALLE = string.Format("PAGO PRESTAMO {0} NRO : {1} - NRO MOVIL : {2}",pres.SD_TIPOS_PRESTAMOS.NOMBRE ,pres.ID_PRESTAMO, pres.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL),
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
                fecha = pago.FECHA;
                ID_CAJA = pago.ID_CAJA;
                pago.ESTADO = "ANULADO";
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
        //test
        
    }
}
