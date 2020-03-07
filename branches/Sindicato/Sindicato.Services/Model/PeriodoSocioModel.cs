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

    public class CierreAhorroSocioModel {
        public int ID_SOCIO { get; set; }
        public string SOCIO { get; set; }
        public string MES { get; set; }
        public string MSG { get; set; }
        public decimal?  CANT_HOJAS { get; set; }
        public decimal? CANT_REGULACIONES { get; set; }
        public decimal? TOTAL_AHORRO { get; set; }
        public decimal? AHORRO_HOJA { get; set; }
        public decimal? AHORRO_PAGADO { get; set; }
        public decimal? AHORRO { get; set; }
        public decimal? AHORRO_REGULACIONES { get; set; }
        public DateTime FECHA_INI { get; set; }
        public DateTime FECHA_FIN { get; set; }

    }
    public class CierreAhorroSocioMovilModel
    {
        public int ID_SOCIO_MOVIL { get; set; }
        public string SOCIO { get; set; }
        public int NRO_MOVIL { get; set; }
        public string MES { get; set; }
        public string MSG { get; set; }
        public decimal? CANT_HOJAS { get; set; }
        public decimal? CANT_REGULACIONES { get; set; }
        public decimal? TOTAL_AHORRO { get; set; }
        public decimal? AHORRO_HOJA { get; set; }
        public decimal? AHORRO_PAGADO { get; set; }
        public decimal? AHORRO { get; set; }
        public decimal? AHORRO_REGULACIONES { get; set; }
        public DateTime FECHA_INI { get; set; }
        public DateTime FECHA_FIN { get; set; }

        public string INTERVALO { get; set; }
        public decimal? TOTAL_CANCELADO { get; set; }

    }

    public class CierreCajaModel
    {
        public int ID_CAJA { get; set; }
        public string CAJA { get; set; }
        public string NOMBRE { get; set; }
        public string OPERACION { get; set; }
        public string SUBOPERACION { get; set; }
        public decimal? SALDO { get; set; }
        public string MONEDA { get; set; }
        public string MSG { get; set; }
        public DateTime FECHA_INI { get; set; }
        public DateTime FECHA_FIN { get; set; }

        public string INTERVALO { get; set; }

    }
}
