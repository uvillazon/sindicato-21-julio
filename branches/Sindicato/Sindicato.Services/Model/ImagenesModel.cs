using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Sindicato.Services.Model
{
    public class ImagenesModel
    {
        public int? ID_IMG { get; set; }
        public string TABLA { get; set; }
        public int? ID_TABLA { get; set; }
        public string NOMBRE_IMG { get; set; }
        public string EXTENSION { get; set; }
        public string DESCRIPCION { get; set; }
        public int? TAMANO { get; set; }
        public string LOGIN_USR { get; set; }
    }
}
