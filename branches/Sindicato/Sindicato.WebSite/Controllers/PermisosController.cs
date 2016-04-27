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
    public class PermisosController : Controller
    {
        //
        // GET: /MenuOpciones/
        private IPermisosServices _serPer;
        public PermisosController(IPermisosServices serPer)
        {
            _serPer = serPer;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerPermisosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var autos = _serPer.ObtenerPermisosPaginados(paginacion, filtros);
            var formatData = autos.Select(x => new
            {
                ID_PERMISO = x.ID_PERMISO,
                NRO_MOVIL = x.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                SOCIO = string.Format("{0} {1} {2}", x.SD_SOCIO_MOVILES.SD_SOCIOS.NOMBRE, x.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_PATERNO, x.SD_SOCIO_MOVILES.SD_SOCIOS.APELLIDO_MATERNO),
                CANT_HOJAS_OBLIG = x.CANT_HOJAS_OBLIG,
                ESTADO = x.ESTADO,
                FECHA_BAJA = x.FECHA_BAJA,
                FECHA_FIN = x.FECHA_FIN,
                FECHA_INI = x.FECHA_INI,
                FECHA_REG = x.FECHA_REG,
                LOGIN_USR = x.LOGIN,
                LOGIN_BAJA = x.LOGIN_BAJA,
                MOTIVO = x.MOTIVO,
                OBSERVACION = x.OBSERVACION,
                OBSERVACION_BAJA = x.OBSERVACION_BAJA,

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
      
        [HttpPost]
        public JsonResult GuardarPermiso(SD_PERMISOS permiso)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPer.GuardarPermiso(permiso,login);
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult AnularPermiso(SD_PERMISOS permiso)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPer.AnularPermiso(permiso, login);
            return Json(respuestaSP);
        }

    }
}
