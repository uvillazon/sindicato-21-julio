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

    public class SociosMovilesReporte
    {
        public int NRO_MOVIL { get; set; }
        public string SOCIO { get; set; }
        public string TIPO_LINEA { get; set; }
        public string DESCRIPCION { get; set; }
        public string OBSERVACION { get; set; }
        public DateTime? FECHA_ALTA { get; set; }
        public DateTime? FECHA_BAJA { get; set; }
        public DateTime? FECHA_REG { get; set; }
        public string INTERVALO_FECHA { get; set; }
        public string ESTADO { get; set; }
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

    public class ReporteHoja
    {
        public long ID_DETALLE { get; set; }
        public int ID_HOJA { get; set; }
        public int NUMERO { get; set; }
        public DateTime FECHA_COMPRA { get; set; }
        public DateTime FECHA_USO { get; set; }
        public string SOCIO { get; set; }
        public string OBSERVACION { get; set; }
        public int MOVIL { get; set; }
        public string PLACA { get; set; }
        public string PRECIO { get; set; }
        public string OBLIGACIONES { get; set; }
    }

    public class ReporteTotal
    {
        public string DETALLE { get; set; }
        public string SUBDETALLE { get; set; }
        public string NRO_RECIBO { get; set; }
        public int CANTIDAD { get; set; }
        public decimal COSTO_UNITARIO { get; set; }
        public decimal BOLIVIANOS { get; set; }
        public decimal DOLARES { get; set; }
        public DateTime FECHA_INI { get; set; }
        public DateTime FECHA_FIN { get; set; }
        public decimal TOTAL_AHORRO { get; set; }
        public int TOTAL_CANTIDAD { get; set; }
    }

    public class ReporteKardexHoja
    {
        public DateTime MES { get; set; }
        public string NRO_MOVIL { get; set; }
        public string SOCIO { get; set; }
        public decimal? CANT_HOJAS { get; set; }
        public decimal? CANT_REG { get; set; }
        public decimal? CANT_HOJAS_OBLIG { get; set; }
        public decimal? DEBE { get; set; }
    }

    public class ReporteRegulaciones
    {
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
        public string CONCEPTO { get; set; }
        public string CAJA { get; set; }

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

    public class ReporteRetiroModel
    {
        public int ID_RETIRO { get; set; }
        public string MOVIL { get; set; }
        public string SOCIO { get; set; }
        public string CAJA { get; set; }
        public DateTime? FECHA { get; set; }
        public string OBSERVACION { get; set; }
        public string LOGIN { get; set; }
        public decimal? TOTAL_RETIRO { get; set; }
        public string TOTAL_LITERAL { get; set; }

    }

    public class RepoteDetalleHojas
    {
        public string SOCIO { get; set; }
        public int MOVIL { get; set; }
        public string NRO_HOJA { get; set; }
        public DateTime FECHA_COMPRA { get; set; }
        public decimal? IMPORTE { get; set; }
        public decimal? IMPORTE_DETALLE { get; set; }
        public decimal? AHORRO { get; set; }
        public string ESTADO { get; set; }
    }

    public class ReportePrestamo
    {
        public decimal ID_PAGO { get; set; }
        public decimal NUMERO { get; set; }
        public string CODIGO_GESTION { get; set; }
        public decimal TOTAL_CANCELADO { get; set; }
        public decimal DEBE { get; set; }
        public decimal ID_PRESTAMO { get; set; }
        public string SOCIO { get; set; }
        public string TIPO_PRESTAMO { get; set; }
        public string CAJA { get; set; }
        public decimal ID_PLAN { get; set; }
        public DateTime FECHA_PRESTAMO { get; set; }
        public decimal IMPORTE_PRESTAMO { get; set; }
        public decimal IMPORTE_MORA { get; set; }
        public string MONEDA { get; set; }
        public string OBSERVACION { get; set; }
        public string TIPO_INTERES { get; set; }
        public decimal INTERES { get; set; }
        public decimal SEMANAS { get; set; }
        public DateTime? FECHA_LIMITE_PAGO { get; set; }
        public decimal? IMPORTE_INTERES { get; set; }
        public decimal MORA_CANCELADA { get; set; }
        public decimal NRO_SEMANA { get; set; }
        public string CUOTA_SEMANA { get; set; }
        public string TIPO { get; set; }
        public decimal IMPORTE_A_PAGAR { get; set; }
        public decimal IMPORTE_TOTAL { get; set; }
        public decimal TOTAL_CONDONACIONES { get; set; }
        public decimal INTERES_A_PAGAR { get; set; }
        public decimal CAPITAL_A_PAGAR { get; set; }
        public decimal SALDO_PLAN { get; set; }
        public string LOGIN_USR { get; set; }
        public DateTime FECHA_PAGO { get; set; }
        public int MOVIL { get; set; }
        public string IMPORTE_LITERAL { get; set; }
        public string PLAZO_CREDITO { get; set; }
        public DateTime FECHA_INI { get; set; }
        public DateTime FECHA_FIN { get; set; }
        public int CANTIDAD { get; set; }
        public int CANTIDAD_CANCELADAS { get; set; }
        public decimal SALDO { get; set; }
        public decimal AMORTIZACION { get; set; }
        public decimal? TRANSFERENCIA_INGRESO { get; set; }
        public decimal? TRANSFERENCIA_EGRESO { get; set; }
        public decimal? CAPITAL_CANCELADO { get; set; }
        public decimal? INTERES_CANCELADO { get; set; }
        public decimal? MORA_A_PAGAR { get; set; }
        public int CANCELADO { get; set; }
        public int PENDIENTE { get; set; }
        public decimal TOTAL_POR_COBRAR_G_ANT { get; set; }
        public decimal SALDO_POR_COBRAR_G_ANT { get; set; }
        public decimal CONDONACION_G_ANT { get; set; }
        public decimal TOTAL_CANCELADO_G_ANT { get; set; }
        public decimal TOTAL_MORA_G_ANT { get; set; }
        public decimal SALDO_POR_PAGAR_MORA_G_ANT { get; set; }
        public decimal TOTAL_MORA_CANCELADO_G_ANT { get; set; }
        public int DIAS_ATRASOS { get; set; }
        public decimal SALDO_CAPITAL { get; set; }

        

    }

    public class ReporteDetalleIngresos
    {
        public string DETALLE { get; set; }
        public string SUBDETALLE { get; set; }
        public string NRO_RECIBO { get; set; }
        public string SOCIO { get; set; }
        public int? NRO_MOVIL { get; set; }
        public int CANTIDAD { get; set; }
        public decimal COSTO_UNITARIO { get; set; }
        public decimal BOLIVIANOS { get; set; }
        public decimal DOLARES { get; set; }
        public DateTime FECHA_INI { get; set; }
        public DateTime FECHA_FIN { get; set; }
        public DateTime FECHA { get; set; }
        public string CAJA { get; set; }
    }

    public class ReporteHojasDetalle
    {
        public string INTERVALO { get; set; }
        public string SOCIO { get; set; } 

        public int? NRO_MOVIL { get; set; }
        public int? CANT_HOJAS_VEND { get; set; }
        public int? CANT_HOJAS_ANUL { get; set; }
        public string PRECIO { get; set; }
        public decimal? AHORRO { get; set; }
        public decimal? TOTAL { get; set; }
        public decimal? SALDO { get; set; }

        public int? NRO_MOVIL1 { get; set; }
        public int? CANT_HOJAS_VEND1 { get; set; }
        public int? CANT_HOJAS_ANUL1 { get; set; }
        public string PRECIO1 { get; set; }
        public decimal? AHORRO1 { get; set; }
        public decimal? TOTAL1 { get; set; }
    }

    public class ReporteDeudoresHojas
    {
        
        public int? NRO_MOVIL { get; set; }
        public string PRECIO { get; set; }
        public decimal? AHORRO { get; set; }
        public decimal? TOTAL { get; set; }
        public string SOCIO { get; set; }
        public decimal? HACIENDA { get; set; }
        public decimal? DEBE { get; set; }
    }


    public class ReporteDetallePrestamos
    {
        public string INTERVALO { get; set; }
        public int ID_PRESTAMO { get; set; }
        public DateTime FECHA { get; set; }
        public int MOVIL { get; set; }
        public int CANT_PAGOS { get; set; }
        public decimal? IMPORTE_PRESTAMO { get; set; }
        public decimal? IMPORTE_TOTAL { get; set; }
        public decimal? CANDELADO { get; set; }
        public DateTime? FECHA_LIMITE { get; set; }
        public string CAJA { get; set; }
        public DateTime FECHA_INI { get; set; }
        public DateTime FECHA_FIN { get; set; }
    }

    public class ReporteDetalleNumeracionHoja {
        public int INICIO { get; set; }
        public int FIN { get; set; }
        public string ANULADAS { get; set; }
        public string NO_GENERADAS { get; set; }
    }

    public class EstadoResultadoCompletoModel
    {
        public int NRO { get; set; }
        public string MES { get; set; }
        public string CAJA { get; set; }
        public string MONEDA { get; set; }
        public DateTime? FECHA_INI { get; set; }
        public DateTime? FECHA_FIN { get; set; }
        public string OPERACION { get; set; }
        public string SUBOPERACION { get; set; }
        public string DETALLE { get; set; }
        public decimal? IMPORTE { get; set; }
        public string PERIODO { get; set; }
        //public decimal UTILIDA_BRUTA_NETA { get; set; }
        //public decimal TOTAL { get; set; }

    }

    public class ReporteMatrizHojas {
        public int NRO_MOVIL { get; set; }
        public string SOCIO { get; set; }
        public string PERIODO { get; set; }
        public decimal? TOTAL { get; set; }
        public DateTime? FECHA_INI { get; set; }
    }

    public class ReportePagoPrestamo {
        
       
    }

}
