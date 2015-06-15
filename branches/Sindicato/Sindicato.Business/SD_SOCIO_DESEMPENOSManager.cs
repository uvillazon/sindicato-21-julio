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
    public class SD_SOCIO_DESEMPENOSManager : Repository<SD_SOCIO_DESEMPENOS>
    {


        public SD_SOCIO_DESEMPENOSManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarDesempeno(SD_SOCIO_DESEMPENOS ant, string login)
        {
            try
            {
                string result = "";
                if (ant.ID_DESEMPENO == 0)
                {
                    ant.ID_DESEMPENO = ObtenerSecuencia();
                    ant.LOGIN = login; ;
                    ant.FECHA_REG = DateTime.Now;
                    Add(ant);
                    Save();
                    result = ant.ID_DESEMPENO.ToString();
                    return result;
                }
                else
                {
                    var antActual = BuscarTodos(x => x.ID_DESEMPENO == ant.ID_DESEMPENO).FirstOrDefault();
                    if (antActual != null)
                    {
                        antActual.CARGO = ant.CARGO;
                        antActual.OBSERVACION = ant.OBSERVACION;
                        antActual.FECHA_DESDE = ant.FECHA_DESDE;
                        antActual.FECHA_HASTA = ant.FECHA_HASTA;
                        Save();
                        result = antActual.ID_DESEMPENO.ToString();
                    }
                    else
                    {
                        result = "No Existe ese Antecedente";
                    }
                    return result;
                }

            }
            catch (Exception e)
            {
                return e.ToString();
                //throw;
            }
        }

    }
}
