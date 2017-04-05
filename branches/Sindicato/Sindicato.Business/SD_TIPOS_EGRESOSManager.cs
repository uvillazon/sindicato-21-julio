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
    public class SD_TIPOS_EGRESOSManager : Repository<SD_TIPOS_EGRESOS>
    {


        public SD_TIPOS_EGRESOSManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarTipoEgreso(SD_TIPOS_EGRESOS tipo, string login)
        {
            try
            {
                string result = "";
                var context = (SindicatoContext)Context;
                ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                context.P_SD_GUARDAR_TIPO_EGRESO(tipo.ID_TIPO,tipo.ID_CAJA,tipo.NOMBRE,tipo.OBSERVACION,tipo.MONEDA,tipo.IMPORTE, login, p_RES);
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
