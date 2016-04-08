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
    public class SD_IMPRESIONESManager : Repository<SD_IMPRESIONES>
    {


        public SD_IMPRESIONESManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarImpresion(SD_IMPRESIONES ing, string login)
        {
            string result = "";
            try
            {
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                var context = (SindicatoContext)Context;
                context.P_SD_GRABAR_IMPRESION(ing.NRO_INICIO, ing.NRO_FIN, ing.OBSERVACION, login, p_res);
                result = p_res.Value.ToString();
            }
            catch (Exception e)
            {
                return e.ToString();
                //throw;
            }
            return result;
        }

    }
}
