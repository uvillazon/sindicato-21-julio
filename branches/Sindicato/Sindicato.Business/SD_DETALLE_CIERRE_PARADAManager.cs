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
    public class SD_DETALLE_CIERRE_PARADAManager : Repository<SD_DETALLE_CIERRE_PARADA>
    {


        public SD_DETALLE_CIERRE_PARADAManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarDetalleCierreParada(SD_DETALLE_CIERRE_PARADA ing, string login)
        {
            try
            {
                string result = "";
                if (ing.ID_DETALLE == 0)
                {

                    ing.ID_DETALLE = ObtenerSecuencia();
                    Add(ing);
                    Save();
                    result = ing.ID_DETALLE.ToString();
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
