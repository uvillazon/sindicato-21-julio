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

        //public string GuardarAntecedente(SD_ANTECEDENTES ant, string login)
        //{
        //    try
        //    {
        //        string result = "";
        //        if (ant.ID_ANTECEDENTE == 0)
        //        {
                  

        //                //ant.ID_CHOFER = ;
        //                ant.ID_ANTECEDENTE = ObtenerSecuencia();
        //                ant.LOGIN = login; ;
        //                ant.FECHA_REG = DateTime.Now;

        //            //}
        //            //else
        //            //{
        //            //    ant.ID_SOCIO = null;
        //            //    ant.ID_ANTECEDENTE = ObtenerSecuencia();
        //            //    ant.LOGIN = login; ;
        //            //    ant.FECHA_REG = DateTime.Now;
        //            //}
        //            Add(ant);
        //            Save();
        //            result = ant.ID_ANTECEDENTE.ToString();
        //            return result;
        //        }
        //        else {
        //            var antActual = BuscarTodos(x => x.ID_ANTECEDENTE == ant.ID_ANTECEDENTE).FirstOrDefault();
        //            if (antActual != null)
        //            {
        //                antActual.MOTIVO = ant.MOTIVO;
        //                antActual.OBSERVACION = ant.OBSERVACION;
        //                antActual.FECHA = ant.FECHA;
        //                Save();
        //                result = antActual.ID_ANTECEDENTE.ToString();
        //            }
        //            else {
        //                result = "No Existe ese Antecedente";
        //            }
        //            return result;
        //        }

        //    }
        //    catch (Exception e)
        //    {
        //        return e.ToString();
        //        //throw;
        //    }
        //}

        //test

    }
}
