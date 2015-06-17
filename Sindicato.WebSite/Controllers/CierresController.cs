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
        [HttpPost]
        public JsonResult ObtenerUltimoRegistro()
        {
            var cierre = _serCierre.ObtenerUltimoRegistroCierre();
            if (cierre != null)
            {
                return Json(new { disabled = true, value = String.Format("{0:dd/MM/yyyy}", cierre.FECHA_FIN) });
            }
            else {
                return Json(new { disabled = false});
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
     }
}
