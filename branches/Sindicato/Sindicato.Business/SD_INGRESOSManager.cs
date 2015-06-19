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
    public class SD_INGRESOSManager : Repository<SD_INGRESOS>
    {


        public SD_INGRESOSManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarIngreso(SD_INGRESOS ing, string login)
        {
            try
            {
                string result = "";
                if (ing.ID_INGRESO == 0)
                {
                    ing.FECHA_REG = DateTime.Now;
                    ing.LOGIN = login;
                    ing.ID_INGRESO = ObtenerSecuencia();
                    Add(ing);
                    var context = (SindicatoContext)Context;
                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                    context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                    int idKardex = Convert.ToInt32(p_RES.Value);
                    SD_KARDEX_EFECTIVO kardex = new SD_KARDEX_EFECTIVO()
                    {
                        ID_KARDEX = idKardex,
                        DETALLE = ing.CONCEPTO,
                        FECHA = (DateTime)ing.FECHA,
                        FECHA_REG = DateTime.Now,
                        ID_OPERACION = ing.ID_INGRESO,
                        ID_CAJA = ing.ID_CAJA,
                        INGRESO = ing.IMPORTE,
                        LOGIN = ing.LOGIN,
                        OPERACION = "INGRESOS"
                    };
                    context.SD_KARDEX_EFECTIVO.AddObject(kardex);
                    Save();

                    context.P_SD_ACT_KARDEX_EFECTIVO(ing.ID_CAJA, ing.FECHA, 0, p_RES);
                    result = ing.ID_INGRESO.ToString();
                }
                else
                {
                    result = "No se puede Editar un ingrese. Es necesario Eliminar el Ingreso Primero";
                }
                return result;

            }
            catch (Exception e)
            {
                return e.ToString();
                //throw;
            }
        }
    }
}
