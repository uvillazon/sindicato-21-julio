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
    public class MovilesController : Controller
    {
        //
        // GET: /MenuOpciones/
        private IMovilesServices _serMov;
        public MovilesController(IMovilesServices serMov)
        {
            _serMov = serMov;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerMovilesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var autos = _serMov.ObtenerMovilesPaginados(paginacion, filtros);
            var formatData = autos.Select(x => new
            {
                ID_LINEA = x.ID_LINEA,
                ID_MOVIL = x.ID_MOVIL,
                NRO_MOVIL = x.NRO_MOVIL,
                DESCRIPCION = x.DESCRIPCION,
                ESTADO = x.ESTADO,
                FECHA_ALTA = x.FECHA_ALTA,
                FECHA_BAJA = x.FECHA_BAJA,
                LOGIN_USR = x.LOGIN_USR,
                OBSERVACION = x.OBSERVACION
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
       
        [HttpPost]
        public JsonResult GuardarMovil(SD_MOVILES auto)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serMov.GuardarMovil(auto, login);
            return Json(respuestaSP);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerHistoricosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var autos = _serMov.ObtenerHistoricosPaginados(paginacion, filtros);
            var formatData = autos.Select(x => new
            {
                ID_MOVIL = x.ID_MOVIL,
                MOVIL_ANTERIOR = x.MOVIL_ANTERIOR,
                MOVIL_NUEVO = x.MOVIL_NUEVO,
                FECHA_REG = x.FECHA_REG,
                LOGIN_USR = x.LOGIN,
                OBSERVACION = x.OBSERVACION
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult GuardarCambiosMovil(int ID_MOVIL , int NRO_MOVIL , string OBSERVACION )
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serMov.GuardarCambioMovil(ID_MOVIL, NRO_MOVIL, OBSERVACION, login);
            return Json(respuestaSP);
        }
      
    }
}
