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
    public class SD_IMPRESION_HOJASManager : Repository<SD_IMPRESION_HOJAS>
    {


        public SD_IMPRESION_HOJASManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarImpresionHojas(SD_IMPRESION_HOJAS ing, string login)
        {
            try
            {
                string result = "";
                if (ing.ID_IMPRESION == 0)
                {
                    var context = (SindicatoContext)Context;

                    ing.ID_IMPRESION = ObtenerSecuencia();
                    ing.FECHA_REG = DateTime.Now;

                    Add(ing);
                    result = ing.ID_IMPRESION.ToString();
                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                    

                    var startDate = new DateTime(ing.FECHA.Year, ing.FECHA.Month, 1);
                    var endDate = startDate.AddMonths(1).AddDays(-1);
                   

                    for (int i = 0; i < endDate.Day; i++)
                    {
                        context.P_EE_SECUENCIA("SD_DETALLES_IMPRESION_HOJAS", 0, p_RES);
                        int idKardex = Convert.ToInt32(p_RES.Value);
                        SD_DETALLES_IMPRESION_HOJAS detalle = new SD_DETALLES_IMPRESION_HOJAS() { 
                            ID_DETALLE = idKardex,
                            ID_IMPRESION = ing.ID_IMPRESION,
                            FECHA_USO = startDate.AddDays(i)
                        };
                        context.SD_DETALLES_IMPRESION_HOJAS.AddObject(detalle);
                    }
                    Save();

                }
                else
                {
                    result = "No se puede Editar una Amortizacion. Es necesario Eliminar y volver a Crear";
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
