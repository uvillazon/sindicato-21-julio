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
    public class SD_DETALLES_VENTA_HOJASManager : Repository<SD_DETALLES_VENTA_HOJAS>
    {


        public SD_DETALLES_VENTA_HOJASManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarDetalle(SD_DETALLE_HOJAS det, int ID_SOCIO_MOVIL, string login)
        {
            try
            {
                string result = "1";


                var context = (SindicatoContext)Context;
                var detalleobligaciones = context.SD_SOC_MOV_OBLIG.Where(x => x.ID_SOCIO_MOVIL == ID_SOCIO_MOVIL);
                foreach (var item in detalleobligaciones)
                {
                    var detalle = new SD_DETALLES_VENTA_HOJAS()
                    {
                        ID_DETALLE = ObtenerSecuencia(),
                        ID_DETALLE_VENTA = det.ID_DETALLE,
                        ID_SOC_MOV_OBLIG = ID_SOCIO_MOVIL,
                        IMPORTE = item.IMPORTE
                    };
                    Add(detalle);


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
