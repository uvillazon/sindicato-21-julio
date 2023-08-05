
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
    public class SD_DETALLE_CIERRE_GESTIONManager : Repository<SD_DETALLE_CIERRE_GESTION>
    {


        public SD_DETALLE_CIERRE_GESTIONManager(IUnitOfWork uow) : base(uow) { }

        //test

        //public string generarPagosAhorros(string login)
        //{
        //    try
        //    {
        //        var context = (SindicatoContext)Context;

        //        ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
        //        context.P_ACT_PAGOS_AHORROS(login, p_RES);

        //        return p_RES.Value.ToString();

        //    }
        //    catch (Exception e)
        //    {
        //        return e.ToString();
        //    }
        //}
    }
}
