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
    public class SD_VENTA_HOJASManager : Repository<SD_VENTA_HOJAS>
    {


        public SD_VENTA_HOJASManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarVenta(SD_VENTA_HOJAS ant, string login)
        {
            try
            {
                string result = "";
                if (ant.ID_VENTA == 0)
                {
                    ant.ID_VENTA = ObtenerSecuencia();
                    ant.LOGIN = login;
                    ant.FECHA_REG = DateTime.Now;
                    ant.ESTADO = "NUEVO";
                    Add(ant);
                    Save();
                    var context = (SindicatoContext)Context;
                    int ID_CAJA = context.SD_PARADAS.Where(x => x.ID_PARADA == ant.ID_PARADA).FirstOrDefault().ID_CAJA;
                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                    context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                    int idKardex = Convert.ToInt32(p_RES.Value);
                    SD_KARDEX_EFECTIVO kardex = new SD_KARDEX_EFECTIVO()
                    {
                        ID_KARDEX = idKardex,
                        DETALLE = string.Format("VENTA DE HOJA NRO : {0}", ant.ID_VENTA),
                        FECHA = (DateTime)ant.FECHA_VENTA,
                        FECHA_REG = DateTime.Now,
                        ID_OPERACION = ant.ID_VENTA,
                        ID_CAJA = ID_CAJA,
                        INGRESO = (decimal)ant.TOTAL,
                        LOGIN = login,
                        OPERACION = "VENTAS"
                    };
                    context.SD_KARDEX_EFECTIVO.AddObject(kardex);
                    Save();

                    context.P_SD_ACT_KARDEX_EFECTIVO(ID_CAJA, ant.FECHA_VENTA, 0, p_RES);
                    result = ant.ID_VENTA.ToString();
                    return result;
                }
                else
                {

                    result = "No Puedo Modificar la Venta Solo puede Anular";

                }
                return result;
            }
            catch (Exception e)
            {
                return e.ToString();
                //throw;
            }
        }
        public string AnularVenta(int ID_VENTA)
        {
            try
            {
                string result = "";
                var venta = BuscarTodos(x => x.ID_VENTA == ID_VENTA).FirstOrDefault();
                if (venta != null)
                {
                    if (venta.ESTADO == "NUEVO")
                    {
                        var context = (SindicatoContext)Context;
                        var kardex = context.SD_KARDEX_EFECTIVO.Where(x => x.ID_OPERACION == ID_VENTA && x.ID_CAJA == venta.SD_PARADAS.ID_CAJA && x.OPERACION == "VENTAS");
                        foreach (var item in kardex)
                        {
                            context.SD_KARDEX_EFECTIVO.DeleteObject(item);
                        }
                        venta.ESTADO = "ANULADO";
                        Save();
                        ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));

                        context.P_SD_ACT_KARDEX_EFECTIVO(venta.SD_PARADAS.ID_CAJA, venta.FECHA_VENTA, 0, p_RES);
                        result = venta.ID_VENTA.ToString();


                    }
                    else
                    {
                        result = string.Format("No puede Anular la Venta el estado permito para anular es NUEVO. Estado Actual : {0}", venta.ESTADO);
                    }

                }
                else
                {
                    result = "No existe la venta";
                }
                return result;

            }
            catch (Exception e)
            {

                return e.ToString();
            }
        }

    }
}
