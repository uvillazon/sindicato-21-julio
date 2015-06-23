using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sindicato.Services.Interfaces;
using Sindicato.Common;
using System.Web.Script.Serialization;
using Sindicato.Model;
using Sindicato.Services.Model;

namespace Sindicato.WebSite.Controllers
{
    [Authorize]
    public class VentaHojasController : Controller
    {
        private IVentaHojasServices _serven;

        public VentaHojasController(IVentaHojasServices serven)
        {
            _serven = serven;
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerFechaDisponibles(DateTime FECHA_VENTA, int ID_SOCIO_MOVIL)
        {

            var result = _serven.ObtenerFechasDisponibles(FECHA_VENTA, ID_SOCIO_MOVIL);
            return Json(result, JsonRequestBehavior.AllowGet);

        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerVentasPaginadas(PagingInfo paginacion, FiltrosModel<HojasModel> filtros, HojasModel entidad)
        {
            filtros.Entidad = entidad;
            var jsondata = _serven.ObtenerVentasPaginados(paginacion, filtros);
            var formattData = jsondata.Select(l => new
            {
                TOTAL = l.TOTAL,
                DESCUENTO = l.DESCUENTO,
                ESTADO = l.ESTADO,
                FECHA_VENTA = l.FECHA_VENTA,
                ID_SOCIO = l.ID_SOCIO_MOVIL,
                ID_VENTA = l.ID_VENTA,
                LOGIN = l.LOGIN,
                NRO_MOVIL = l.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                SOCIO  = string.Format("{0} {1} {2}",l.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE , l.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO , l.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO),
                OBSERVACION = l.OBSERVACION,
                TOTAL_HOJAS = l.TOTAL_HOJAS
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formattData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);

        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDetallesPaginadas(PagingInfo paginacion, FiltrosModel<HojasModel> filtros, HojasModel entidad)
        {
            filtros.Entidad = entidad;
            var jsondata = _serven.ObtenerDetallesPaginado(paginacion, filtros);
            var formattData = jsondata.Select(l => new
            {
                ID_DETALLE = l.ID_DETALLE ,
                FECHA_USO = l.FECHA_USO ,
                MONTO = l.MONTO,
                OBSERVACION = l.OBSERVACION
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formattData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);

        }
        [HttpPost]
        public JsonResult GuardarVenta(SD_VENTA_HOJAS venta , string detalles)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serven.GuardarVentaHoja(venta,detalles, login);
            return Json(respuestaSP);
        }
        [HttpPost, ValidateInput(false)]
        public JsonResult AnularVenta(int ID_VENTA)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serven.AnularVentaHoja(ID_VENTA, login);
            return Json(respuestaSP);
        }
      
    }
}
