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
    public class SociosController : Controller
    {
        //
        // GET: /MenuOpciones/
        private ISociosServices _serSoc;
        private IImagenesServices _serImg;
        public SociosController(ISociosServices serSoc, IImagenesServices serImg)
        {
            _serSoc = serSoc;
            _serImg = serImg;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerSociosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serSoc.ObtenerSociosPaginados(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                ID_SOCIO = x.ID_SOCIO,
                ID_MOVIL = x.ID_MOVIL,
                ID_SOCIO_MOVIL = x.ID_SOCIO_MOVIL,
                DESCRIPCION = x.DESCRIPCION,
                NRO_MOVIL = x.SD_MOVILES.NRO_MOVIL,
                FECHA_INGRESO = x.FECHA_ALTA,
                TIPO_MOVIL = x.TIPO_MOVIL,
                NRO_SOCIO = x.SD_SOCIOS.NRO_SOCIO,
                NOMBRE = x.SD_SOCIOS.NOMBRE,
                APELLIDO_MATERNO = x.SD_SOCIOS.APELLIDO_MATERNO,
                APELLIDO_PATERNO = x.SD_SOCIOS.APELLIDO_PATERNO,
                NRO_LICENCIA = x.SD_SOCIOS.NRO_LICENCIA,
                CATEGORIA_LIC = x.SD_SOCIOS.CATEGORIA_LIC,
                CI = x.SD_SOCIOS.CI,
                EXPEDIDO = x.SD_SOCIOS.EXPEDIDO,
                FECHA_NAC = x.SD_SOCIOS.FECHA_NAC,
                DOMICILIO = x.SD_SOCIOS.DOMICILIO,
                OBSERVACION = x.SD_SOCIOS.OBSERVACION,
                ESTADO_CIVIL = x.SD_SOCIOS.ESTADO_CIVIL,
                
                FECHA_BAJA = x.SD_SOCIOS.FECHA_BAJA,
                TELEFONO = x.SD_SOCIOS.TELEFONO,
                CELULAR = x.SD_SOCIOS.CELULAR,
                ID_IMG = _serImg.ConImagen(x.ID_SOCIO , "SD_SOCIOS")
                //ID_IMG = 
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        public ActionResult ObtenerSoloSociosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serSoc.ObtenerSoloSociosPaginados(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                ID_SOCIO = x.ID_SOCIO,
                SOCIO = string.Format("{0} {1} {2}",x.NOMBRE,x.APELLIDO_PATERNO,x.APELLIDO_MATERNO),
                NRO_SOCIO = x.NRO_SOCIO,
                NOMBRE = x.NOMBRE,
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

                FECHA_BAJA = x.FECHA_BAJA,
                TELEFONO = x.TELEFONO,
                CELULAR = x.CELULAR,
                ID_IMG = _serImg.ConImagen(x.ID_SOCIO, "SD_SOCIOS")
                //ID_IMG = 
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult ObtenerSocioMovil(int ID_SOCIO_MOVIL)
        {
            var socios = _serSoc.ObtenerSocioMovilPorCriterio(x=>x.ID_SOCIO_MOVIL == ID_SOCIO_MOVIL);
            var data = new {
                ID_SOCIO_MOVIL =socios.ID_SOCIO_MOVIL,
                ID_SOCIO = socios.ID_SOCIO,
                ID_MOVIL = socios.ID_MOVIL,
                FECHA_ALTA = String.Format("{0:dd/MM/yyyy}", socios.FECHA_ALTA),
                DESCRIPCION = socios.DESCRIPCION,
                OBSERVACION = socios.OBSERVACION,
                TIPO_MOVIL = socios.TIPO_MOVIL,
                NRO_MOVIL = socios.SD_MOVILES.NRO_MOVIL,
                NOMBRE = string.Format("{0} {1} {2}",socios.SD_SOCIOS.NOMBRE , socios.SD_SOCIOS.APELLIDO_PATERNO , socios.SD_SOCIOS.APELLIDO_MATERNO)
            };
            return Json(new { data = data , success = true});
        }

        [HttpGet]
        public JavaScriptResult ObtenerAutos(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var autos = _serSoc.ObtenerAutosPaginado(paginacion,filtros);
            var formatData = autos.Select(x => new
            {
                ID_MOVIL = x.ID_MOVIL,
                ID_AUTO = x.ID_AUTO,
                MOVIL = x.SD_MOVILES.NRO_MOVIL,
                MARCA = x.MARCA,
                MODELO = x.MODELO,
                TIPO = x.TIPO,
                COLOR = x.COLOR,
                DESCRIPCION = x.DESCRIPCION,
                PLACA = x.PLACA,
                MOTOR = x.MOTOR,
                FECHA_ALTA = x.FECHA_ALTA,
                ID_IMG = _serImg.ConImagen(x.ID_AUTO, "SD_AUTOS")
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        #region GuardarSocio Editar Eliminar
        [HttpPost]
        public JsonResult GuardarSocio(SD_SOCIOS socio)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serSoc.GuardarSocio(socio, id_usr);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult GuardarSocioMovil(SD_SOCIO_MOVILES socio)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serSoc.GuardarSocioMovil(socio, id_usr);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult GuardarAuto(SD_AUTOS auto)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serSoc.GuardarAutos(auto, id_usr);
            return Json(respuestaSP);
        }
        #endregion

    }
}
