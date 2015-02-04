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
using System.Diagnostics;
using System.IO;
using Sindicato.WebSite.Controllers.Utils;

namespace Sindicato.WebSite.Controllers
{
    public class ChoferesController : Controller
    {
        //
        // GET: /MenuOpciones/
        private IChoforesServices _serCho;
        private IImagenesServices _serImg;
        public ChoferesController(IChoforesServices serCho, IImagenesServices serImg)
        {
            _serCho = serCho;
            _serImg = serImg;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerChoferesPaginados(PagingInfo paginacion, FiltrosModel<ChoferesModel> filtros, ChoferesModel entidad)
        {
            filtros.Entidad = entidad;
            var choferes = _serCho.ObtenerChoferesPaginados(paginacion, filtros);
            var formatData = choferes.Select(x => new
            {
                ID_SOCIO = x.ID_SOCIO,
                ID_CHOFER = x.ID_CHOFER,
                NRO_CHOFER = x.NRO_CHOFER,
                NOMBRE = x.NOMBRE,
                NOMBRE_CHOFER =string.Format("{0} {1} {2}", x.NOMBRE, x.APELLIDO_PATERNO, x.APELLIDO_MATERNO),
                APELLIDO_MATERNO = x.APELLIDO_MATERNO,
                APELLIDO_PATERNO = x.APELLIDO_PATERNO,
                NRO_LICENCIA = x.NRO_LICENCIA,
                CATEGORIA_LIC = x.CATEGORIA_LIC,
                CI = x.CI,
                EXPEDIDO = x.EXPEDIDO,
                FECHA_NAC = x.FECHA_NAC,
                DOMICILIO = x.DOMICILIO,
                OBSERVACION = x.OBSERVACION,
                ESTADO_CIVIL = x.ESTADO_CIVIL,
                FECHA_INGRESO = x.FECHA_INGRESO,
                FECHA_BAJA = x.FECHA_BAJA,
                TELEFONO = x.TELEFONO,
                CELULAR = x.CELULAR,
                ID_IMG = _serImg.ConImagen(x.ID_CHOFER, "SD_CHOFERES"),
                NOMBRE_SOCIO = string.Format("{0} {1} {2}", x.SD_SOCIOS.NOMBRE, x.SD_SOCIOS.APELLIDO_PATERNO, x.SD_SOCIOS.APELLIDO_MATERNO)
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }


        #region guardarsocio editar eliminar
        [HttpPost]
        public JsonResult GuardarChofer(SD_CHOFERES chofer)
        {

            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            UploadFiles uploadFile = new UploadFiles(Request.Files);
            uploadFile.upload(Path.Combine("Choferes", chofer.CI.ToString()), "FOTO_" + chofer.ID_CHOFER);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCho.GuardarChofer(chofer, id_usr);
            return Json(respuestaSP);
        }
        #endregion


        #region Cambio de Garante
        [HttpPost]
        public JsonResult GuardarCambioGarante(SD_GARANTES garante)
        {

            string login = (User.Identity.Name.Split('-')[0]).ToString();
            //UploadFiles uploadFile = new UploadFiles(Request.Files);
            //uploadFile.upload(Path.Combine("Choferes", chofer.CI.ToString()), "FOTO_" + chofer.ID_CHOFER);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCho.GuardarGarante(garante, login);
            return Json(respuestaSP);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerGarantesPaginados(PagingInfo paginacion, FiltrosModel<ChoferesModel> filtros, ChoferesModel entidad)
        {
            filtros.Entidad = entidad;
            var choferes = _serCho.ObtenerGarantesPaginados(paginacion, filtros);
            var formatData = choferes.Select(x => new
            {
                ID_SOCIO = x.ID_SOCIO,
                ID_CHOFER = x.ID_CHOFER,
                FECHA_INI = x.FECHA_INI,
                FECHA_FIN = x.FECHA_FIN,
                OBSERVACION = x.OBSERVACION,
                ESTADO = x.ESTADO,
                LOGIN = x.LOGIN,
                SOCIO = string.Format("{0} {1} {2}", x.SD_SOCIOS.NOMBRE, x.SD_SOCIOS.APELLIDO_PATERNO, x.SD_SOCIOS.APELLIDO_MATERNO)
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        #endregion
    }
}
