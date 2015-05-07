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
    public class SD_MOVILESManager : Repository<SD_MOVILES>
    {


        public SD_MOVILESManager(IUnitOfWork uow) : base(uow) { }

        //test
        public string GuardarMovil(SD_MOVILES movil, int ID_USR) {
            try
            {
                string result = "";
                var verificar = BuscarTodos(x => x.NRO_MOVIL == movil.NRO_MOVIL);
                if (verificar.Count() > 0)
                {
                    result = string.Format("Existe el numero de movil {0} ya asociado a otro Socio", movil.NRO_MOVIL);
                }
                else {
                    movil.ID_MOVIL = ObtenerSecuencia();
                    movil.ESTADO = "ACTIVO";
                    movil.FECHA_REG = DateTime.Now;
                    movil.ID_USR = ID_USR;
                    Add(movil);
                    Save();
                    result = movil.ID_MOVIL.ToString();
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
