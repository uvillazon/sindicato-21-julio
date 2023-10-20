using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sindicato.WebSite.Reportes;
using Sindicato.Services;

namespace Elfec.SisMan.Presentacion.Controllers
{
    [Authorize]
    public class ReportesPDFController : Controller
    {
        //
        // GET: /ReportesPDF/


        public ActionResult ReporteSocioMovilHoja(string tipo)
        {
            ReporteSource rep = new ReporteSource();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteSocioMovilHoja.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteSocioMovilHoja());
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        //public ActionResult ReporteHoja(string tipo)
        //{
        //    ReporteSource rep = new ReporteSource();
        //    LocalReport localReport = new LocalReport();
        //    localReport.ReportPath = Server.MapPath("~/Reportes/Hoja.rdlc");
        //    ReportDataSource reportDataSource = new ReportDataSource("DataSetHoja", rep.ReporteSocioMovilHoja());
        //    localReport.DataSources.Add(reportDataSource);
        //    string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
        //    string mimeType;
        //    string encoding;
        //    string fileNameExtension;
        //    string deviceInfo = string.Empty;
        //    Warning[] warnings = new Warning[1];
        //    string[] streams = new string[1];
        //    Byte[] renderedBytes;
        //    //Render the report
        //    renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
        //    return File(renderedBytes, mimeType);
        //}

        //public ActionResult ReporteHojas(string tipo, int ID_VENTA)
        //{
        //    ReporteSource rep = new ReporteSource();
        //    LocalReport localReport = new LocalReport();
        //    localReport.ReportPath = Server.MapPath("~/Reportes/ReporteHojas.rdlc");
        //    ReportDataSource reportDataSource = new ReportDataSource("DataSetVenta", rep.ReporteHojasVenta(ID_VENTA));
        //    localReport.DataSources.Add(reportDataSource);
        //    localReport.SubreportProcessing += new SubreportProcessingEventHandler(ReporteHoja_SubreportProcessing);


