
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
    public class SD_VENTA_HOJASManager : Repository<SD_VENTA_HOJAS>
    {


        public SD_VENTA_HOJASManager(IUnitOfWork uow) : base(uow) { }


        public string VerificarVentaHoja(int ID_SOCIO_MOVIl, string login)
        {
            try
            {
                var context = (SindicatoContext)Context;
                var socio = context.SD_SOCIO_MOVILES.Where(x => x.ID_SOCIO_MOVIL == ID_SOCIO_MOVIl).FirstOrDefault();
                if (socio == null)
                {
                    return "No existe Socio";
                }
                
                //if(socio.FECHA_ALTA)

                ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                context.P_SD_ACT_KARDEX_HOJA(ID_SOCIO_MOVIl, socio.FECHA_ALTA, login, p_RES);

                DateTime now = DateTime.Now.AddDays(1 - DateTime.Now.Day).Date;
                decimal? debe = context.SD_KARDEX_HOJAS.Where(x => x.ID_SOCIO_MOVIL == ID_SOCIO_MOVIl && x.MES < now).Sum(y => y.DEBE);
                if (debe > 0)
                {
                    return string.Format("El Socio {0} Cuenta con : {1} Hojas pendientes , Favor Regularizar",socio.ObtenerNombreSocio() , debe);
                }
                return "1";

            }
            catch (Exception e)
            {
                return e.ToString();
            }
        }
        //test

    }
}
