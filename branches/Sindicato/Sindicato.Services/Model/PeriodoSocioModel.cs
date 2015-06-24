using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Sindicato.Services.Model
{
    public class PeriodoSocioModel
    {
        public int? ID_PERIODO { get; set; }
        public int? ID_SOCIO { get; set; }
        public string SOCIO { get; set; }
        public string PERIODO { get; set; }
        public decimal INGRESOS_HOJAS  { get; set; }
        public decimal OTROS_INGRESOS { get; set; }
        public decimal OBLIGACIONES_INSTITUCION { get; set; }
        public decimal OTRAS_OBLIGACIONES { get; set; }
        public decimal AHORRO { get; set; }
        public decimal DEUDA { get; set; }
    }
}
