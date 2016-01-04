using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sindicato.WebSite.Reportes;

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
    }
}
