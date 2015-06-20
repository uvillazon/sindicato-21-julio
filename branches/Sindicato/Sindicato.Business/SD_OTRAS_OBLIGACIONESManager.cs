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
    public class SD_OTRAS_OBLIGACIONESManager : Repository<SD_OTRAS_OBLIGACIONES>
    {


        public SD_OTRAS_OBLIGACIONESManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarObligaciones(SD_OTRAS_OBLIGACIONES ing, string login)
        {
            try
            {
                string result = "";
                if (ing.ID_OBLIGACION == 0)
                {
                    ing.FECHA_REG = DateTime.Now;
                    ing.LOGIN = login;
                    ing.ID_OBLIGACION = ObtenerSecuencia();
                    ing.ESTADO = "NUEVO";
                    Add(ing);
                    Save();
                    result = ing.ID_OBLIGACION.ToString();

                }
                else
                {
                    var item = BuscarTodos(x => x.ID_OBLIGACION == ing.ID_OBLIGACION).FirstOrDefault();
                    if (item != null)
                    {
                        if (item.ESTADO == "NUEVO")
                        {
                            item.CONCEPTO = ing.CONCEPTO;
                            item.FECHA = ing.FECHA;
                            item.IMPORTE = ing.IMPORTE;
                            item.OBSERVACION = ing.OBSERVACION;
                            Save();
                            result = ing.ID_OBLIGACION.ToString();

                        }
                        else
                        {
                            result = string.Format("No se puede Editar, Solo se pueden Editar las obligaciones en estado NUEVO, Estado Actual {0}", item.ESTADO);
                        }
                    }
                    else
                    {
                        result = "No Existe la Obligacion";
                    }
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
