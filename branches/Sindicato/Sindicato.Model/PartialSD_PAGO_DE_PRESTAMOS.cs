using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;

namespace Sindicato.Model
{
    public partial class SD_PAGO_DE_PRESTAMOS
    {
        public decimal? CONDONACION_INTERES { get; set; }
        public decimal? INTERES_CALCULADO_A_FECHA { get; set; }

        
        public string TIPO_PAGO { get; set; }
        public int? ID_PRESTAMO_REF { get; set; }
        
    }

}
