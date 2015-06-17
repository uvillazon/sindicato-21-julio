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
    public class SD_RETIRO_SOCIOManager : Repository<SD_RETIRO_SOCIO>
    {


        public SD_RETIRO_SOCIOManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarRetiro(SD_RETIRO_SOCIO ing, string login)
        {
            try
            {
                string result = "";
                if (ing.ID_RETIRO == 0)
                {
                    var context = (SindicatoContext)Context;
                    var saldo = context.SD_SOCIOS.Where(x => x.ID_SOCIO == ing.ID_SOCIO).FirstOrDefault().SALDO;
                    if (ing.RETIRO > saldo)
                    {
                        result = string.Format("No puede Retirar mas que su saldo. Saldo Disponible : {0}", saldo);
                    }
                    else
                    {
                        ing.FECHA_REG = DateTime.Now;
                        ing.LOGIN = login;
                        ing.ID_RETIRO = ObtenerSecuencia();
                        ing.ESTADO = "ACTIVO";
                        Add(ing);

                        ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                        context.P_EE_SECUENCIA("SD_KARDEX_SOCIO", 0, p_RES);
                        int idKardex = Convert.ToInt32(p_RES.Value);
                        SD_KARDEX_SOCIO kardex = new SD_KARDEX_SOCIO()
                        {
                            ID_KARDEX = idKardex,
                            DETALLE = ing.OBSERVACION,
                            FECHA = (DateTime)ing.FECHA,
                            FECHA_REG = DateTime.Now,
                            ID_OPERACION = ing.ID_RETIRO,
                            ID_SOCIO = ing.ID_SOCIO,
                            EGRESO = ing.RETIRO,
                            LOGIN = ing.LOGIN,
                            OPERACION = "RETIROS"
                        };
                        context.SD_KARDEX_SOCIO.AddObject(kardex);
                        Save();

                        context.P_SD_ACT_KARDEX_SOCIO(ing.ID_SOCIO, ing.FECHA, login, p_RES);
                        result = ing.ID_RETIRO.ToString();
                    }
                }
                else
                {
                    result = "No se puede Editar un Retiro. Es necesario Eliminar el Retiro Primero";
                }
                return result;

            }
            catch (Exception e)
            {
                return e.ToString();
                //throw;
            }
        }

        //test

    }
}
