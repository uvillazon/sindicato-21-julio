using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sindicato.Model;
using Sindicato.Services;
using Sindicato.Services.Interfaces;
using Sindicato.Services.Model;
namespace Sindicato.WebSite.Reportes
{
    public class ReporteSource
    {
        public IEnumerable<SocioMovilModel> ReporteSocioMovil(DateTime fecha)
        {

            IEnumerable<SocioMovilModel> result = null;
            var servicio = new SociosServices();
            var res = servicio.ObtenerSociosMoviles();
            result = res.Select(x => new SocioMovilModel()
            {
                NOMBRES = x.SD_SOCIOS.NOMBRE,
                APELLIDO_PATERNO = x.SD_SOCIOS.APELLIDO_PATERNO,
                APELLIDO_MATERNO = x.SD_SOCIOS.APELLIDO_MATERNO,
                FECHA_INGRESO = x.FECHA_ALTA,
                MOVIL = x.SD_MOVILES.NRO_MOVIL.ToString(),
                ANTIGUEDAD = this.CalcularMeses(x.FECHA_ALTA, fecha)
                //OBSERVACION = x.SD_SOCIOS.OBSERVACION
            });

            return result;
        }
        public decimal CalcularMeses(DateTime fechaComienzo, DateTime fechaFin)
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
        public IEnumerable<SocioMovilHojas> ReporteSocioMovilHoja()
        {

            IEnumerable<SocioMovilHojas> result = null;
            var servicio = new SociosServices();
            var res = servicio.ObtenerSociosMoviles();
            result = res.Select(x => new SocioMovilHojas()
            {
                NRO_MOVIL = x.SD_MOVILES.NRO_MOVIL,
                SOCIO = string.Format("{0} {1} {2}", x.SD_SOCIOS.NOMBRE, x.SD_SOCIOS.APELLIDO_PATERNO, x.SD_SOCIOS.APELLIDO_MATERNO),
                TIPO_LINEA = x.TIPO_MOVIL,
                AHORRO = BuscarImporte(x.SD_SOC_MOV_OBLIG, "AHORRO"),
                CANASTON = BuscarImporte(x.SD_SOC_MOV_OBLIG, "CANASTON"),
                INSTITUCION = BuscarImporte(x.SD_SOC_MOV_OBLIG, "INSTITUCION"),
                SEGURO = BuscarImporte(x.SD_SOC_MOV_OBLIG, "SEGURO"),
            });

            return result;
        }

        private decimal BuscarImporte(IEnumerable<SD_SOC_MOV_OBLIG> lista, string tipo)
        {
            decimal importe = 0;
            importe = lista.Count() == 0 ? 0 : lista.Where(x => x.SD_OBLIGACIONES_HOJA.OBLIGACION == tipo).Count() == 0 ? 0 : lista.First(x => x.SD_OBLIGACIONES_HOJA.OBLIGACION == tipo).IMPORTE;
            return importe;
        }
    }
}