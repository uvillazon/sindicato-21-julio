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

        //public string GuardarObligaciones(SD_EGRESOS ing, string login)
        //{
        //    try
        //    {
        //        string result = "";
        //        if (ing.ID_EGRESO == 0)
        //        {
        //            var context = (SindicatoContext)Context;
        //            var saldo = context.SD_CAJAS.Where(x => x.ID_CAJA == ing.ID_CAJA).FirstOrDefault().SALDO;
        //            if (ing.IMPORTE > saldo)
        //            {
        //                result = string.Format("No puede Retirar mas que su saldo. Saldo Disponible : {0}", saldo);
        //            }
        //            else
        //            {
        //                ing.FECHA_REG = DateTime.Now;
        //                ing.LOGIN = login;
        //                ing.ID_EGRESO = ObtenerSecuencia();
        //                Add(ing);

        //                ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
        //                context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
        //                int idKardex = Convert.ToInt32(p_RES.Value);
        //                SD_KARDEX_EFECTIVO kardex = new SD_KARDEX_EFECTIVO()
        //                {
        //                    ID_KARDEX = idKardex,
        //                    DETALLE = ing.CONCEPTO,
        //                    FECHA = (DateTime)ing.FECHA,
        //                    FECHA_REG = DateTime.Now,
        //                    ID_OPERACION = ing.ID_EGRESO,
        //                    ID_CAJA = ing.ID_CAJA,
        //                    EGRESO = ing.IMPORTE,
        //                    LOGIN = ing.LOGIN,
        //                    OPERACION = "EGRESOS"
        //                };
        //                context.SD_KARDEX_EFECTIVO.AddObject(kardex);
        //                Save();

        //                context.P_SD_ACT_KARDEX_EFECTIVO(ing.ID_CAJA,ing.FECHA,0,p_RES);
        //                result = ing.ID_EGRESO.ToString();
        //            }
        //        }
        //        else
        //        {
        //            result = "No se puede Editar un Egreso. Es necesario Eliminar el Retiro Primero";
        //        }
        //        return result;

        //    }
        //    catch (Exception e)
        //    {
        //        return e.ToString();
        //        //throw;
        //    }
        //}

    }
}
