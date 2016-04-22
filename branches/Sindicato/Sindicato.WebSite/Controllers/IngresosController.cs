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
    public class IngresosController : Controller
    {
        //
        // GET: /MenuOpciones/
        private IIngresosServices _serIng;
        public IngresosController(IIngresosServices serIng)
        {
            _serIng = serIng;
        }

        #region Ingresos
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerIngresosPorSociosPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros, IngresosModel entidad)
        {
            filtros.Entidad = entidad;
            var ingresos = _serIng.ObtenerIngresosPorSocioPaginados(paginacion, filtros);
            var formatData = ingresos.Select(x => new
            {
                ID_INGRESO = x.ID_INGRESO,
                ID_CAJA = x.ID_CAJA,
                CAJA = x.SD_CAJAS.NOMBRE,
                FECHA = x.FECHA,
                FECHA_REG = x.FECHA_REG,
                IMPORTE = x.IMPORTE,
                LOGIN_USR = x.LOGIN_USR,
                MONEDA = x.MONEDA,
                TIPO_INGRESO = x.SD_TIPOS_INGRESOS_SOCIO.NOMBRE,
                OBSERVACION = x.OBSERVACION,
                SOCIO = x.SD_SOCIO_MOVILES.ObtenerNombreSocio(),
                MOVIL = x.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                ESTADO = x.ESTADO

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult GuardarIngreso(SD_INGRESOS_POR_SOCIOS ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serIng.GuardarIngreso(ant, login);
            return Json(respuestaSP);
        }
        //[HttpPost]
        //public JsonResult EliminarIngreso(int ID_INGRESO)
        //{
        //    string login = User.Identity.Name.Split('-')[0];
        //    RespuestaSP respuestaSP = new RespuestaSP();
        //    respuestaSP = _serTra.EliminarIngreso(ID_INGRESO);
        //    return Json(respuestaSP);
        //}
        #endregion

        #region Tipo de Ingresos
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerTipoIngresosPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros, IngresosModel entidad)
        {
            filtros.Entidad = entidad;
            var retiros = _serIng.ObtenerITiposIngresosPorSocioPaginados(paginacion, filtros);
            var formatData = retiros.Select(x => new
            {
                ID_TIPO = x.ID_TIPO,
                ID_CAJA = x.ID_CAJA,
                CAJA = x.SD_CAJAS.NOMBRE,
                ESTADO = x.ESTADO,
                FECHA_REG = x.FECHA_REG,
                IMPORTE = x.IMPORTE,
                LOGIN_USR = x.LOGIN_USR,
                NOMBRE = x.NOMBRE,
                OBSERVACION = x.OBSERVACION,
                MONEDA = x.MONEDA,
                CATEGORIA = x.CATEGORIA

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
       
        [HttpPost, ValidateInput(false)]
        public JsonResult GuardarTipoIngreso(SD_TIPOS_INGRESOS_SOCIO ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serIng.GuardarTipoIngreso(ant, login);
            return Json(respuestaSP);
        }
        //[HttpPost]
        //public JsonResult EliminarEgreso(int ID_EGRESO)
        //{
        //    string login = User.Identity.Name.Split('-')[0];
        //    RespuestaSP respuestaSP = new RespuestaSP();
        //    respuestaSP = _serTra.EliminarEgreso(ID_EGRESO);
        //    return Json(respuestaSP);
        //}
        #endregion


   
    }
}
