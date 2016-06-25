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
    public class SD_CIERRESManager : Repository<SD_CIERRES>
    {


        public SD_CIERRESManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarCierre(SD_CIERRES ant, string login)
        {
            try
            {
                string result = "";
                if (ant.ID_CIERRE == 0)
                {
                    ant.ID_CIERRE = ObtenerSecuencia();
                    ant.LOGIN = login; ;
                    ant.FECHA_REG = DateTime.Now;
                    ant.ESTADO = "ACTIVO";
                    ant.CODIGO = ant.ID_CIERRE.ToString();
                    Add(ant);
                    Save();
                    result = ant.ID_CIERRE.ToString();
                }
                else
                {

                    result = "No Existe ese Antecedente";
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
