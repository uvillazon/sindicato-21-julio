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
                AUTO = string.Format("{0}/{1}/{2}/{3}", x.PLACA, x.COLOR, x.MARCA, x.MODELO),
                TIPO_ACTUAL = x.SD_SOCIO_MOVIL_AUTOS.Count() > 0 ? x.SD_SOCIO_MOVIL_AUTOS.Any(z => z.ESTADO == "ACTIVO") ? x.SD_SOCIO_MOVIL_AUTOS.First(y => y.ESTADO == "ACTIVO").TIPO : "NINGUNO" : "NINGUNO",
                MOVIL_ACTUAL = x.SD_SOCIO_MOVIL_AUTOS.Count() > 0 ? x.SD_SOCIO_MOVIL_AUTOS.Any(z => z.ESTADO == "ACTIVO") ? x.SD_SOCIO_MOVIL_AUTOS.First(y => y.ESTADO == "ACTIVO").SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL.ToString() : "NO TIENE MOVIL" : "NO TIENE MOVIL",
                ID_IMG = _serImg.ConImagen(x.ID_AUTO, "SD_AUTOS")
                //ID_IMG = 
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerAutosSociosPaginados(PagingInfo paginacion, FiltrosModel<AutosModel> filtros, AutosModel entidad)
        {
            filtros.Entidad = entidad;
            var autos = _serAut.ObtenerAutosSociosPaginados(paginacion, filtros);
            var formatData = autos.Select(x => new
            {
                ID_AUTO = x.ID_AUTO,
                CHASIS = x.SD_AUTOS.CHASIS,
                COLOR = x.SD_AUTOS.COLOR,
                DESCRIPCION = x.SD_AUTOS.DESCRIPCION,
                FECHA_ALTA = x.FECHA_ALTA,
                LOGIN_ALTA = x.LOGIN_ALTA,
                MARCA = x.SD_AUTOS.MARCA,
                MODELO = x.SD_AUTOS.MODELO,
                MOTOR = x.SD_AUTOS.MOTOR,
                PLACA = x.SD_AUTOS.PLACA,
                TIPO = x.TIPO,
                AUTO = string.Format("{0}/{1}/{2}/{3}", x.SD_AUTOS.PLACA, x.SD_AUTOS.COLOR, x.SD_AUTOS.MARCA, x.SD_AUTOS.MODELO),
                ESTADO = x.ESTADO,
                MOTIVO_ALTA = x.MOTIVO_ALTA,
                MOTIVO_BAJA = x.MOTIVO_BAJA,
                FECHA_BAJA = x.FECHA_BAJA,
                LOGIN_BAJA = x.LOGIN_BAJA
                //ID_IMG = 
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult ObtenerAutoPorId(int ID_AUTO)
        {
            var auto = _serAut.ObtenereAutoPorCriterio(x => x.ID_AUTO == ID_AUTO);
            if (auto != null)
            {
                var formatData = new
                {
                    ID_AUTO = auto.ID_AUTO,
                    CHASIS = auto.CHASIS,
                    COLOR = auto.COLOR,
                    DESCRIPCION = auto.DESCRIPCION,
                    FECHA_ALTA = String.Format("{0:dd/MM/yyyy}", auto.FECHA_ALTA),   //auto.FECHA_ALTA,
                    LOGIN_USR = auto.LOGIN_USR,
                    MARCA = auto.MARCA,
                    MODELO = auto.MODELO,
                    MOTOR = auto.MOTOR,
                    PLACA = auto.PLACA,
                    TIPO = auto.TIPO,
                    //AUTO = string.Format("{0}/{1}/{2}/{3}",x.PLACA , x.COLOR,x.MARCA,x.MODELO),
                    //TIPO_ACTUAL = x.SD_SOCIO_MOVIL_AUTOS.Count()> 0 ? x.SD_SOCIO_MOVIL_AUTOS.Any(z=>z.ESTADO=="ACTIVO")? x.SD_SOCIO_MOVIL_AUTOS.First(y => y.ESTADO == "ACTIVO").TIPO : "NINGUNO" : "NINGUNO",
                    //MOVIL_ACTUAL = x.SD_SOCIO_MOVIL_AUTOS.Count() > 0 ? x.SD_SOCIO_MOVIL_AUTOS.Any(z=>z.ESTADO=="ACTIVO")? x.SD_SOCIO_MOVIL_AUTOS.First(y => y.ESTADO == "ACTIVO").SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL.ToString() : "NO TIENE MOVIL" : "NO TIENE MOVIL",
                    ID_IMG = _serImg.ConImagen(auto.ID_AUTO, "SD_AUTOS")
                };
                return Json(new { data = formatData , success = true});
            }
            else
            {
                return Json(new {  success = false , msg = "Error" });
            }
        }
        [HttpPost]
        public JsonResult GuardarAuto(SD_AUTOS auto)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serAut.GuardarAuto(auto, login);
            return Json(respuestaSP);
        }
      
    }
}
