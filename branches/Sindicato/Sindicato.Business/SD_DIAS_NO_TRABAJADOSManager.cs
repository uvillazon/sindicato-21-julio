
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
    public class SD_DIAS_NO_TRABAJADOSManager : Repository<SD_DIAS_NO_TRABAJADOS>
    {


        public SD_DIAS_NO_TRABAJADOSManager(IUnitOfWork uow) : base(uow) { }


        public string GuardarCancelacion(SD_DIAS_NO_TRABAJADOS ing, string login)
        {
            try
            {
                string result = "";
                var detalle = BuscarTodos(x => x.ID_DETALLE == ing.ID_DETALLE).FirstOrDefault();

                if (detalle != null)
                {
                    var context = (SindicatoContext)Context;
                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                    context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                    int idKardexIngreso = Convert.ToInt32(p_RES.Value);
                    SD_KARDEX_EFECTIVO kardexIngreso = new SD_KARDEX_EFECTIVO()
                    {
                        ID_KARDEX = idKardexIngreso,
                        DETALLE = "CANCELACION POR DIA NO TRABAJADO EN FECHA : " + detalle.FECHA_NO_TRABAJADO.ToString("dd/mm/yyy") + " MOVIL : " + detalle.SD_SOCIO_MOVILES.NRO_MOVIL,
                        FECHA = DateTime.Now,
                        FECHA_REG = DateTime.Now,
                        ID_OPERACION = ing.ID_DETALLE,
                        ID_CAJA = (int)ing.ID_CAJA,
                        INGRESO = ing.IMPORTE,
                        LOGIN = login,
                        OPERACION = "CANCELACION_DIA_NO_TRABAJADO"
                    };
                    context.SD_KARDEX_EFECTIVO.AddObject(kardexIngreso);
                    Save();

                    context.P_SD_ACT_KARDEX_EFECTIVO(ing.ID_CAJA, DateTime.Now, 0, p_RES);
                    detalle.IMPORTE_CANCELADO = detalle.IMPORTE;
                    detalle.ESTADO = "CANCELADO";
                    result = ing.ID_DETALLE.ToString();
                }
                else
                {
                    result = "No Existe deuda favor volver a recargar el sistema.";
                }
                return result;

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        //test

    }
}
