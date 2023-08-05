
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
    public class SD_PRESTAMOS_POR_SOCIOSManager : Repository<SD_PRESTAMOS_POR_SOCIOS>
    {


        public SD_PRESTAMOS_POR_SOCIOSManager(IUnitOfWork uow) : base(uow) { }

        //test


        public RespuestaSP GuardarPrestamo(SD_PRESTAMOS_POR_SOCIOS prestamo, string login)
        {
            RespuestaSP result = new RespuestaSP();
            try
            {
                var context = (SindicatoContext)Context;


                var tipo = context.SD_TIPOS_PRESTAMOS.FirstOrDefault(x => x.ID_TIPO == prestamo.ID_TIPO_PRESTAMO);
                if (tipo == null)
                {
                    result.success = false;
                    result.msg = "No existe el tipo";
                    return result;
                }
                var saldo = context.SD_CAJAS.Where(x => x.ID_CAJA == tipo.ID_CAJA).FirstOrDefault().SALDO;
                if (prestamo.IMPORTE_PRESTAMO > saldo)
                {
                    result.success = false;
                    result.msg = string.Format("No puede Prestar mas que su saldo. Saldo Disponible : {0}", saldo);
                    return result;
                }
                prestamo.ID_CAJA = tipo.ID_CAJA;
                prestamo.ID_PRESTAMO = ObtenerSecuencia();
                prestamo.ID_GESTION = ObtenerGestion();
                prestamo.NUMERO = ObtenerNumeroPorGestion("NUMERO");
                prestamo.ESTADO = "NUEVO";
                prestamo.INTERES = tipo.TIPO_INTERES == "INTERES" ? (decimal)tipo.INTERES : (decimal)tipo.INTERES_FIJO;
                var importe_interes = tipo.TIPO_INTERES == "INTERES" ? prestamo.IMPORTE_PRESTAMO * tipo.INTERES / 100 : tipo.INTERES_FIJO;
                prestamo.IMPORTE_INTERES = importe_interes;
                prestamo.FECHA_REG = DateTime.Now;
                prestamo.ESTADO_CIERRE = "NUEVO";


                prestamo.LOGIN_USR = login;

                context.AddToSD_PRESTAMOS_POR_SOCIOS(prestamo);
                ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                int idKardex = Convert.ToInt32(p_RES.Value);
                SD_KARDEX_EFECTIVO kardex = new SD_KARDEX_EFECTIVO()
                {
                    ID_KARDEX = idKardex,
                    DETALLE = string.Format("PRESTAMO {0} # {1}- SOCIO NRO MOVIL : {2}", prestamo.SD_TIPOS_PRESTAMOS.NOMBRE, prestamo.NUMERO, prestamo.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL),
                    FECHA = (DateTime)prestamo.FECHA,
                    FECHA_REG = DateTime.Now,
                    ID_OPERACION = prestamo.ID_PRESTAMO,
                    ID_CAJA = prestamo.ID_CAJA,
                    EGRESO = prestamo.IMPORTE_PRESTAMO,
                    LOGIN = prestamo.LOGIN_USR,
                    OPERACION = "PRESTAMOS"
                };
                context.SD_KARDEX_EFECTIVO.AddObject(kardex);
                Save();

                context.P_SD_ACT_KARDEX_EFECTIVO(prestamo.ID_CAJA, prestamo.FECHA, 0, p_RES);
                result.id = prestamo.ID_PRESTAMO;

                Save();
                result.success = true;
                result.msg = "proceso Ejectuado correctamente";
            }
            catch (Exception e)
            {

                throw new InvalidOperationException(e.Message);

            }

            return result;
        }
        public RespuestaSP EliminarPrestamo(int ID_PRESTAMO)
        {
            RespuestaSP result = new RespuestaSP();
            try
            {
                var pres = BuscarTodos(x => x.ID_PRESTAMO == ID_PRESTAMO && x.ESTADO_CIERRE == "NUEVO").FirstOrDefault();
                if (pres == null)
                {
                    result.success = false;
                    result.msg = "No existe prestamo o esta en estado Diferente a NUEVO";
                    return result;
                }
                if (pres.SD_PAGO_DE_PRESTAMOS.Where(x => x.ESTADO != "ANULADO").Count() > 0)
                {
                    result.success = false;
                    result.msg = "Existe Pagos del Socio Eliminar primero los  pagos para eliminar el prestamo";
                    return result;
                }
                var context = (SindicatoContext)Context;
                if (pres.SD_PLAN_DE_PAGO.Count() > 0)
                {
                    var detalles = context.SD_PLAN_DE_PAGO.Where(x => x.ID_PRESTAMO == ID_PRESTAMO);
                    foreach (var item in detalles)
                    {
                        item.ESTADO = "ANULADO";
                        //Delete(item);
                        //Save();
                    }
                }
                pres.ESTADO = "ANULADO";
                //Delete(pres);
                var kardex = context.SD_KARDEX_EFECTIVO.Where(x => x.OPERACION == "PRESTAMOS" && x.ID_OPERACION == ID_PRESTAMO && x.ID_CAJA == pres.ID_CAJA);
                foreach (var item in kardex)
                {
                    context.SD_KARDEX_EFECTIVO.DeleteObject(item);
                }
                Save();
                ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                context.P_SD_ACT_KARDEX_EFECTIVO(pres.ID_CAJA, pres.FECHA, 0, p_RES);
                result.success = true;
                result.msg = "proceso Ejectuado correctamente";

            }
            catch (Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }

            return result;
        }

    }
}
