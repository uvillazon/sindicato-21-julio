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
    public class SD_MOVILESManager : Repository<SD_MOVILES>
    {


        public SD_MOVILESManager(IUnitOfWork uow) : base(uow) { }

        //test
        public string GuardarMovil(SD_MOVILES movil, string LOGIN_USR)
        {
            try
            {
                string result = "";
                if (movil.ID_MOVIL == 0)
                {
                    var verificar = BuscarTodos(x => x.NRO_MOVIL == movil.NRO_MOVIL);
                    if (verificar.Count() > 0)
                    {
                        result = string.Format("Existe el numero de movil {0}", movil.NRO_MOVIL);
                    }
                    else
                    {
                        movil.ID_MOVIL = ObtenerSecuencia();
                        movil.ESTADO = "ACTIVO";
                        movil.FECHA_REG = DateTime.Now;
                        movil.LOGIN_USR = LOGIN_USR;
                        movil.ID_LINEA = 1;
                        Add(movil);
                        Save();
                        result = movil.ID_MOVIL.ToString();
                    }
                }
                else {
                    var verificar = BuscarTodos(x => x.NRO_MOVIL == movil.NRO_MOVIL && x.ID_MOVIL != movil.ID_MOVIL).FirstOrDefault();
                    if (verificar != null)
                    {
                        result = string.Format("Existe el numero de movil {0}", movil.NRO_MOVIL);
                    }
                    else
                    {
                        var movilobj = BuscarTodos(x=>x.ID_MOVIL == movil.ID_MOVIL).FirstOrDefault();
                        movilobj.NRO_MOVIL = movil.NRO_MOVIL;
                        movilobj.OBSERVACION = movil.OBSERVACION;
                        movilobj.DESCRIPCION = movil.DESCRIPCION;
                        movilobj.FECHA_ALTA = movil.FECHA_ALTA;
                        Save();
                        result = movil.ID_MOVIL.ToString();
                    }

                }
                return result;

            }
            catch (Exception e)
            {
                return e.ToString();
                //throw;
            }
        }

        public string GuardarCambiosMovil (int ID_MOVIL , int NRO_MOVIL,string OBSERVACION , string login){
            try
            {
                var context = (SindicatoContext)Context;
                var movil = BuscarTodos(x => x.ID_MOVIL == ID_MOVIL).FirstOrDefault();
                if (movil == null) {
                    return string.Format("El movil : {0} No existe. favor verificar",NRO_MOVIL);
                }
                SD_HIST_MOVIL hist = new SD_HIST_MOVIL() { 
                    ID_HIST = ObtenerSecuencia("SD_HIST_MOVIL"),
                    ID_MOVIL = ID_MOVIL,
                    MOVIL_ANTERIOR= movil.NRO_MOVIL.ToString(),
                    MOVIL_NUEVO = NRO_MOVIL.ToString(),
                    OBSERVACION = OBSERVACION,
                    LOGIN = login,
                    FECHA_REG = DateTime.Now

                };
                context.SD_HIST_MOVIL.AddObject(hist);
                movil.NRO_MOVIL = NRO_MOVIL;
                Save();
                return "1";
                
                

            }
            catch (Exception e) {
                return e.ToString();
            }
        }
    }
}
