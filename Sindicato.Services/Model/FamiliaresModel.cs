using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Sindicato.Services.Model
{
    public class FamiliaresModel
    {
        public int? ID_FAMILIAR { get; set; }
        public int? ID_SOCIO { get; set; }
        public int? ID_CHOFER { get; set; }
        public string NOMBRE { get; set; }
        public string APELLIDO_PATERNO { get; set; }
        public string APELLIDO_MATERNO { get; set; }
        public int? EDAD { get; set; }
        public int? CI { get; set; }
        public DateTime? FECHA_NAC { get; set; }
        public string EXPEDIDO { get; set; }
        public string OBSERVACION { get; set; }
        public string DIRECCION { get; set; }
        public string TELEFONO { get; set; }
        public string PARENTESCO { get; set; }
    }
}
