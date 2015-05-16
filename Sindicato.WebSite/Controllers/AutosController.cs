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
    public class AutosController : Controller
    {
        //
        // GET: /MenuOpciones/
        private IAutosServices _serAut;
        private IImagenesServices _serImg;
        public AutosController(IAutosServices serAut, IImagenesServices serImg)
        {
            _serAut = serAut;
            _serImg = serImg;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerAutosPaginados(PagingInfo paginacion, FiltrosModel<AutosModel> filtros, AutosModel entidad)
        {
            filtros.Entidad = entidad;
            var autos = _serAut.ObtenerAutosPaginados(paginacion, filtros);
            var formatData = autos.Select(x => new
            {
                ID_AUTO = x.ID_AUTO,
                CHASIS = x.CHASIS,
                COLOR = x.COLOR,
                DESCRIPCION = x.DESCRIPCION,
                FECHA_ALTA = x.FECHA_ALTA,
                LOGIN_USR = x.LOGIN_USR,
                MARCA = x.MARCA,
                MODELO = x.MODELO,
                MOTOR = x.MOTOR,
                PLACA = x.PLACA,
                TIPO = x.TIPO,
                TIPO_ACTUAL = x.SD_SOCIO_MOVIL_AUTOS.Count()> 0 ? x.SD_SOCIO_MOVIL_AUTOS.First(y => y.ESTADO == "ACTIVO").TIPO : "NINGUNO",
                MOVIL_ACTUAL = x.SD_SOCIO_MOVIL_AUTOS.Count() > 0 ? x.SD_SOCIO_MOVIL_AUTOS.First(y => y.ESTADO == "ACTIVO").SD_SOCIO_MOVILES.NRO_MOVIL.ToString() : "NO TIENE MOVIL",
                ID_IMG = _serImg.ConImagen(x.ID_AUTO, "SD_AUTOS")
                //ID_IMG = 
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult GuardarAuto(SD_AUTOS auto)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serAut.GuardarAuto(auto,login);
            return Json(respuestaSP);
        }
        //    public ActionResult ObtenerSoloSociosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        //    {
        //        filtros.Entidad = entidad;
        //        var socios = _serSoc.ObtenerSoloSociosPaginados(paginacion, filtros);
        //        var formatData = socios.Select(x => new
        //        {
        //            ID_SOCIO = x.ID_SOCIO,
        //            SOCIO = string.Format("{0} {1} {2}",x.NOMBRE,x.APELLIDO_PATERNO,x.APELLIDO_MATERNO),
        //            NRO_SOCIO = x.NRO_SOCIO,
        //            NOMBRE = x.NOMBRE,
        //            APELLIDO_MATERNO = x.APELLIDO_MATERNO,
        //            APELLIDO_PATERNO = x.APELLIDO_PATERNO,
        //            NRO_LICENCIA = x.NRO_LICENCIA,
        //            CATEGORIA_LIC = x.CATEGORIA_LIC,
        //            CI = x.CI,
        //            EXPEDIDO = x.EXPEDIDO,
        //            FECHA_NAC = x.FECHA_NAC,
        //            DOMICILIO = x.DOMICILIO,
        //            OBSERVACION = x.OBSERVACION,
        //            ESTADO_CIVIL = x.ESTADO_CIVIL,

        //            FECHA_BAJA = x.FECHA_BAJA,
        //            TELEFONO = x.TELEFONO,
        //            CELULAR = x.CELULAR,
        //            ESTADO = x.ESTADO,
        //            ID_IMG = _serImg.ConImagen(x.ID_SOCIO, "SD_SOCIOS")
        //            //ID_IMG = 
        //        });
        //        JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
        //        string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
        //        return JavaScript(callback1);
        //    }
        //    [HttpPost]
        //    public JsonResult ObtenerSocioMovil(int ID_SOCIO_MOVIL)
        //    {
        //        var socios = _serSoc.ObtenerSocioMovilPorCriterio(x=>x.ID_SOCIO_MOVIL == ID_SOCIO_MOVIL);
        //        var data = new {
        //            ID_SOCIO_MOVIL =socios.ID_SOCIO_MOVIL,
        //            ID_SOCIO = socios.ID_SOCIO,
        //            ID_MOVIL = socios.ID_MOVIL,
        //            FECHA_ALTA = String.Format("{0:dd/MM/yyyy}", socios.FECHA_ALTA),
        //            DESCRIPCION = socios.DESCRIPCION,
        //            OBSERVACION = socios.OBSERVACION,
        //            TIPO_MOVIL = socios.TIPO_MOVIL,
        //            NRO_MOVIL = socios.SD_MOVILES.NRO_MOVIL,
        //            NOMBRE = string.Format("{0} {1} {2}",socios.SD_SOCIOS.NOMBRE , socios.SD_SOCIOS.APELLIDO_PATERNO , socios.SD_SOCIOS.APELLIDO_MATERNO)
        //        };
        //        return Json(new { data = data , success = true});
        //    }

        //    [HttpGet]
        //    public JavaScriptResult ObtenerAutosSocios(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        //    {
        //        filtros.Entidad = entidad;
        //        var autos = _serSoc.ObtenerAutosSocioPaginado(paginacion, filtros);
        //        var formatData = autos.Select(x => new
        //        {
        //            ID_AUTO = x.SD_AUTOS.ID_AUTO,
        //            ID_SOCIO_MOVIL = x.ID_SOCIO_MOVIL,
        //            MARCA = x.SD_AUTOS.MARCA,
        //            MODELO = x.SD_AUTOS.MODELO,
        //            TIPO = x.TIPO,
        //            COLOR = x.SD_AUTOS.COLOR,
        //            DESCRIPCION = x.SD_AUTOS.DESCRIPCION,
        //            PLACA = x.SD_AUTOS.PLACA,
        //            MOTOR = x.SD_AUTOS.MOTOR,
        //            FECHA_ALTA = x.FECHA_ALTA,

        //            ID_IMG = _serImg.ConImagen(x.ID_AUTO, "SD_AUTOS")
        //        });
        //        JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
        //        string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
        //        return JavaScript(callback1);
        //    }

        //    #region GuardarSocio Editar Eliminar
        //    [HttpPost]
        //    public JsonResult GuardarSocio(SD_SOCIOS socio)
        //    {
        //        int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
        //        RespuestaSP respuestaSP = new RespuestaSP();
        //        respuestaSP = _serSoc.GuardarSocio(socio, id_usr);
        //        return Json(respuestaSP);
        //    }
        //    [HttpPost]
        //    public JsonResult GuardarSocioMovil(SD_SOCIO_MOVILES socio)
        //    {
        //        int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
        //        RespuestaSP respuestaSP = new RespuestaSP();
        //        respuestaSP = _serSoc.GuardarSocioMovil(socio, id_usr);
        //        return Json(respuestaSP);
        //    }
        //    [HttpPost]
        //    public JsonResult GuardarNuevoSocioMovilPrimario(SD_SOCIO_MOVILES socio)
        //    {
        //        int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
        //        RespuestaSP respuestaSP = new RespuestaSP();
        //        respuestaSP = _serSoc.GuardarNuevoSocioMovilPrimario(socio, id_usr);
        //        return Json(respuestaSP);
        //    }

        //    [HttpPost]
        //    public JsonResult GuardarAuto(SD_AUTOS auto)
        //    {
        //        int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
        //        RespuestaSP respuestaSP = new RespuestaSP();
        //        respuestaSP = _serSoc.GuardarAutos(auto, id_usr);
        //        return Json(respuestaSP);
        //    }
        //    #endregion

        //    #region Obligaciones Socio
        //    [HttpGet]
        //    public JavaScriptResult ObtenerObligaciones(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        //    {
        //        filtros.Entidad = entidad;
        //        var autos = _serSoc.ObtenerObligaciones(paginacion, filtros);
        //        var formatData = autos.Select(x => new
        //        {
        //            ID_OBLIGACION = x.ID_OBLIGACION,
        //            ID_SOCIO = x.ID_SOCIO,
        //            IMPORTE = x.IMPORTE,
        //            LOGIN = x.LOGIN,
        //            OBLIGACION = x.OBLIGACION
        //        });
        //        JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
        //        string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
        //        return JavaScript(callback1);
        //    }
        //    [HttpGet]
        //    public JavaScriptResult ObtenerKardexObligaciones(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        //    {
        //        filtros.Entidad = entidad;
        //        var autos = _serSoc.ObtenerKardexObligaciones(paginacion, filtros);
        //        var formatData = autos.Select(x => new
        //        {
        //            ID_OBLIGACION = x.ID_OBLIGACION,
        //            FECHA = x.FECHA,
        //            ID_KARDEX = x.ID_KARDEX,
        //            LOGIN = x.LOGIN,
        //            MOTIVO = x.MOTIVO,
        //            IMPORTE_ANTERIOR = x.IMPORTE_ANTERIOR,
        //            IMPORTE_NUEVO = x.IMPORTE_NUEVO
        //        });
        //        JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
        //        string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
        //        return JavaScript(callback1);
        //    }
        //    [HttpPost]
        //    public JsonResult GuardarObligacion(SD_KARDEX_OBLIGACION kardex,int ID_SOCIO)
        //    {
        //        string login = User.Identity.Name.Split('-')[0];
        //        RespuestaSP respuestaSP = new RespuestaSP();
        //        respuestaSP = _serSoc.GuardarObligacion(kardex,ID_SOCIO, login);
        //        return Json(respuestaSP);
        //    }
        //    //GuardarObligacion
        //    #endregion
        //}
    }
}
