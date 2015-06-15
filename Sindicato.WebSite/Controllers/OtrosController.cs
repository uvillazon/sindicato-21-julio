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
    public class OtrosController : Controller
    {
        //
        // GET: /Otros/
        private IOtrosServices _serOtro;
        public OtrosController(IOtrosServices serOtro)
        {
            this._serOtro = serOtro;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerAntecedentesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serOtro.ObtenerAntecedentesPaginados(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                ID_ANTECEDENTE = x.ID_ANTECEDENTE,
                ID_SOCIO = x.ID_SOCIO,
                ID_CHOFER = x.ID_CHOFER,
                MOTIVO = x.MOTIVO,
                OBSERVACION = x.OBSERVACION,
                FECHA = x.FECHA,
                FECHA_REG = x.FECHA_REG,
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult ObtenerAntecedentePorId(int ID_ANTECEDENTE)
        {
            var ant = _serOtro.ObtenerAntecedentePorCriterio(x => x.ID_ANTECEDENTE == ID_ANTECEDENTE);
            var data = new
            {
                ID_ANTECEDENTE = ant.ID_ANTECEDENTE,
                ID_CHOFER = ant.ID_CHOFER,
                ID_SOCIO = ant.ID_SOCIO,
                MOTIVO = ant.MOTIVO,
                OBSERVACION = ant.OBSERVACION,
                FECHA = String.Format("{0:dd/MM/yyyy}", ant.FECHA),
            };
            return Json(new { data = data, success = true });
        }
        [HttpPost, ValidateInput(false)]
        public JsonResult GuardarAntecedente(SD_ANTECEDENTES ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serOtro.GuardarAntecedente(ant, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarAntecedente(int ID_ANTECEDENTE)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serOtro.EliminarAntecedente(ID_ANTECEDENTE);
            return Json(respuestaSP);
        }
        #region Documentacion
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDocumentacionesPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serOtro.ObtenerDocumentacionesPaginado(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                ID_DOCUMENTACION = x.ID_DOCUMENTACION,
                ID_SOCIO = x.ID_SOCIO,
                ID_CHOFER = x.ID_CHOFER,
                DOCUMENTACION = x.DOCUMENTACION,
                OBSERVACION = x.OBSERVACION,
                TIPO = x.TIPO,
                LOGIN = x.LOGIN,
                FECHA = x.FECHA,
                FECHA_REG = x.FECHA_REG,
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult ObtenerDocumentacionPorId(int ID_DOCUMENTACION)
        {
            var ant = _serOtro.ObtenerDocumentoPorCriterio(x => x.ID_DOCUMENTACION == ID_DOCUMENTACION);
            var data = new
            {
                ID_ANTECEDENTE = ant.ID_DOCUMENTACION,
                ID_CHOFER = ant.ID_CHOFER,
                ID_SOCIO = ant.ID_SOCIO,
                LOGIN = ant.LOGIN,
                TIPO = ant.TIPO,
                DOCUMENTACION = ant.DOCUMENTACION,
                OBSERVACION = ant.OBSERVACION,
                FECHA = String.Format("{0:dd/MM/yyyy}", ant.FECHA),
            };
            return Json(new { data = data, success = true });
        }
        [HttpPost, ValidateInput(false)]
        public JsonResult GuardarDocumentacion(SD_DOCUMENTACIONES ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serOtro.GuardarDocumentacion(ant, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarDocumentacion(int ID_DOCUMENTACION)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serOtro.EliminarDocumentaciones(ID_DOCUMENTACION);
            return Json(respuestaSP);
        }

        #endregion

        #region Desempenos Socio Crear Editar Listar Obtener
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDesempenoPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros, SociosModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serOtro.ObtenerDesempenosPaginado(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                ID_DESEMPENO = x.ID_DESEMPENO,
                ID_SOCIO = x.ID_SOCIO,
                CARGO = x.CARGO,
                FECHA_DESDE = x.FECHA_DESDE,
                FECHA_HASTA = x.FECHA_HASTA,
                FECHA_REG = x.FECHA_REG,
                LOGIN = x.LOGIN,
                OBSERVACION = x.OBSERVACION

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult ObtenerDesempenoPorId(int ID_DESEMPENO)
        {
            var x = _serOtro.ObtenerDesempenoPorCriterio(y => y.ID_DESEMPENO == ID_DESEMPENO);
            var data = new
            {
                ID_DESEMPENO = x.ID_DESEMPENO,
                ID_SOCIO = x.ID_SOCIO,
                CARGO = x.CARGO,
                FECHA_REG = x.FECHA_REG,
                LOGIN = x.LOGIN,
                OBSERVACION = x.OBSERVACION,
                FECHA_DESDE = String.Format("{0:dd/MM/yyyy}", x.FECHA_DESDE),
                FECHA_HASTA = String.Format("{0:dd/MM/yyyy}", x.FECHA_HASTA),
            };
            return Json(new { data = data, success = true });
        }
        [HttpPost, ValidateInput(false)]
        public JsonResult GuardarDesempeno(SD_SOCIO_DESEMPENOS ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serOtro.GuardarDesempeno(ant, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarDesempeno(int ID_DESEMPENO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serOtro.EliminarDesempeno(ID_DESEMPENO);
            return Json(respuestaSP);
        }

        #endregion
    }
}
