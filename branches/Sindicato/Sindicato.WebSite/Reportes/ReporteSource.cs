using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sindicato.Model;
using Sindicato.Services;
using Sindicato.Services.Interfaces;
using Sindicato.Services.Model;
namespace Sindicato.WebSite.Reportes
{
    public class ReporteSource
    {
        public IEnumerable<SocioMovilModel> ReporteSocioMovil(DateTime fecha)
        {

            IEnumerable<SocioMovilModel> result = null;
            var servicio = new SociosServices();
            var res = servicio.ObtenerSociosMoviles();
            result = res.Select(x => new SocioMovilModel()
            {
                NOMBRES = x.SD_SOCIOS.NOMBRE,
                APELLIDO_PATERNO = x.SD_SOCIOS.APELLIDO_PATERNO,
                APELLIDO_MATERNO = x.SD_SOCIOS.APELLIDO_MATERNO,
                FECHA_INGRESO = x.FECHA_ALTA,
                MOVIL = x.SD_MOVILES.NRO_MOVIL.ToString(),
                ANTIGUEDAD = this.CalcularMeses(x.FECHA_ALTA, fecha)
                //OBSERVACION = x.SD_SOCIOS.OBSERVACION
            });

            return result;
        }
        public decimal CalcularMeses(DateTime fechaComienzo, DateTime fechaFin)
        {
            fechaComienzo = fechaComienzo.Date;
            fechaFin = fechaFin.Date;
            decimal count = 0;
            while (fechaComienzo < fechaFin)
            {
                fechaComienzo = fechaComienzo.AddMonths(1);
                count++;
            }
            return count;
        }
        public IEnumerable<SocioMovilHojas> ReporteSocioMovilHoja()
        {

            IEnumerable<SocioMovilHojas> result = null;
            var servicio = new SociosServices();
            var res = servicio.ObtenerSociosMoviles();
            result = res.Select(x => new SocioMovilHojas()
            {
                NRO_MOVIL = x.SD_MOVILES.NRO_MOVIL,
                SOCIO = string.Format("{0} {1} {2}", x.SD_SOCIOS.NOMBRE, x.SD_SOCIOS.APELLIDO_PATERNO, x.SD_SOCIOS.APELLIDO_MATERNO),
                TIPO_LINEA = x.TIPO_MOVIL,
                AHORRO = BuscarImporte(x.SD_SOC_MOV_OBLIG, "AHORRO"),
                CANASTON = BuscarImporte(x.SD_SOC_MOV_OBLIG, "CANASTON"),
                INSTITUCION = BuscarImporte(x.SD_SOC_MOV_OBLIG, "INSTITUCION"),
                SEGURO = BuscarImporte(x.SD_SOC_MOV_OBLIG, "SEGURO"),
            });

            return result;
        }

        private decimal BuscarImporte(IEnumerable<SD_SOC_MOV_OBLIG> lista, string tipo)
        {
            decimal importe = 0;
            importe = lista.Count() == 0 ? 0 : lista.Where(x => x.SD_OBLIGACIONES_HOJA.OBLIGACION == tipo).Count() == 0 ? 0 : lista.First(x => x.SD_OBLIGACIONES_HOJA.OBLIGACION == tipo).IMPORTE;
            return importe;
        }

        public List<ReporteHoja> ReporteHoja(int ID_HOJA)
        {

            List<ReporteHoja> results = new List<ReporteHoja>();
            var servicio = new VentaHojasServices();
            var res = servicio.ObtenerHoja(x => x.ID_HOJA == ID_HOJA);
            ReporteHoja result = new ReporteHoja();

            result.ID_HOJA = res.ID_HOJA;
            result.FECHA_COMPRA = res.FECHA_COMPRA;
            result.MOVIL = res.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL;
            result.NUMERO = res.NRO_HOJA;
            result.OBLIGACIONES = ObtenerObligacionesDetalle(res.SD_DETALLES_HOJAS_CONTROL);
            result.PLACA = servicio.obtenerPlada(res.ID_SOCIO_MOVIL);
            result.SOCIO = string.Format("{0} {1} {2}", res.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE, res.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO, res.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO);
            results.Add(result);
            return results;
        }

