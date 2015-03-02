using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Sindicato.Services.Model
{
    public class SociosModel
    {
        public int? ID_SOCIO { get; set; }
        public int? ID_MOVIL { get; set; }
        public int? ID_CHOFER { get; set; }
        public int? NRO_SOCIO { get; set; }
        public string NOMBRE { get; set; }
        public string APELLIDO_PATERNO { get; set; }
        public string APELLIDO_MATERNO { get; set; }
        public int? NRO_LICENCIA { get; set; }
        public int? CI { get; set; }
        public DateTime? FECHA_NAC { get; set; }
        public string DOMICILIO { get; set; }
        public string OBSERVACION { get; set; }
        public string ESTADO { get; set; }
        public int? ID_OBLIGACION { get; set; }
    }
}
