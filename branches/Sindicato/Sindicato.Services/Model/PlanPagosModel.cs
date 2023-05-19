using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Sindicato.Services.Model
{
    public class PlanPagosModel
    {
        public int NRO_CCUOTA { get; set; }
        public DateTime FECHA_CUOTA  { get; set; }
        public decimal INTERES { get; set; }
        public decimal CAPITAL { get; set; }
        public decimal CUOTA { get; set; }
        public decimal SALDO { get; set; }
        public decimal TOTAL_AMORTIZACION { get; set; }

    }
}
