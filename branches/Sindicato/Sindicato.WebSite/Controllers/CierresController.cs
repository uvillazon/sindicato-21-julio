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
        private ICierresAhorroServices _serCierre;

        public CierresController(ICierresAhorroServices serCierre)
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
                ESTADO = x.ESTADO,
                FECHA_FIN = x.FECHA_FIN,
                OBSERVACION = x.OBSERVACION,
                FECHA_INI = x.FECHA_INI,
                FECHA_REG = x.FECHA_REG,
                LOGIN = x.LOGIN,
                CODIGO = x.CODIGO

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        public ActionResult ObtenerDetallesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serCierre.ObtenerDetallesPaginados(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                ID_CIERRE = x.ID_CIERRE,
                ESTADO = x.ESTADO,
                AHORRO_HOJA = x.AHORRO_HOJA,
                AHORRO_REGULACIONES = x.AHORRO_REGULACIONES,
                CANT_HOJAS = x.CANT_HOJAS,
                CANT_REGULACIONES = x.CANT_REGULACIONES,
                FECHA_REG = x.FECHA_REG,
                ID_DETALLE = x.ID_DETALLE,
                ID_SOCIO_MOVIL = x.ID_SOCIO_MOVIL ,
                LOGIN = x.LOGIN,
                NRO_MOVIL = x.NRO_MOVIL ,
                OBSERVACION = x.OBSERVACION,
                SOCIO = x.SOCIO,
                TOTAL_AHORRO = x.TOTAL_AHORRO

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        //ObtenerDetallesPaginados

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDetalleCierreGenerado(PagingInfo paginacion, DateTime FECHA_DESDE, DateTime FECHA_HASTA)
        {
            var detalles = _serCierre.ObtenerCierreAhorroSocioMovil(FECHA_DESDE, FECHA_HASTA);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = detalles, Total = detalles.Count() }) + ");";
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
        public JsonResult GuardarCierre(SD_CIERRES cierre, string detalles)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCierre.GuardarCierre(cierre, detalles, login);
            return Json(respuestaSP);
        }
        
    }
}