        public List<ReporteHoja> ReporteHojaDetalle(int ID_DETALLE)
        {

            List<ReporteHoja> results = new List<ReporteHoja>();
            var servicio = new VentaHojasServices();
            var res = servicio.ObtenerHojaDetalleUso(x => x.ID_DETALLE == ID_DETALLE);
            ReporteHoja result = new ReporteHoja();

            result.ID_DETALLE = res.ID_DETALLE;
            result.ID_HOJA = res.ID_HOJA== null? 0 : (int)res.ID_HOJA;
            result.FECHA_COMPRA = res.SD_HOJAS_CONTROL.FECHA_COMPRA;
            result.FECHA_USO = res.FECHA_USO;
            result.MOVIL = res.SD_HOJAS_CONTROL.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL;
            result.NUMERO = res.SD_HOJAS_CONTROL.NRO_HOJA;
            result.OBLIGACIONES = ObtenerObligacionesDetalle(res.SD_HOJAS_CONTROL.SD_DETALLES_HOJAS_CONTROL);
            result.PLACA = servicio.obtenerPlada(res.SD_HOJAS_CONTROL.ID_SOCIO_MOVIL);
            result.SOCIO = string.Format("{0} {1} {2}", res.SD_HOJAS_CONTROL.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE, res.SD_HOJAS_CONTROL.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO, res.SD_HOJAS_CONTROL.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO);
            results.Add(result);
            return results;
        }

        public List<ReporteHoja> ReporteImpresionHojaDetalle(int ID_DETALLE)
        {

            List<ReporteHoja> results = new List<ReporteHoja>();
            var servicio = new VentaHojasServices();
            var res = servicio.ObtenerImpresionHojas(x => x.ID_DETALLE == ID_DETALLE);
            ReporteHoja result = new ReporteHoja();

            result.ID_DETALLE = res.ID_DETALLE;
            result.ID_HOJA = res.ID_IMPRESION == null ? 0 : (int)res.ID_IMPRESION;
            result.FECHA_COMPRA = res.SD_IMPRESION_HOJAS.FECHA;
            result.FECHA_USO = (DateTime)res.FECHA_USO;
            result.MOVIL = res.SD_IMPRESION_HOJAS.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL;
            result.NUMERO = (int)res.ID_IMPRESION;
            result.OBLIGACIONES = "-";
            result.PLACA = servicio.obtenerPlada(res.SD_IMPRESION_HOJAS.SD_SOCIO_MOVILES.ID_SOCIO_MOVIL);
            result.SOCIO = string.Format("{0} {1} {2}", res.SD_IMPRESION_HOJAS.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE, res.SD_IMPRESION_HOJAS.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO, res.SD_IMPRESION_HOJAS.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO);
            results.Add(result);
            return results;
        }

        public List<ReporteHoja> ReporteHojaDetalleRefuerzo(int ID_DETALLE)
        {

            List<ReporteHoja> results = new List<ReporteHoja>();
            var servicio = new VentaHojasServices();
            var res = servicio.ObtenerHojaDetalleUso(x => x.ID_DETALLE == ID_DETALLE);
            ReporteHoja result = new ReporteHoja();

            result.ID_DETALLE = res.ID_DETALLE;
            result.ID_HOJA = res.ID_VENTA == null ? 0 : (int)res.ID_VENTA;
            result.FECHA_COMPRA = res.SD_VENTA_HOJAS_REFUERZO.FECHA;
            result.FECHA_USO = res.FECHA_USO;
            result.PRECIO =res.SD_VENTA_HOJAS_REFUERZO.CODIGO;
            result.NUMERO = res.SD_VENTA_HOJAS_REFUERZO.ID_VENTA;
            result.PLACA = res.SD_VENTA_HOJAS_REFUERZO.PLACA;
            result.SOCIO = res.SD_VENTA_HOJAS_REFUERZO.NOMBRE;

            //result.PLACA = servicio.obtenerPlada(res.SD_HOJAS_CONTROL.ID_SOCIO_MOVIL);
            //result.SOCIO = string.Format("{0} {1} {2}", res.SD_HOJAS_CONTROL.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE, res.SD_HOJAS_CONTROL.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO, res.SD_HOJAS_CONTROL.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO);
            results.Add(result);
            return results;
        }

