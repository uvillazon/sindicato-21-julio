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
    public class SD_INGRESOS_SOCIOManager : Repository<SD_INGRESOS_SOCIO>
    {


        public SD_INGRESOS_SOCIOManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarIngreso(SD_INGRESOS_SOCIO ing, string login)
        {
            try
            {
                string result = "";
                if (ing.ID_INGRESO == 0)
                {
                    ing.FECHA_REG = DateTime.Now;
                    ing.LOGIN = login;
                    ing.ID_INGRESO = ObtenerSecuencia();
                    ing.ESTADO = "ACTIVO";
                    Add(ing);
                    var context = (SindicatoContext)Context;
                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                    context.P_EE_SECUENCIA("SD_KARDEX_SOCIO", 0, p_RES);
                    int idKardex = Convert.ToInt32(p_RES.Value);
                    SD_KARDEX_SOCIO kardex = new SD_KARDEX_SOCIO()
                    {
                        ID_KARDEX = idKardex,
                        DETALLE = ing.OBSERVACION,
                        FECHA = (DateTime)ing.FECHA,
                        FECHA_REG = DateTime.Now,
                        ID_OPERACION = ing.ID_INGRESO,
                        ID_SOCIO = ing.ID_SOCIO,
                        INGRESO = ing.INGRESO,
                        LOGIN = ing.LOGIN,
                        OPERACION = "INGRESOS"
                    };
                    context.SD_KARDEX_SOCIO.AddObject(kardex);
                    Save();

                    context.P_SD_ACT_KARDEX_SOCIO(ing.ID_SOCIO, ing.FECHA, login, p_RES);
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
