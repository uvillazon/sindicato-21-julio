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
    public class SD_CIERRES_PARADAManager : Repository<SD_CIERRES_PARADA>
    {


        public SD_CIERRES_PARADAManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarCierreParada(SD_CIERRES_PARADA ing, string login)
        {
            try
            {
                string result = "";
                if (ing.ID_CIERRE == 0)
                {

                    ing.ID_CIERRE = ObtenerSecuencia();
                    Add(ing);
                    Save();
                    result = ing.ID_CIERRE.ToString();
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
