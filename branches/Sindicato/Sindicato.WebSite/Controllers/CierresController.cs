using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sindicato.Services.Interfaces;
using Sindicato.Common;
using Sindicato.Services.Model;
using System.Web.Script.Serialization;
using Sindicato.Model;

namespace Sindicato.WebSite.Controllers
{
    public class CierresController : Controller
    {
        //
        // GET: /Otros/
        private ICierresServices _serCierre;
        public CierresController(ICierresServices serCierre)
        {
            this._serCierre = serCierre;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerCierresPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serCierre.ObtenerCierresPaginados(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                ID_CIERRE = x.ID_CIERRE,
                CODIGO = x.CODIGO,
                ESTADO = x.ESTADO,
                FECHA_FIN = x.FECHA_FIN,
                OBSERVACION = x.OBSERVACION,
                FECHA_INI = x.FECHA_INI,
                FECHA_REG = x.FECHA_REG,
                LOGIN = x.LOGIN

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDetalleSocioPeriodoPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serCierre.ObtenerDetalleSocioPeriodoPaginados(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                ID_CIERRE = x.ID_CIERRE,
                ID_SOCIO = x.ID_SOCIO,
                SOCIO = string.Format("{0} {1} {2}", x.SD_SOCIOS.NOMBRE, x.SD_SOCIOS.APELLIDO_PATERNO, x.SD_SOCIOS.APELLIDO_MATERNO),
                PERIODO = x.SD_CIERRES.CODIGO,
                AHORRO = x.AHORRO,
                DESCUENTOS = x.DESCUENTOS,
                DEUDA = x.DEUDA,
                INGRESOS_HOJAS = x.INGRESOS_HOJAS,
                OBLIGACIONES_INSTITUCION = x.OBLIGACIONES_INSTITUCION,
                OTRAS_OBLIGACIONES = x.OTRAS_OBLIGACIONES,
                OTROS_INGRESOS = x.OTROS_INGRESOS
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [HttpGet]
        public JsonResult ObtenerUltimoRegistro()
        {
            var cierre = _serCierre.ObtenerUltimoRegistroCierre();
            if (cierre != null)
            {
                return Json(new { disabled = true, value = String.Format("{0:dd/MM/yyyy}", cierre.FECHA_FIN.AddDays(1)) }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { disabled = false }, JsonRequestBehavior.AllowGet);
            }

        }
        [HttpPost]
        public JsonResult GuardarCierre(SD_CIERRES cierre)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCierre.GuardarCierre(cierre, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult GenerarDetalleCierre(int ID_CIERRE)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCierre.GenerarDetalleCierre(ID_CIERRE, login);
            return Json(respuestaSP);
        }
        
    }
}
