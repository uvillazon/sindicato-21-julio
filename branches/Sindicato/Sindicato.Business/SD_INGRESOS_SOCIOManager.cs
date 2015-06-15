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

        public string GuardarAntecedente(SD_INGRESOS_SOCIO ing, string login)
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
                    Save();
                    var context = (SindicatoContext)Context;
                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
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
