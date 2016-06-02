using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sindicato.Services.Interfaces;
using Sindicato.WebSite.Models;
using System.Web.Script.Serialization;
using Sindicato.Common;
using Sindicato.Services.Model;
using Sindicato.Model;

namespace Sindicato.WebSite.Controllers
{
    public class RegulacionesController : Controller
    {
        //
        // GET: /MenuOpciones/
        private IRegulacionesServices _serReg;
        public RegulacionesController(IRegulacionesServices serReg)
        {
            _serReg = serReg;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerRegulacionesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var autos = _serReg.ObtenerRegulacionesPaginados(paginacion, filtros);
            var formatData = autos.Select(x => new
            {
                ID_REGULACION = x.ID_REGULACION,
                NRO_MOVIL = x.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                SOCIO = string.Format("{0} {1} {2}", x.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE, x.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO, x.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO),
                CANTIDAD = x.CANTIDAD,
                ESTADO = x.ESTADO,
                MES = x.MES,
                MONTO = x.MONTO,
                FECHA_REG = x.FECHA_REG,
                LOGIN_USR = x.LOGIN,
                OBSERVACION = x.OBSERVACION,
                FECHA_COMPRA = x.FECHA_COMPRA

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDetallesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var autos = _serReg.ObtenerDetalleRegulacionesPaginados(paginacion, filtros);
            var formatData = autos.Select(x => new
            {
                ID_DETALLE = x.ID_DETALLE,
                OBLIGACION = x.OBLIGACION,
                IMPORTE = x.IMPORTE,
                CAJA = x.SD_CAJAS.NOMBRE,
                FECHA_REG = x.FECHA_REG,
                LOGIN_USR = x.LOGIN
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
      
        [HttpPost]
        public JsonResult GuardarRegulacion(SD_REGULARIZACIONES regulacion, string detalles)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serReg.GuardarRegulaciones(regulacion, login);
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult AnularRegulacion(SD_REGULARIZACIONES regulacion)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serReg.AnularRegulacion(regulacion, login);
            return Json(respuestaSP);
        }

    }
}
