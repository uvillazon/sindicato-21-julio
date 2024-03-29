﻿using System;
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
    public class SD_SOCIO_MOVILESManager : Repository<SD_SOCIO_MOVILES>
    {


        public SD_SOCIO_MOVILESManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarMovilSocio(SD_SOCIO_MOVILES movil, int ID_USR)
        {
            try
            {
                string result = "";
                var verificar = BuscarTodos(x => x.ID_MOVIL == movil.ID_MOVIL);
                if (verificar.Count() > 0)
                {
                    result = string.Format("Existe el numero de movil {0} ya asociado a otro Socio", movil.ID_MOVIL);
                }
                else
                {
                    movil.ID_SOCIO_MOVIL = ObtenerSecuencia();
                    movil.ESTADO = "ACTIVO";
                    movil.FECHA_REG = DateTime.Now;
                    movil.ID_USR = ID_USR;
                    Add(movil);
                    Save();
                    result = movil.ID_SOCIO_MOVIL.ToString();
                }
                return result;

            }
            catch (Exception e)
            {
                return e.ToString();
                //throw;
            }
        } 
        
    }
}
