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
    public class SD_CIERRES_CAJASManager : Repository<SD_CIERRES_CAJAS>
    {


        public SD_CIERRES_CAJASManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarCierre(SD_CIERRES_CAJAS ant, string login)
        {
            try
            {
                string result = "";
                if (ant.ID_CIERRE == 0)
                {
                    ant.ID_CIERRE = ObtenerSecuencia();
                    ant.LOGIN = login; ;
                    ant.OBSERVACION = ant.OBSERVACION;
                    ant.FECHA_REG = DateTime.Now;
                    ant.ESTADO = "ACTIVO";
                    ant.CODIGO = ant.ID_CIERRE.ToString();
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

        public RespuestaSP VerificarCierre(DateTime FECHA)
        {
            RespuestaSP result = new RespuestaSP();

            var cierre = BuscarTodos().OrderByDescending(x => x.FECHA_FIN).FirstOrDefault();
            if (cierre == null)
            {
                result.success = true;
                result.msg = "No existe Fechas de cierre";
            }
            else
            {
                if (FECHA > cierre.FECHA_FIN)
                {
                    result.success = true;
                    result.msg = "No existe Fechas de cierre";
                }
                else
                {
                    result.success = false;
                    result.msg = "No se puede crear registros en la caja por que ya fue cerrado";
                }
            }


            return result;
        }
    }
}
