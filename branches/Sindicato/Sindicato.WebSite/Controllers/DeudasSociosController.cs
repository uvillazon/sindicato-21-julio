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
    public class DeudasSociosController : Controller
    {
        //
        // GET: /MenuOpciones/
        private IDeudasServices _servicio;
        public DeudasSociosController(IDeudasServices serIng)
        {
            _servicio = serIng;
        }

        #region Ingresos
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDeudasPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros, IngresosModel entidad)
        {
            filtros.Entidad = entidad;
            var ingresos = _servicio.ObtenerDeudasPaginados(paginacion, filtros);
            var formatData = ingresos.Select(x => new
            {
                ID_DEUDA = x.ID_DEUDA,
                ID_CAJA = x.ID_CAJA,
                CAJA = x.SD_CAJAS.NOMBRE,
                FECHA = x.FECHA,
                FECHA_REG = x.FECHA_REG,
                IMPORTE = x.IMPORTE,
                LOGIN_USR = x.LOGIN_USR,
                MONEDA = x.SD_CAJAS.MONEDA,
                OBSERVACION = x.OBSERVACION,
                MOTIVO = x.MOTIVO,
                ESTADO = x.ESTADO

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult GuardarDeuda(SD_DEUDAS_SOCIOS ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _servicio.GuardarDeuda(ant, login);
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

        //#region Tipo de Ingresos
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerDetallesDeudasPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros, IngresosModel entidad)
        {
            filtros.Entidad = entidad;
            var retiros = _servicio.ObtenerDetallesDeudasPaginados(paginacion, filtros);
            var formatData = retiros.Select(x => new
            {
                ID_DETALLE = x.ID_DETALLE,
                ID_DEUDA = x.ID_DEUDA,
                ID_CAJA = x.ID_CAJA,
                CAJA = x.SD_CAJAS.NOMBRE,
                ESTADO = x.ESTADO,
                FECHA_REG = x.FECHA_REG,
                IMPORTE = x.IMPORTE,
                IMPORTE_CANCELADO = x.IMPORTE_CANCELADO,
                LOGIN_USR = x.LOGIN_USR,
                MOTIVO = x.SD_DEUDAS_SOCIOS.MOTIVO,
                OBSERVACION = x.OBSERVACION,
                MONEDA = x.SD_CAJAS.MONEDA,
                MOVIL = x.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                SOCIO = x.SD_SOCIO_MOVILES.ObtenerNombreSocio(),
                

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
       
        //[HttpPost, ValidateInput(false)]
        //public JsonResult GuardarTipoIngreso(SD_TIPOS_INGRESOS_SOCIO ant)
        //{
        //    string login = User.Identity.Name.Split('-')[0];
        //    RespuestaSP respuestaSP = new RespuestaSP();
        //    respuestaSP = _serIng.GuardarTipoIngreso(ant, login);
        //    return Json(respuestaSP);
        //}
        ////[HttpPost]
        ////public JsonResult EliminarEgreso(int ID_EGRESO)
        ////{
        ////    string login = User.Identity.Name.Split('-')[0];
        ////    RespuestaSP respuestaSP = new RespuestaSP();
        ////    respuestaSP = _serTra.EliminarEgreso(ID_EGRESO);
        ////    return Json(respuestaSP);
        ////}
        //#endregion


   
    }
}
