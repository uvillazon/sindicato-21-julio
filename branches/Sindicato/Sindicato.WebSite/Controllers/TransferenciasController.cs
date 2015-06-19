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
    public class TransferenciasController : Controller
    {
        //
        // GET: /MenuOpciones/
        private ITrasferenciasServices _serTra;
        public TransferenciasController(ITrasferenciasServices serTra)
        {
            _serTra = serTra;
        }

        #region Ingresos
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerIngresosPaginados(PagingInfo paginacion, FiltrosModel<TransferenciasModel> filtros, TransferenciasModel entidad)
        {
            filtros.Entidad = entidad;
            var ingresos = _serTra.ObtenerIngresosPaginados(paginacion, filtros);
            var formatData = ingresos.Select(x => new
            {
                ID_INGRESO = x.ID_INGRESO,
                ID_CAJA = x.ID_CAJA,
                CAJA = x.SD_CAJAS.NOMBRE,
                FECHA = x.FECHA,
                FECHA_REG = x.FECHA_REG,
                IMPOTE = x.IMPORTE,
                LOGIN = x.LOGIN,
                CONCEPTO = x.CONCEPTO,
                NRO_RECIBO = x.NRO_RECIBO,
                OBSERVACION = x.OBSERVACION

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult GuardarIngreso(SD_INGRESOS ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serTra.GuardarIngreso(ant, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarIngreso(int ID_INGRESO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serTra.EliminarIngreso(ID_INGRESO);
            return Json(respuestaSP);
        }
        #endregion

        #region Egresos
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerEgresosPaginados(PagingInfo paginacion, FiltrosModel<TransferenciasModel> filtros, TransferenciasModel entidad)
        {
            filtros.Entidad = entidad;
            var retiros = _serTra.ObtenerEgresosPaginados(paginacion, filtros);
            var formatData = retiros.Select(x => new
            {
                ID_EGRESO = x.ID_EGRESO,
                ID_CAJA = x.ID_CAJA,
                CAJA = x.SD_CAJAS.NOMBRE,
                FECHA = x.FECHA,
                FECHA_REG = x.FECHA_REG,
                IMPORTE = x.IMPORTE,
                LOGIN = x.LOGIN,
                CONCEPTO = x.CONCEPTO,
                NRO_RECIBO = x.NRO_RECIBO,
                OBSERVACION = x.OBSERVACION

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
       
        [HttpPost, ValidateInput(false)]
        public JsonResult GuardarEgreso(SD_EGRESOS ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serTra.GuardarEgreso(ant, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarRetiroSocio(int ID_EGRESO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serTra.EliminarEgreso(ID_EGRESO);
            return Json(respuestaSP);
        }
        #endregion
    }
}
