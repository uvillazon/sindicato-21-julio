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
    public class SD_DETALLE_HOJASManager : Repository<SD_DETALLE_HOJAS>
    {


        public SD_DETALLE_HOJASManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarDetalleVenta(SD_DETALLE_HOJAS ant, string login)
        {
            try
            {
                string result = "";
                if (ant.ID_DETALLE == 0)
                {
                    ant.ID_DETALLE = ObtenerSecuencia();
                    ant.LOGIN = login;
                    ant.FECHA_REG = DateTime.Now;
                    Add(ant);
                    Save();
                    result = ant.ID_DETALLE.ToString();
                }
                else
                {

                    result = "No puede Editar";
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
