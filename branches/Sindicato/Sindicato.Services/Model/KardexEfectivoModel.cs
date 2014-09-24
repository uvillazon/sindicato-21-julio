using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Sindicato.Services.Model
{
    public class KardexEfectivoModel
    {
        public int? ID_KARDEX { get; set; }
        public int? ID_CAJA { get; set; }
        public string OPERACION { get; set; }
        public DateTime? FECHA { get; set; }
    }
}