        //private string ObtenerObligacionesDetalle(System.Data.Objects.DataClasses.EntityCollection<SD_DETALLES_HOJAS_CONTROL> entityCollection)
        //{
        //    throw new NotImplementedException();
        //}

        public string ObtenerObligacionesDetalle(IEnumerable<SD_DETALLES_HOJAS_CONTROL> detalles)
        {

            string result = "";
            foreach (var item in detalles)
            {
                if (item.OBLIGACION == "AHORRO")
                {
                    result = string.Format("{0} Ahorro {1} Bs./", result, item.IMPORTE);
                }
                else if (item.OBLIGACION == "PRODEPORTE")
                {
                    result = string.Format("{0} Deporte {1} Bs./", result, item.IMPORTE);

                }
                else if (item.OBLIGACION == "APORTE CONTROLES")
                {
                    result = string.Format("{0} Controles {1} Bs./", result, item.IMPORTE);

                }
                else if (item.OBLIGACION == "APORTE SINDICATO")
                {
                    result = string.Format("{0} Hacienda {1} Bs./", result, item.IMPORTE);
                }
            }
            return result;
        }
        public IEnumerable<ReporteHoja> ReporteHojasVenta(int ID_VENTA)
        {

            IEnumerable<ReporteHoja> result = null;
            var servicio = new VentaHojasServices();
            var res = servicio.ObtenerHojasDetallesPorVentas(ID_VENTA);
            result = res.Select(x => new ReporteHoja()
            {
                ID_HOJA =  (int)x.ID_DETALLE
            });

            return result;
        }

         public IEnumerable<ReporteHoja> ReporteImpresionHojas(int ID_IMPRESION)
        {

            IEnumerable<ReporteHoja> result = null;
            var servicio = new VentaHojasServices();
            var res = servicio.ObtenerDetallesPorImpresiones(ID_IMPRESION);
            result = res.Select(x => new ReporteHoja()
            {
                ID_HOJA = (int)x.ID_DETALLE
            });

            return result;
        }

       

        public IEnumerable<ReporteHoja> ReporteHojasVentaRefuerzo(int ID_VENTA)
        {

            IEnumerable<ReporteHoja> result = null;
            var servicio = new VentaHojasServices();
            var res = servicio.ObtenerHojasDetallesPorVentasRefuerzos(ID_VENTA);
            result = res.Select(x => new ReporteHoja()
            {
                ID_HOJA = (int)x.ID_DETALLE
            });

            return result;
        }

        public IEnumerable<ReporteHoja> ReporteImpresionHojasVenta(int ID_IMPRESION)
        {

            IEnumerable<ReporteHoja> result = null;
            var servicio = new VentaHojasServices();
            var res = servicio.obtenerImpresion(x => x.ID_IMPRESION == ID_IMPRESION);
            var hojas = servicio.ObtenerHojasPorCriterio(x => x.ID_HOJA >= res.NRO_INICIO && x.ID_HOJA <= res.NRO_FIN && x.ESTADO == "NUEVO");
            result = hojas.Select(x => new ReporteHoja()
            {
                ID_HOJA = x.ID_HOJA
            });

            return result;
        }
        public List<ReporteTotal> ReporteTotals(DateTime FECHA_INI, DateTime FECHA_FIN)
        {

            List<ReporteTotal> result = new List<ReporteTotal>();
            var servicio = new ReportesServices();
            result = servicio.ObtenerReporteTotal(FECHA_INI, FECHA_FIN).ToList();
            return result;

        }
        public List<ReporteKardexHoja> ReporteKardexSocioHoja(DateTime FECHA, int ID_SOCIO_MOVIL, string login)
        {

            List<ReporteKardexHoja> result = new List<ReporteKardexHoja>();
            var servicio = new ReportesServices();
            result = servicio.ObtenerReporteKardexHoja(FECHA, ID_SOCIO_MOVIL, login).ToList();
            return result;

        }
        public List<ReporteRegulaciones> ReporteRegulacion(int ID_REGULACION)
        {

            List<ReporteRegulaciones> result = new List<ReporteRegulaciones>();
            //var servicio = new ReportesServices();
            //result = servicio.ObtenerReporteKardexHoja(FECHA, ID_SOCIO_MOVIL, login).ToList();
            return result;

        }
        //ObtenerHojasPorVentas
    }
}