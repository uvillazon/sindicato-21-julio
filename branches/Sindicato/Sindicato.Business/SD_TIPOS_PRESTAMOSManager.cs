
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
    public class SD_TIPOS_PRESTAMOSManager : Repository<SD_TIPOS_PRESTAMOS>
    {


        public SD_TIPOS_PRESTAMOSManager(IUnitOfWork uow) : base(uow) { }


        public string EliminarTipoPrestamo(int ID_TIPO) {
            string result = "";
            try
            {
                var tipo = BuscarTodos(x => x.ID_TIPO == ID_TIPO).FirstOrDefault();
                if (tipo != null)
                {
                    if (tipo.SD_PRESTAMOS_POR_SOCIOS.Count() > 0)
                    {
                        result = string.Format("Existen {} Prestamos Asociados al Tipo", tipo.SD_PRESTAMOS_POR_SOCIOS.Count());
                    }
                    else {
                        Delete(tipo);
                        Save();
                        result = "1";
                    
                    }
                }
                else {
                    result = "No existe el Registro";
                }

            }
            catch (Exception)
            {
                
                throw;
            }
            return result;
        }

        //test
        
    }
}
