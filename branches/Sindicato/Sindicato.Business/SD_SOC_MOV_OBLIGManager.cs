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
    public class SD_SOC_MOV_OBLIGManager : Repository<SD_SOC_MOV_OBLIG>
    {


        public SD_SOC_MOV_OBLIGManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarObligacionPorSocio(SD_SOC_MOV_OBLIG obl, string login)
        {
            try
            {
                string result = "";
                var obli = BuscarTodos(x => x.ID_OBLIGACION == obl.ID_OBLIGACION && x.ID_SOCIO_MOVIL == obl.ID_SOCIO_MOVIL);
                if (obli.Count() > 0)
                {
                    result = "Existe ya la obligacion asociado al movil";
                }
                else
                {
                    obl.ID_SOC_MOV_OBLIG = ObtenerSecuencia();
                    obl.LOGIN = login;
                    obl.FECHA_REG = DateTime.Now;
                    result = obl.ID_OBLIGACION.ToString();
                    Add(obl);
                }



                return result;

            }
            catch (Exception e)
            {
                return e.ToString();
                //throw;
            }
        }
        public string EditarObligacionPorSocio(SD_SOC_MOV_OBLIG obl, string login)
        {
            try
            {
                string result = "";
                var obli = BuscarTodos(x => x.ID_OBLIGACION == obl.ID_OBLIGACION && x.ID_SOCIO_MOVIL == obl.ID_SOCIO_MOVIL).FirstOrDefault();
                if (obli == null)
                {
                    result = "No Existe la obligacion seleccione otro";
                }
                else
                {
                    obli.IMPORTE = obl.IMPORTE;
                    result = obli.ID_SOC_MOV_OBLIG.ToString();
                    Save();
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
