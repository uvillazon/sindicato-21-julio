using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sindicato.Services.Interfaces;
using Sindicato.Common;
using System.Web.Script.Serialization;
using System.Collections;
using Sindicato.WebSite.Models;
using Sindicato.Services.Model;
using Sindicato.Model;

namespace Sindicato.WebSite.Controllers
{
    public class UsuariosController : Controller
    {
        private IUsuariosServices _serUsr;

        public UsuariosController(IUsuariosServices serUsr)
        {
            _serUsr = serUsr;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerUsuariosPaginado(PagingInfo paginacion)
        {
            var clientes = _serUsr.ObtenerUsuariosPaginados(paginacion);
            var formatData = clientes.Select(x => new
            {
                ID_USUARIO = x.ID_USUARIO,
                ID_PERFIL = x.ID_PERFIL,
                PERFIL = x.SD_PERFILES.NOMBRE,
                NOMBRE = x.NOMBRE,
                LOGIN = x.LOGIN,
                EMAIL = x.EMAIL,
                ESTADO = x.ESTADO,
                FCH_ALTA = x.FCH_ALTA
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerPerfilesPaginados(PagingInfo paginacion)
        {
            
            var perfiles = _serUsr.ObtenerPerfilesPaginados(paginacion);
            var formatData = perfiles.Select(x => new
            {
                ID_PERFIL = x.ID_PERFIL,
                NOMBRE = x.NOMBRE,
                DESCRIPCION = x.DESCRIPCION,
                ESTADO = x.ESTADO
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerMenuOpcionesPaginados(PagingInfo paginacion)
        {

            var perfiles = _serUsr.ObtenerMenuOpcionesPaginados(paginacion);
            var formatData = perfiles.Select(x => new
            {
                ID_OPC = x.ID_OPC,
                OPCION = x.OPCION,
                TOOLTIP = x.TOOLTIP,
                ESTADO = x.ESTADO
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerMenuOpcionesPorPerfil(int ID_PERFIL, PagingInfo paginacion)
        {

            var perfiles = _serUsr.ObtenerMenuOpcionesPorCriterio(x=>x.SD_PERFILES_OPCIONES.Any(y=>y.ID_PERFIL == ID_PERFIL));
            var formatData = perfiles.Select(x => new
            {
                ID_OPC = x.ID_OPC,
                OPCION = x.OPCION,
                TOOLTIP = x.TOOLTIP,
                ESTADO = x.ESTADO
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult GuardarUsuario(SD_USUARIOS a)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serUsr.SP_GrabarUsuario(a, id_usr);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult GuardarPerfil(SD_PERFILES per)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaRSP = new RespuestaSP();
            respuestaRSP = _serUsr.SP_GrabarPerfil(per, id_usr);
            return Json(respuestaRSP);
        }
      
    }
}
