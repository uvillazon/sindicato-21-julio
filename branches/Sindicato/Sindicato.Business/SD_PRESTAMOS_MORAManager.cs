
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
    public class SD_PRESTAMOS_MORAManager : Repository<SD_PRESTAMOS_MORA>
    {


        public SD_PRESTAMOS_MORAManager(IUnitOfWork uow) : base(uow) { }
        ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));

        public RespuestaSP GuardarMora(SD_PRESTAMOS_MORA mora, string login)
        {
            RespuestaSP result = new RespuestaSP();
            try
            {
                var context = (SindicatoContext)Context;

                context.P_SD_GUARDAR_MORA(mora.ID_MORA, mora.ID_PRESTAMO, mora.IMPORTE_MORA, mora.FECHA_LIMITE_PAGO_MORA, mora.OBSERVACION, login, p_res);
                    int id;
                bool esNumero = int.TryParse(p_res.Value.ToString(), out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }
            }
            catch (Exception e)
            {

                result.success = false;
                result.msg = e.Message.ToString();
            }

            return result;
        }

        public RespuestaSP EliminarMora(int ID_MORA, string login)
        {
            RespuestaSP result = new RespuestaSP();
            try
            {
                var context = (SindicatoContext)Context;
                context.P_SD_ELIMINAR_MORA(ID_MORA, 1, p_res);
                int id;
                bool esNumero = int.TryParse(p_res.Value.ToString(), out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }
            }
            catch (Exception e)
            {

                result.success = false;
                result.msg = e.Message.ToString();
            }

            return result;
        }

        //test
        
    }
}
