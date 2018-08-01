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
    public class SD_TRANSFERENCIAS_HOJASManager : Repository<SD_TRANSFERENCIAS_HOJAS>
    {


        public SD_TRANSFERENCIAS_HOJASManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarTransferencia(SD_TRANSFERENCIAS_HOJAS data, string login)
        {
            try
            {
                string result = "";
                if (data.ID_TRANSF == 0)
                {
                    var context = (SindicatoContext)Context;
                    var hojasATransferir = context.SD_HOJAS_CONTROL.Where(x => x.ID_SOCIO_MOVIL == data.TO_SOCIO_MOVIL && x.ESTADO == "NUEVO");
                    var hojasARecibir = context.SD_HOJAS_CONTROL.Where(x => x.ID_SOCIO_MOVIL == data.FROM_SOCIO_MOVIL);
                    if (hojasATransferir.Count() > 0 && hojasARecibir.Count() == 0)
                    {
                        data.ESTADO = "NUEVO";
                        data.FECHA_REG = DateTime.Now;
                        data.ID_TRANSF = ObtenerSecuencia();
                        Add(data);
                        foreach (var item in hojasATransferir)
                        {
                            ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                            context.P_EE_SECUENCIA("SD_TRANSF_HOJA_DET", 0, p_RES);
                            int iddetalle = Convert.ToInt32(p_RES.Value);

                            SD_TRANSF_HOJA_DET det = new SD_TRANSF_HOJA_DET()
                            {
                                ID_TRANSF = data.ID_TRANSF,
                                ID_DETALLE = iddetalle,
                                ID_HOJA = item.ID_HOJA
                            };
                            context.SD_TRANSF_HOJA_DET.AddObject(det);
                            item.ID_SOCIO_MOVIL = data.FROM_SOCIO_MOVIL;

                        }
                        Save();
                        result = data.ID_TRANSF.ToString();

                    }
                    else
                    {
                        result = "el Socio no cuenta con hojas para transferir y/o el socio a transferir no es nuevo";
                    }



                }
                return result;
            }
            catch (Exception e)
            {
                return e.Message;
                //throw;
            }
        }

        public string AnularTransferenciaHojas(int ID_TRANSF) {

            try
            {
                string result = "";
                SD_TRANSFERENCIAS_HOJAS transf = BuscarTodos(x => x.ID_TRANSF == ID_TRANSF).FirstOrDefault();
                if (transf == null) {
                    return "No existe la transferencia.";
                }
                var hojas = transf.SD_TRANSF_HOJA_DET.Where(x => x.SD_HOJAS_CONTROL.ESTADO == "APROBADO");
                if (hojas.Count() > 0) {
                    return "No puede Anular la transferencia. por que alguna hoja de la transferencia fue APROBADO";
                }
                transf.ESTADO = "ANULADO";
                Save();


                result = transf.ID_TRANSF.ToString();
                return result;
            }
            catch (Exception e) {
                return e.Message;
            }
        }

    }
}
