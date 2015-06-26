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
    public class SD_DETALLE_PERIODO_SOCIOManager : Repository<SD_DETALLE_PERIODO_SOCIO>
    {


        public SD_DETALLE_PERIODO_SOCIOManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarDetallePeriodoSocio(SD_DETALLE_PERIODO_SOCIO ing, string login)
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