        //    string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
        //    string mimeType;
        //    string encoding;
        //    string fileNameExtension;
        //    string deviceInfo = string.Empty;
        //    Warning[] warnings = new Warning[1];
        //    string[] streams = new string[1];
        //    Byte[] renderedBytes;
        //    //Render the report
        //    renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
        //    //Response.AddHeader("content-disposition", "attachment; filename=ReporteHojas." + fileNameExtension);
        //    //return File(renderedBytes, mimeType);
        //    return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        //}
        public ActionResult ReporteHojas(string tipo, int ID_VENTA)
        {
            ReporteSource rep = new ReporteSource();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteHojasDetalle.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSetVenta", rep.ReporteHojasVenta(ID_VENTA));
            localReport.DataSources.Add(reportDataSource);
            localReport.SubreportProcessing += new SubreportProcessingEventHandler(ReporteHoja_SubreportProcessing);


            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            //Response.AddHeader("content-disposition", "attachment; filename=ReporteHojas." + fileNameExtension);
            //return File(renderedBytes, mimeType);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteImpresionHojas(string tipo, int ID_IMPRESION)
        {
            ReporteSource rep = new ReporteSource();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteHojasDetalle.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSetVenta", rep.ReporteImpresionHojas(ID_IMPRESION));
            localReport.DataSources.Add(reportDataSource);
            localReport.SubreportProcessing += new SubreportProcessingEventHandler(ReporteImpresionHoja_SubreportProcessing);


            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            //Response.AddHeader("content-disposition", "attachment; filename=ReporteHojas." + fileNameExtension);
            //return File(renderedBytes, mimeType);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }
        public ActionResult ReporteReImpresion(string tipo, int ID_IMPRESION)
        {
            ReporteSource rep = new ReporteSource();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteHojas.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSetVenta", rep.ReporteImpresionHojasVenta(ID_IMPRESION));
            localReport.DataSources.Add(reportDataSource);
            localReport.SubreportProcessing += new SubreportProcessingEventHandler(ReporteHoja_SubreportProcessing);


            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            //Response.AddHeader("content-disposition", "attachment; filename=ReporteHojas." + fileNameExtension);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
            //return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }
        protected void ReporteHoja_SubreportProcessing(object sender, SubreportProcessingEventArgs e)
        {
            ReporteSource rep = new ReporteSource();
            int id_hoja = int.Parse(e.Parameters["ID_HOJA"].Values.First());
            ReportDataSource reportDataSource = new ReportDataSource("DataSetHoja", rep.ReporteHojaDetalle(id_hoja));
            //int[] OrderNumbers = GetOrderNumbers();
            e.DataSources.Add(reportDataSource);
        }

        protected void ReporteImpresionHoja_SubreportProcessing(object sender, SubreportProcessingEventArgs e)
        {
            ReporteSource rep = new ReporteSource();
            int id_hoja = int.Parse(e.Parameters["ID_HOJA"].Values.First());
            ReportDataSource reportDataSource = new ReportDataSource("DataSetHoja", rep.ReporteImpresionHojaDetalle(id_hoja));
            //int[] OrderNumbers = GetOrderNumbers();
            e.DataSources.Add(reportDataSource);
        }

        public ActionResult ReporteIngresosTotales(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReporteSource rep = new ReporteSource();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteTotal.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteTotals(FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            localReport.SubreportProcessing += new SubreportProcessingEventHandler(ReporteTotal_SubreportProcessing);
            //localReport.SubreportProcessing += new SubreportProcessingEventHandler(ReporteTotalNumeracion_SubreportProcessing);


            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            //Response.AddHeader("content-disposition", "attachment; filename=ReporteHojas." + fileNameExtension);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));

            //var fe = FECHA_FIN;
            //return null;
        }

        protected void ReporteTotal_SubreportProcessing(object sender, SubreportProcessingEventArgs e)
        {
            ReportesServices rep = new ReportesServices();
            DateTime FECHA_INI = DateTime.Parse(e.Parameters["FECHA_INI"].Values.First());
            DateTime FECHA_FIN = DateTime.Parse(e.Parameters["FECHA_FIN"].Values.First());

            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteResumenHojas(FECHA_INI, FECHA_FIN));
            ReportDataSource reportDataSource1 = new ReportDataSource("DataSet2", rep.ReporteDetalleNumeracionHojas(FECHA_INI, FECHA_FIN));

            //int[] OrderNumbers = GetOrderNumbers();
            e.DataSources.Add(reportDataSource);
            e.DataSources.Add(reportDataSource1);
        }
        protected void ReporteTotalNumeracion_SubreportProcessing(object sender, SubreportProcessingEventArgs e)
        {
            ReportesServices rep = new ReportesServices();
            DateTime FECHA_INI = DateTime.Parse(e.Parameters["FECHA_INI"].Values.First());
            DateTime FECHA_FIN = DateTime.Parse(e.Parameters["FECHA_FIN"].Values.First());

            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteDetalleNumeracionHojas(FECHA_INI, FECHA_FIN));
            //int[] OrderNumbers = GetOrderNumbers();
            e.DataSources.Add(reportDataSource);
        }

        public ActionResult ReporteKardexHojaSocio(string tipo, DateTime FECHA, int ID_SOCIO_MOVIL)
        {
            ReporteSource rep = new ReporteSource();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteKardexHojaSocio.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteKardexSocioHoja(FECHA, ID_SOCIO_MOVIL, "admin"));
            localReport.DataSources.Add(reportDataSource);
            localReport.SubreportProcessing += new SubreportProcessingEventHandler(ReporteHoja_SubreportProcessing);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }
        public ActionResult ReporteRegulacion(string tipo, int ID_REGULACION)
        {

            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteRegulacion.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteRegulacion(ID_REGULACION));
            localReport.DataSources.Add(reportDataSource);
            localReport.SubreportProcessing += new SubreportProcessingEventHandler(ReporteHoja_SubreportProcessing);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }
        public ActionResult ReporteIngreso(string tipo, int ID_INGRESO)
        {

            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteIngreso.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteIngreso(ID_INGRESO));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }
        public ActionResult ReporteEgreso(string tipo, int ID_EGRESO)
        {

            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteEgreso.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteEgreso(ID_EGRESO));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteOtroIngreso(string tipo, int ID_INGRESO)
        {

            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteOtroIngreso.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteOtroIngreso(ID_INGRESO));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteDetalleHoja(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {

            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteDetalleHoja.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteDetalleHoja(FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteSociosMovilesActivos(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {

            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteSociosMovilesActivos.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteSociosMovilesPorFecha(FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteDetalleCierreAhorro(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            CierresAhorroServices rep = new CierresAhorroServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteCierreAhorro.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerCierreAhorroSocioMovil(FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            //Render the report
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }


        public ActionResult ReporteRetiro(string tipo, int ID_RETIRO)
        {

            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteRetiro.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteRetiro(ID_RETIRO));
            localReport.DataSources.Add(reportDataSource);
            localReport.SubreportProcessing += new SubreportProcessingEventHandler(ReporteHoja_SubreportProcessing);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReportePrestamo(string tipo, int ID_PRESTAMO)
        {

            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReportePrestamo.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReportePrestamo(ID_PRESTAMO));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReportePagoPrestamo(string tipo, int ID_PAGO)
        {

            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReportePagoPrestamo.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerPago(ID_PAGO));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteIngresosDetalle(string tipo, string CONDICION ,DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteIngresosDetalle.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteIngresoDetalle(CONDICION ,FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        

        public ActionResult ReporteIngresosPorCategoria(string tipo,  string CATEGORIA, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteIngresosPorCategoria.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteIngresoPorCategoria(CATEGORIA, FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            ReportParameter param = new ReportParameter("categoria", CATEGORIA);
            localReport.SetParameters(param);

            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteIngresosEgresosPorCategoria(string tipo, string CATEGORIA, string CATEGORIA_EGRESO, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteIngresosPorCategoriaSinAgrupar.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteIngresoPorCategoria(CATEGORIA, FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            ReportDataSource reportDataSource2 = new ReportDataSource("DataSet2", rep.ObtenerReporteEgresosPorCategoria(CATEGORIA_EGRESO, FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource2);

            
            ReportParameter param = new ReportParameter("categoria", CATEGORIA);
            ReportParameter param2 = new ReportParameter("categoria_egreso", CATEGORIA_EGRESO);
            localReport.SetParameters(param);
            localReport.SetParameters(param2);

            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteIngresosDetallePorCaja(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN , string CONDICION = "")
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteIngresosDetallePorCaja.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteIngresoDetalle(CONDICION, FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteEgresosDetalle(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteEgresosDetalle.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteEgresosDetalle(FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteEgresosPorCategoria(string tipo,string CATEGORIA, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteEgresosPorCategoria.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteEgresosPorCategoria(CATEGORIA, FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            ReportParameter param = new ReportParameter("categoria", CATEGORIA);
            localReport.SetParameters(param);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteDiarioHoja(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteDiarioHoja.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteDetalleHojas(FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }
        public ActionResult ReporteDiarioRegularizadas(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteDiarioHojaRegularizadas.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteDetalleHojasRegularizadas(FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReportePrestamosPagosDetalle(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReportePrestamosPagosDetalle.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReportePrestamosDetalle(FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string Intervalo = string.Format("{0} - {1}", FECHA_INI.ToString("dd/MM/yyyy"), FECHA_FIN.ToString("dd/MM/yyyy"));

            ReportParameter param = new ReportParameter("Intervalo", Intervalo);
            localReport.SetParameters(param);

            ReportDataSource reportDataSource1 = new ReportDataSource("DataSet2", rep.ObtenerReportePrestamosPagosDetalle(FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource1);

            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReportePrestamosTotales(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteTotalPrestamosV1.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteTotalPrestamos(FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReportePrestamosTotalesV2(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteTotalPrestamosV2.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteTotalPrestamosV2(FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteDeudoresCoperativa(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteDeudores.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteDeudores(FECHA_INI));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }
        public ActionResult ReporteDeudoresCoperativaCouta(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteDeudoresCouta.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteDeudoresCuotas(FECHA_INI));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteDeudoresHoja(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteDeudoresHoja.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteDeudoresHojas(FECHA_INI));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteDetalleHojasPorSocio(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN, int ID_SOCIO_MOVIL)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteDetalleHojaPorSocio.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteDetalleHojaPorSocio(FECHA_INI, FECHA_FIN, ID_SOCIO_MOVIL));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteAhorrosCobros(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteAhorrosCobros.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteAhorrosCobros(FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteEstadoResultadoPorCaja(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN, int ID_CAJA)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteEstadoResultadoPorCaja.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteEstadoResultadoPorCaja(ID_CAJA, FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteEstadoResultadoDetallePorCaja(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN, int ID_CAJA)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteEstadoResultadoPorCaja.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteEstadoResultadoDetallePorCaja(ID_CAJA, FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteEstadoResultadoPorMoneda(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN, string MONEDA)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteEstadoResultadoPorMoneda.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteEstadoResultadoPorMoneda(MONEDA, FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteMatrizHojas(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN, string Reporte = "AHORRO")
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteMatrizHojas.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteMatrizHojasAhorro(FECHA_INI, FECHA_FIN, Reporte));
            localReport.DataSources.Add(reportDataSource);
            string Intervalo = string.Format("{0} - {1}", FECHA_INI.ToString("dd/MM/yyyy"), FECHA_FIN.ToString("dd/MM/yyyy"));
            ReportParameter param = new ReportParameter("Intervalo", Intervalo);
            ReportParameter param1 = new ReportParameter("titulo", "AHORRO");
            localReport.SetParameters(param);
            localReport.SetParameters(param1);

            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }
        public ActionResult ReporteMatrizHojasCancelado(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN, string Reporte = "CANCELADO")
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteMatrizHojas.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteMatrizHojasAhorro(FECHA_INI, FECHA_FIN, Reporte));
            localReport.DataSources.Add(reportDataSource);
            string Intervalo = string.Format("{0} - {1}", FECHA_INI.ToString("dd/MM/yyyy"), FECHA_FIN.ToString("dd/MM/yyyy"));
            ReportParameter param = new ReportParameter("Intervalo", Intervalo);
            ReportParameter param1 = new ReportParameter("titulo", "AHORRO CANCELADO");
            localReport.SetParameters(param);
            localReport.SetParameters(param1);

            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }
        public ActionResult ReporteMatrizHojasDebe(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN, string Reporte = "DEBE")
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteMatrizHojas.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteMatrizHojasAhorro(FECHA_INI, FECHA_FIN, Reporte));
            localReport.DataSources.Add(reportDataSource);
            string Intervalo = string.Format("{0} - {1}", FECHA_INI.ToString("dd/MM/yyyy"), FECHA_FIN.ToString("dd/MM/yyyy"));
            ReportParameter param = new ReportParameter("Intervalo", Intervalo);
            ReportParameter param1 = new ReportParameter("titulo", "AHORRO/DEBE");
            localReport.SetParameters(param);
            localReport.SetParameters(param1);

            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReportePagoDeuda(string tipo, int ID_DETALLE)
        {

            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReportePagoDeuda.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReportePagoDeuda(ID_DETALLE));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReportePagoDeudaDiaNoTrabajado(string tipo, int ID_DETALLE)
        {

            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReportePagoDeuda.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReportePagoDeudaDiaNoTrabajado(ID_DETALLE));
            localReport.DataSources.Add(reportDataSource);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        public ActionResult ReporteVentaRefuerzo(string tipo, int ID_VENTA)
        {
            ReporteSource rep = new ReporteSource();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteHojasRefuerzoDetalle.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSetVenta", rep.ReporteHojasVentaRefuerzo(ID_VENTA));
            localReport.DataSources.Add(reportDataSource);
            localReport.SubreportProcessing += new SubreportProcessingEventHandler(ReporteRefuerzo_SubreportProcessing);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }

        protected void ReporteRefuerzo_SubreportProcessing(object sender, SubreportProcessingEventArgs e)
        {
            ReporteSource rep = new ReporteSource();
            int id_hoja = int.Parse(e.Parameters["ID_HOJA"].Values.First());
            ReportDataSource reportDataSource = new ReportDataSource("DataSetHoja", rep.ReporteHojaDetalleRefuerzo(id_hoja));
            //int[] OrderNumbers = GetOrderNumbers();
            e.DataSources.Add(reportDataSource);
        }
        //
        public ActionResult ReporteKardexSocioMovil(string tipo, int ID_SOCIO_MOVIL)
        {

            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteKardexSocioMovil.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteKardexMovilSocio(ID_SOCIO_MOVIL));
            localReport.DataSources.Add(reportDataSource);
            ReportDataSource reportDataSource2 = new ReportDataSource("DataSet2", rep.ReporteKardexMovil(ID_SOCIO_MOVIL));
            localReport.DataSources.Add(reportDataSource2);
            ReportDataSource reportDataSource3 = new ReportDataSource("DataSet3", rep.ReporteKardexNroMovil(ID_SOCIO_MOVIL));
            localReport.DataSources.Add(reportDataSource3);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }
        //ReporteIngresosEgresosCategoria

      

        public ActionResult ReporteIngresosEgresosCategoria(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {
            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteIngresosEgresosCategoria.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteTotalIngresosCategorias( FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource);
            ReportDataSource reportDataSource2 = new ReportDataSource("DataSet2", rep.ObtenerReporteTotalEgresosCategorias(FECHA_INI, FECHA_FIN));
            localReport.DataSources.Add(reportDataSource2);
            string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = string.Empty;
            Warning[] warnings = new Warning[1];
            string[] streams = new string[1];
            Byte[] renderedBytes;
            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));


            //ReportesServices rep = new ReportesServices();
            //LocalReport localReport = new LocalReport();
            //localReport.ReportPath = Server.MapPath("~/Reportes/ReporteKardexSocioMovil.rdlc");
            //ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteKardexMovilSocio(ID_SOCIO_MOVIL));
            //localReport.DataSources.Add(reportDataSource);
            //ReportDataSource reportDataSource2 = new ReportDataSource("DataSet2", rep.ReporteKardexMovil(ID_SOCIO_MOVIL));
            //localReport.DataSources.Add(reportDataSource2);
            //ReportDataSource reportDataSource3 = new ReportDataSource("DataSet3", rep.ReporteKardexNroMovil(ID_SOCIO_MOVIL));
            //localReport.DataSources.Add(reportDataSource3);
            //string reportType = tipo == "excel" ? "Excel" : tipo == "pdf" ? "pdf" : "Word";
            //string mimeType;
            //string encoding;
            //string fileNameExtension;
            //string deviceInfo = string.Empty;
            //Warning[] warnings = new Warning[1];
            //string[] streams = new string[1];
            //Byte[] renderedBytes;
            //renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            //return File(renderedBytes, mimeType, string.Format("{0}.{1}", System.Reflection.MethodBase.GetCurrentMethod().Name, fileNameExtension));
        }
    }
}
