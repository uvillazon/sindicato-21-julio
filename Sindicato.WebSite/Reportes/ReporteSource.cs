using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sindicato.Model;
using Sindicato.Services;
using Sindicato.Services.Interfaces;
using Sindicato.WebSite.Models;
namespace Sindicato.WebSite.Reportes
{
    public class ReporteSource
    {
        public IEnumerable<SocioMovilModel> ReporteSocioMovil(DateTime fecha)
        {

            IEnumerable<SocioMovilModel> result = null;
            var servicio = new SociosServices();
            var res = servicio.ObtenerSociosMoviles();
            result = res.Select(x => new SocioMovilModel() { 
                NOMBRES = x.SD_SOCIOS.NOMBRE,
                APELLIDO_PATERNO = x.SD_SOCIOS.APELLIDO_PATERNO,
                APELLIDO_MATERNO = x.SD_SOCIOS.APELLIDO_MATERNO,
                FECHA_INGRESO = x.FECHA_ALTA,
                MOVIL = x.SD_MOVILES.NRO_MOVIL.ToString(),
                ANTIGUEDAD =this.CalcularMeses( x.FECHA_ALTA , fecha )
                //OBSERVACION = x.SD_SOCIOS.OBSERVACION
            });
            
            return result;
        }
        public  decimal CalcularMeses(DateTime fechaComienzo, DateTime fechaFin)
        {
            fechaComienzo = fechaComienzo.Date;
            fechaFin = fechaFin.Date;
            decimal count = 0;
            while (fechaComienzo < fechaFin)
            {
                fechaComienzo = fechaComienzo.AddMonths(1);
                count++;
            }
            return count;
        }
    }
}