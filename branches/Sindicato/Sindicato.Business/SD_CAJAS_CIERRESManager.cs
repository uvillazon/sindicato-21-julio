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
    public class SD_CAJAS_CIERRESManager : Repository<SD_CAJAS_CIERRES>
    {


        public SD_CAJAS_CIERRESManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarCierre(SD_CAJAS_CIERRES ant, string login)
        {
            try
            {
                string result = "";
                if (ant.ID_CIERRE == 0)
                {

                    ant.ID_CIERRE = ObtenerSecuencia();
                    ant.LOGIN = login; ;
                    ant.FECHA_REG = DateTime.Now;
                    ant.ESTADO = "ACTIVO";
                    ant.ID_CAJA = ant.ID_CAJA;
                    ant.FECHA_INI = ant.FECHA_INI;
                    ant.FECHA_FIN = ant.FECHA_FIN;
                    ant.SALDO_INICIAL = ant.SALDO_INICIAL;
                    ant.SALDO_FINAL = ant.SALDO_FINAL;
                    Add(ant);
                    Save();
                    result = ant.ID_CIERRE.ToString();
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
            }
        }
    }
}
