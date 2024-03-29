﻿using System;
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
    public class DescuentosController : Controller
    {
        //
        // GET: /Otros/
        private IDescuentosServices _serDesc;
        public DescuentosController(IDescuentosServices serDesc)
        {
            this._serDesc = serDesc;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDescuentosPaginados(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros, OtrosModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serDesc.ObtenerDescuentosPaginados(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                ID_CIERRE = x.ID_CIERRE,
                PERIODO = x.SD_CIERRES.CODIGO,
                DESCRIPCION = x.DESCRIPCION,
                DESCUENTO = x.DESCUENTO,
                FECHA = x.FECHA,
                ID_DESCUENTO = x.ID_DESCUENTO,
                TOTAL = x.TOTAL,
                FECHA_REG = x.FECHA_REG,
                LOGIN = x.LOGIN,
                ESTADO = x.ESTADO

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDetalleDescuentosPaginados(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros, OtrosModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serDesc.ObtenerDetalleDescuentos(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                DETALLE = x.DETALLE,
                ID_DESCUENTO = x.ID_DESCUENTO,
                ID_DESCUENTO_SOCIO = x.ID_DESCUENTO_SOCIO,
                ID_SOCIO = x.ID_SOCIO,
                IMPORTE = x.IMPORTE,
                LOGIN = x.LOGIN,
                DESCUENTO = x.SD_DESCUENTOS.DESCUENTO,
                SOCIO = string.Format("{0} {1} {2}", x.SD_SOCIOS.NOMBRE, x.SD_SOCIOS.APELLIDO_PATERNO, x.SD_SOCIOS.APELLIDO_MATERNO)

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult GenerarDescuentos(SD_DESCUENTOS desc, decimal? IMPORTE_TOTAL, decimal? IMPORTE_SOCIO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serDesc.GenerarDescuentos(desc, IMPORTE_SOCIO, IMPORTE_TOTAL, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult ObtenerTotal(int ID_DESCUENTO)
        {
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serDesc.CalcularSaldo(ID_DESCUENTO);
            return Json(respuestaSP, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GuardarDetalle(SD_DESCUENTOS_SOCIO det)
        {
            RespuestaSP respuestaSP = new RespuestaSP();
            string login = User.Identity.Name.Split('-')[0];
            respuestaSP = _serDesc.GuardarDetalle(det, login);
            return Json(respuestaSP, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GuardarDescuento(SD_DESCUENTOS desc)
        {
            RespuestaSP respuestaSP = new RespuestaSP();
            string login = User.Identity.Name.Split('-')[0];
            respuestaSP = _serDesc.GuardarDescuento(desc, login);
            return Json(respuestaSP, JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]
        public JsonResult AnularAprobarDebitoDecuento(int ID_DESCUENTO, string ACCION, string OBSERVACION, int? ID_CAJA)
        {
            RespuestaSP respuestaSP = new RespuestaSP();
            string login = User.Identity.Name.Split('-')[0];
            respuestaSP = _serDesc.AprobarAnularDebitoDescuento(ID_DESCUENTO, ACCION, OBSERVACION, ID_CAJA, login);
            return Json(respuestaSP, JsonRequestBehavior.AllowGet);
        }
    }
}
