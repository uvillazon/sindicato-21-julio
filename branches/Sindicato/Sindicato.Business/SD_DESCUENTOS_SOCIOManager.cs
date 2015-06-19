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
    public class SD_DESCUENTOS_SOCIOManager : Repository<SD_DESCUENTOS_SOCIO>
    {


        public SD_DESCUENTOS_SOCIOManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarDetalle(SD_DESCUENTOS_SOCIO ant, string login)
        {
            try
            {
                string result = "";
                if (ant.ID_DESCUENTO_SOCIO == 0)
                {
                    ant.ID_DESCUENTO_SOCIO = ObtenerSecuencia();
                    ant.LOGIN = login; ;

                    Add(ant);
                    Save();
                    result = ant.ID_DESCUENTO_SOCIO.ToString();
                    return result;
                }
                else
                {
                    var antActual = BuscarTodos(x => x.ID_DESCUENTO_SOCIO == ant.ID_DESCUENTO_SOCIO).FirstOrDefault();
                    if (antActual != null)
                    {
                        if (antActual.SD_DESCUENTOS.ESTADO == "NUEVO")
                        {
                            antActual.IMPORTE = ant.IMPORTE;
                            antActual.DETALLE = ant.DETALLE;
                            Save();
                            result = antActual.ID_DESCUENTO_SOCIO.ToString();
                        }
                        else {
                            result = string.Format("No puedo Modificar en Estado : {0} , es permitido modificar en estado NUEVO", antActual.SD_DESCUENTOS.ESTADO);
                        }
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

        //test

    }
}
