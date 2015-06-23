using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Sindicato.Services.Model
{
    public class HojasModel
    {
       
        public int? ID_PARADA { get; set; }
        public int? ID_VENTA { get; set; }
        public int? ID_SOCIO_MOVIL { get; set; }
        public DateTime? FECHA_VENTA { get; set; }
        public DateTime? FECHA { get; set; }
        public string FECHA_TEXT { get; set; }
        //public  { get; set; }
    }
}
