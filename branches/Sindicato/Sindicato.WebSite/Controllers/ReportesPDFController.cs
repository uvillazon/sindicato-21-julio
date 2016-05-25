﻿using Microsoft.Reporting.WebForms;
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

        public ActionResult ReporteHojas(string tipo, int ID_VENTA)
        {
            ReporteSource rep = new ReporteSource();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteHojas.rdlc");
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
            ReportDataSource reportDataSource = new ReportDataSource("DataSetHoja", rep.ReporteHoja(id_hoja));
            //int[] OrderNumbers = GetOrderNumbers();
            e.DataSources.Add(reportDataSource);
        }

        public ActionResult ReporteIngresosTotales(string tipo  ,DateTime FECHA_INI, DateTime FECHA_FIN) {
            ReporteSource rep = new ReporteSource();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteTotal.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteTotals(FECHA_INI,FECHA_FIN));
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

            //var fe = FECHA_FIN;
            //return null;
        }

        public ActionResult ReporteKardexHojaSocio(string tipo, DateTime FECHA, int ID_SOCIO_MOVIL)
        {
            ReporteSource rep = new ReporteSource();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteKardexHojaSocio.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ReporteKardexSocioHoja(FECHA, ID_SOCIO_MOVIL,"admin"));
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
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteEgresp.rdlc");
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

        public ActionResult ReporteDetalleHoja(string tipo, DateTime FECHA_INI, DateTime FECHA_FIN)
        {

            ReportesServices rep = new ReportesServices();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reportes/ReporteDetalleHoja.rdlc");
            ReportDataSource reportDataSource = new ReportDataSource("DataSet1", rep.ObtenerReporteDetalleHoja(FECHA_INI,FECHA_FIN));
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
    }
}
