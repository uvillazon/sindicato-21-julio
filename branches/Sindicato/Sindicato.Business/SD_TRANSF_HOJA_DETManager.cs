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
    public class SD_TRANSF_HOJA_DETManager : Repository<SD_TRANSF_HOJA_DET>
    {


        public SD_TRANSF_HOJA_DETManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarAmortizacion(SD_AMORTIZACIONES ing, string login)
        {
            return "";
            //try
            //{
            //    string result = "";
            //    if (ing.ID_AMORTIZACION == 0)
            //    {
            //        var context = (SindicatoContext)Context;
            //        var deuda = context.SD_SOCIOS.Where(x => x.ID_SOCIO == ing.ID_SOCIO).FirstOrDefault().DEUDA;
            //        if (ing.IMPORTE > deuda)
            //        {
            //            result = string.Format("No puede Amortizar mas que su deuda. Saldo Deuda : {0}", deuda);
            //        }
            //        else
            //        {
            //            ing.FECHA_REG = DateTime.Now;
            //            ing.LOGIN = login;
            //            ing.ID_AMORTIZACION = ObtenerSecuencia();
            //            Add(ing);

            //            ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
            //            context.P_EE_SECUENCIA("SD_KARDEX_SOCIO_DEBE", 0, p_RES);
            //            int idKardex = Convert.ToInt32(p_RES.Value);
            //            SD_KARDEX_SOCIO_DEBE kardex = new SD_KARDEX_SOCIO_DEBE()
            //            {
            //                ID_KARDEX = idKardex,
            //                DETALLE = ing.CONCEPTO,
            //                FECHA = (DateTime)ing.FECHA,
            //                FECHA_REG = DateTime.Now,
            //                ID_OPERACION = ing.ID_AMORTIZACION,
            //                ID_SOCIO = ing.ID_SOCIO,
            //                AMORTIZACION = ing.IMPORTE,
            //                LOGIN = ing.LOGIN,
            //                OPERACION = "AMORTIZACIONES"
            //            };
            //            context.SD_KARDEX_SOCIO_DEBE.AddObject(kardex);

            //            context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
            //            int idKardexIngreso = Convert.ToInt32(p_RES.Value);
            //            SD_KARDEX_EFECTIVO kardexIngreso = new SD_KARDEX_EFECTIVO()
            //            {
            //                ID_KARDEX = idKardexIngreso,
            //                DETALLE = ing.CONCEPTO,
            //                FECHA = (DateTime)ing.FECHA,
            //                FECHA_REG = DateTime.Now,
            //                ID_OPERACION = ing.ID_AMORTIZACION,
            //                ID_CAJA = ing.ID_CAJA,
            //                INGRESO = ing.IMPORTE,
            //                LOGIN = ing.LOGIN,
            //                OPERACION = "AMORTIZACIONES"
            //            };
            //            context.SD_KARDEX_EFECTIVO.AddObject(kardexIngreso);

            //            Save();

            //            context.P_SD_ACT_KARDEX_DEBE(ing.ID_SOCIO,ing.FECHA,0,p_RES);
            //            context.P_SD_ACT_KARDEX_EFECTIVO(ing.ID_CAJA, ing.FECHA, 0, p_RES);
            //            result = ing.ID_AMORTIZACION.ToString();
            //        }
            //    }
            //    else
            //    {
            //        result = "No se puede Editar una Amortizacion. Es necesario Eliminar y volver a Crear";
            //    }
            //    return result;

            //}
            //catch (Exception e)
            //{
            //    return e.ToString();
            //    //throw;
            //}
        }

    }
}
