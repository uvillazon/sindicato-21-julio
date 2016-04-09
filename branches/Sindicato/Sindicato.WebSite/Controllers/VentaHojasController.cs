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
        public ActionResult ObtenerVentasPaginadas(PagingInfo paginacion, FiltrosModel<HojasModel> filtros, HojasModel entidad)
        {
            filtros.Entidad = entidad;
            var jsondata = _serven.ObtenerVentasPaginados(paginacion, filtros);
            var formattData = jsondata.Select(l => new
            {
                NUMERO = l.ID_HOJA,
                ID_HOJA = l.ID_HOJA,
                NRO_HOJA = l.NRO_HOJA,
                NRO_MOVIL = l.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                SOCIO = string.Format("{0} {1} {2}", l.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE, l.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO, l.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO),
                ESTADO = l.ESTADO,
                FECHA_COMPRA = l.FECHA_COMPRA,
                FECHA_USO = l.FECHA_USO,
                FECHA_REG = l.FECHA_REG,
                ID_SOCIO = l.ID_SOCIO_MOVIL,
                LOGIN = l.LOGIN,
                MONTO = l.MONTO,
                OBSERVACION = l.OBSERVACION
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
                ID_DETALLE = l.ID_DETALLE,
                OBLIGACION = l.OBLIGACION,
                MONTO = l.IMPORTE
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formattData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);

        }
        [HttpPost]
        public JsonResult GuardarVenta(SD_HOJAS_CONTROL venta, int CANTIDAD)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serven.GuardarVentaHoja(venta, CANTIDAD, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult Reimprimir(SD_IMPRESIONES venta)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serven.Reimprimir(venta, login);
            return Json(respuestaSP);
        }
        
        [HttpPost, ValidateInput(false)]
        public JsonResult AnularVenta(int ID_HOJA)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serven.AnularVentaHoja(ID_HOJA, login);
            return Json(respuestaSP);
        }

    }
}
