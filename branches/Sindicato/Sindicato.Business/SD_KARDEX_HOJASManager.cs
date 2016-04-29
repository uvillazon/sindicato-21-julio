
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
    public class SD_KARDEX_HOJASManager : Repository<SD_KARDEX_HOJAS>
    {


        public SD_KARDEX_HOJASManager(IUnitOfWork uow) : base(uow) { }

        public string ActualizarKardex(int ID_SOCIO_MOVIL, DateTime FECHA, string login)
        {
            try
            {
                string result = "";
                var context = (SindicatoContext)Context;
                ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                context.P_SD_ACT_KARDEX_HOJA(ID_SOCIO_MOVIL, FECHA, login, p_RES);
                result = p_RES.Value.ToString();
                return result;

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
    }
}
