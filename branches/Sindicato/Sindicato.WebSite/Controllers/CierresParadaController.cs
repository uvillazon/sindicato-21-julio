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
    public class CierresParadaController : Controller
    {
        //
        // GET: /Otros/
        private IParadasServices _serParada;
        public CierresParadaController(IParadasServices serParada)
        {
            this._serParada = serParada;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerCierresParadasPaginados(PagingInfo paginacion, FiltrosModel<ParadasModel> filtros, ParadasModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serParada.ObtenerCierresParadasPaginados(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                ID_CIERRE = x.ID_CIERRE,
                ESTADO = x.ESTADO,
                FECHA_FIN = x.FECHA_FIN,
                OBSERVACION = x.OBSERVACION,
                FECHA_INI = x.FECHA_INI,
                FECHA_REG = x.FECHA_REG,
                LOGIN = x.LOGIN,
                IMPORTE_TOTAL = x.IMPORTE_TOTAL,
                PARADA = x.SD_PARADAS.NOMBRE
                
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDetallesCierreParadaPaginados(PagingInfo paginacion, FiltrosModel<ParadasModel> filtros, ParadasModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serParada.ObtenerDetallesCierreParadaPaginados(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                ID_CIERRE = x.ID_CIERRE,
                DETALLE = x.DETALLE,
                EGRESO = x.EGRESO,
                INGRESO = x.INGRESO,
                ID_DETALLE = x.ID_DETALLE

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpGet]
        public JsonResult ObtenerUltimoRegistro()
        {
            var cierre = _serParada.ObtenerUltimoRegistroCierre();
            if (cierre != null)
            {
                return Json(new { disabled = true, value = String.Format("{0:dd/MM/yyyy}", cierre.FECHA_FIN.AddDays(1)) },JsonRequestBehavior.AllowGet);
            }
            else {
                return Json(new { disabled = false},JsonRequestBehavior.AllowGet);
            }
            
        }
        [HttpPost]
        public JsonResult GuardarCierre(SD_CIERRES_PARADA cierre,string detalles)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serParada.GuardarCierre(cierre, detalles, login);
            return Json(respuestaSP);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDetalleCierreParada(PagingInfo paginacion , int ID_PARADA, DateTime FECHA_DESDE, DateTime FECHA_HASTA)
        {
            var detalles = _serParada.ObtenerDetalleCierreParada(ID_PARADA, FECHA_DESDE, FECHA_HASTA);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = detalles, Total = detalles.Count() }) + ");";
            return JavaScript(callback1);
        }
     }
}
