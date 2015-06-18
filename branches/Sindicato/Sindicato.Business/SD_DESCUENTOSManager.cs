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
    public class SD_DESCUENTOSManager : Repository<SD_DESCUENTOS>
    {


        public SD_DESCUENTOSManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarDescuento(SD_DESCUENTOS ant, string login)
        {
            try
            {
                string result = "";
                if (ant.ID_DESCUENTO == 0)
                {
                    ant.ID_DESCUENTO = ObtenerSecuencia();
                    ant.LOGIN = login; 
                    ant.FECHA_REG = DateTime.Now;
                    ant.ESTADO = "NUEVO";
                    Add(ant);
                    Save();
                    result = ant.ID_DESCUENTO.ToString();
                    return result;
                }
                else
                {
                    var antActual = BuscarTodos(x => x.ID_DESCUENTO == ant.ID_DESCUENTO).FirstOrDefault();
                    if (antActual != null)
                    {
                        antActual.DESCUENTO = ant.DESCUENTO;
                        antActual.TOTAL = ant.TOTAL;
                        antActual.FECHA = ant.FECHA;
                        antActual.DESCRIPCION = ant.DESCRIPCION;
                        Save();
                        result = antActual.ID_DESCUENTO.ToString();
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
        public string ActualizarTotal(int ID_DESCUENTO)
        {
            try
            {
                string result = "";

                var antActual = BuscarTodos(x => x.ID_DESCUENTO == ID_DESCUENTO).FirstOrDefault();
                    if (antActual != null)
                    {
                        var total = antActual.SD_DESCUENTOS_SOCIO.Sum(x => x.IMPORTE);
                        antActual.TOTAL = total;
                        Save();
                        result = total.ToString();
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
                //throw;
            }
        }

        //test

    }
}
