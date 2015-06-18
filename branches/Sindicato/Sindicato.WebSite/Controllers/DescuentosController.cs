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
        public DescuentosController(IDescuentosServices serDesc )
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
                DESCRIPCION = x.DESCRIPCION,
                DESCUENTO = x.DESCUENTO,
                FECHA = x.FECHA,
                ID_DESCUENTO = x.ID_DESCUENTO,
                TOTAL = x.TOTAL,
                FECHA_REG = x.FECHA_REG,
                LOGIN = x.LOGIN
                
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
                ID_CIERRE = x.DETALLE,
                DESCRIPCION = x.ID_DESCUENTO,
                DESCUENTO = x.ID_DESCUENTO_SOCIO,
                FECHA = x.ID_SOCIO,
                ID_DESCUENTO = x.IMPORTE,
                LOGIN = x.LOGIN

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
       
        //[HttpPost]
        //public JsonResult GuardarCierre(SD_CIERRES cierre)
        //{
        //    string login = User.Identity.Name.Split('-')[0];
        //    RespuestaSP respuestaSP = new RespuestaSP();
        //    respuestaSP = _serCierre.GuardarCierre(cierre, login);
        //    return Json(respuestaSP);
        //}
     }
}
