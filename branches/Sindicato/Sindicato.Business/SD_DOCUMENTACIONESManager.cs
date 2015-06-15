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
    public class SD_DOCUMENTACIONESManager : Repository<SD_DOCUMENTACIONES>
    {


        public SD_DOCUMENTACIONESManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarDocumentacion(SD_DOCUMENTACIONES doc, string login)
        {
            try
            {
                string result = "";
                if (doc.ID_DOCUMENTACION == 0)
                {
                    doc.ID_DOCUMENTACION = ObtenerSecuencia();
                    doc.LOGIN = login;
                    doc.FECHA_REG = DateTime.Now;
                    Add(doc);
                    Save();
                    result = doc.ID_DOCUMENTACION.ToString();
                    return result;
                }
                else
                {
                    var antActual = BuscarTodos(x => x.ID_DOCUMENTACION == doc.ID_DOCUMENTACION).FirstOrDefault();
                    if (antActual != null)
                    {
                        antActual.TIPO = doc.TIPO;
                        antActual.OBSERVACION = doc.OBSERVACION;
                        antActual.FECHA = doc.FECHA;
                        antActual.DOCUMENTACION = doc.DOCUMENTACION;
                        Save();
                        result = antActual.ID_DOCUMENTACION.ToString();
                    }
                    else
                    {
                        result = "No Existe ese Antecedente";
                    }
                    return result;
                }

            }
            catch (Exception e)
            {
                return e.ToString();
                //throw;
            }
        }



    }
}
