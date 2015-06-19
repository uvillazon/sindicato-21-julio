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
        public JsonResult EliminarEgreso(int ID_EGRESO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serTra.EliminarEgreso(ID_EGRESO);
            return Json(respuestaSP);
        }
        #endregion


        #region Transferencias
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerTransferenciasPaginados(PagingInfo paginacion, FiltrosModel<TransferenciasModel> filtros, TransferenciasModel entidad)
        {
            filtros.Entidad = entidad;
            var ingresos = _serTra.ObtenerTransferenciasPaginados(paginacion, filtros);
            var formatData = ingresos.Select(x => new
            {
                ID_TRANSFERENCIA = x.ID_TRANSFERENCIA,
                ID_CAJA_ORIGEN = x.ID_CAJA_ORIGEN,
                ID_CAJA_DESTINO = x.ID_CAJA_DESTINO,
                CAJA_ORIGEN = x.SD_CAJAS.NOMBRE,
                CAJA_DESTINO = x.SD_CAJAS1.NOMBRE,
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
        public JsonResult GuardarTransferencia(SD_TRANSFERENCIAS ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serTra.GuardarTransferencia(ant, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarTransferencia(int ID_TRANSFERENCIA)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serTra.EliminarTransferencia(ID_TRANSFERENCIA);
            return Json(respuestaSP);
        }
        #endregion
    }
}
