using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sindicato.Model;

namespace Sindicato.Services.Model
{
    public class SocioMovilModel
    {
        public int NRO { get; set; }
        public string APELLIDO_PATERNO { get; set; }
        public string APELLIDO_MATERNO { get; set; }
        public string NOMBRES { get; set; }
        public string MOVIL { get; set; }
        public DateTime? FECHA_INGRESO { get; set; }
        public decimal ANTIGUEDAD { get; set; }
        public decimal? MONTO_DEVOLUCION { get; set; }
        public string FIRMA { get; set; }
        public string OBSERVACION { get; set; }
       

    }

    public class SocioMovilHojas
    {
        public int NRO_MOVIL { get; set; }
        public string SOCIO { get; set; }
        public string TIPO_LINEA { get; set; }
        public decimal SEGURO { get; set; }
        public decimal INSTITUCION { get; set; }
        public decimal CANASTON { get; set; }
        public decimal AHORRO { get; set; }
    }

    public class ReporteHoja {
        public int ID_HOJA { get; set; }
        public int NUMERO { get; set; }
        public DateTime FECHA_COMPRA { get; set; }
        public string SOCIO { get; set; }
        public string OBSERVACION { get; set; }
        public int MOVIL { get; set; }
        public string PLACA { get; set; }
    }

    public class ReporteTotal {
        public string DETALLE { get; set; }
        public string SUBDETALLE { get; set; }
        public string NRO_RECIBO { get; set; }
        public int CANTIDAD { get; set; }
        public decimal COSTO_UNITARIO { get; set; }
        public decimal BOLIVIANOS { get; set; }
        public decimal DOLARES { get; set; }
    }

    public class ReporteKardexHoja {
        public string MES { get; set; }
        public string NRO_MOVIL { get; set; }
        public string SOCIO { get; set; }
        public decimal? CANT_HOJAS { get; set; }
        public decimal? CANT_REG { get; set; }
        public decimal? CANT_HOJAS_OBLIG { get; set; }
        public decimal? DEBE { get; set; }
    }

    public class ReporteRegulaciones {
        public int ID_REGULACION { get; set; }
        public string MOVIL { get; set; }
        public string SOCIO { get; set; }
        public DateTime? FECHA_COMPRA { get; set; }
        public string MES { get; set; }
        public decimal? CANTIDAD { get; set; }
        public decimal? TOTAL { get; set; }
        public string OBLIGACION { get; set; }
        public decimal? IMPORTE_OBLIGACION { get; set; }
        public string TOTAL_LITERAL { get; set; }
        
    }
    public class ReporteIngresos
    {
        public int ID_INGRESO { get; set; }
        public string MOVIL { get; set; }
        public string SOCIO { get; set; }
        public DateTime? FECHA_COMPRA { get; set; }
        public string MES { get; set; }
        public decimal? CANTIDAD { get; set; }
        public decimal? TOTAL { get; set; }
        public string OBLIGACION { get; set; }
        public decimal? IMPORTE_OBLIGACION { get; set; }
        public string TOTAL_LITERAL { get; set; }

    }

}
