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
    public class ObligacionesController : Controller
    {
        //
        // GET: /MenuOpciones/
        private IObligacionesServices _serObl;
        public ObligacionesController(IObligacionesServices serTra)
        {
            _serObl = serTra;
        }

        #region Amortizaciones
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerAmortizacionesPaginados(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros, OtrosModel entidad)
        {
            filtros.Entidad = entidad;
            var retiros = _serObl.ObtenerAmortizacionesPaginados(paginacion, filtros);
            var formatData = retiros.Select(x => new
            {
                ID_AMORTIZACION = x.ID_AMORTIZACION,
                ID_SOCIO = x.ID_SOCIO,
                SOCIO = string.Format("{0} {1} {2}", x.SD_SOCIOS.NOMBRE, x.SD_SOCIOS.APELLIDO_PATERNO, x.SD_SOCIOS.APELLIDO_MATERNO),
                FECHA = x.FECHA,
                ID_CAJA = x.ID_CAJA,
                CAJA = x.SD_CAJAS.NOMBRE,
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
        public JsonResult GuardarAmortizacion(SD_AMORTIZACIONES ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serObl.GuardarAmortizacion(ant, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarAmortizacion(int ID_AMORTIZACION)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serObl.EliminarAmortizacion(ID_AMORTIZACION);
            return Json(respuestaSP);
        }
        #endregion
        #region Obligaciones
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerObligacionesPaginados(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros, OtrosModel entidad)
        {
            filtros.Entidad = entidad;
            var retiros = _serObl.ObtenerObligacionesPaginados(paginacion, filtros);
            var formatData = retiros.Select(x => new
            {
                ID_OBLIGACION = x.ID_OBLIGACION,
                ID_SOCIO = x.ID_SOCIO,
                SOCIO = string.Format("{0} {1} {2}", x.SD_SOCIOS.NOMBRE, x.SD_SOCIOS.APELLIDO_PATERNO, x.SD_SOCIOS.APELLIDO_MATERNO),
                FECHA = x.FECHA,
                PERIODO = x.SD_CIERRES.CODIGO,
                ID_CIERRE = x.ID_CIERRE,
                FECHA_REG = x.FECHA_REG,
                IMPORTE = x.IMPORTE,
                LOGIN = x.LOGIN,
                CONCEPTO = x.CONCEPTO,
                OBSERVACION = x.OBSERVACION,
                ESTADO = x.ESTADO
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult GuardarObligacion(SD_OTRAS_OBLIGACIONES ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serObl.GuardarObligacion(ant, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarObligacion(int ID_OBLIGACION)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serObl.EliminarObligacion(ID_OBLIGACION);
            return Json(respuestaSP);
        }
        #endregion

        #region Kardex

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerKardexPaginado(PagingInfo paginacion, FiltrosModel<OtrosModel> filtros, OtrosModel Kardex)
        {
            filtros.Entidad = Kardex;
            var kardexd = _serObl.ObtenerKardexPaginados(paginacion, filtros);
            //kardexd = kardexd.OrderByDescending(x => new { x.FECHA , x.ID_KARDEX});
            var formatData = kardexd.Select(x => new
            {
                ID_SOCIO = x.ID_SOCIO,
                ID_KARDEX = x.ID_KARDEX,
                FECHA = x.FECHA,
                DEBE = x.DEBE,
                AMORTIZACION = x.AMORTIZACION,
                SALDO_DEBE = x.SALDO_DEBE,
                DETALLE = x.DETALLE,
            });
            formatData = formatData.OrderBy(x => x.FECHA).ThenBy(x => x.ID_KARDEX);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        #endregion
    }
}
