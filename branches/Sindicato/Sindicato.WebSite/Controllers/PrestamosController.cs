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
    public class PrestamosController : Controller
    {
        //
        // GET: /MenuOpciones/
        private IPrestamosServices _serPre;
        public PrestamosController(IPrestamosServices serPre)
        {
            _serPre = serPre;
        }

        #region Prestamos
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerPrestamosPorSociosPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros, IngresosModel entidad)
        {
            filtros.Entidad = entidad;
            var ingresos = _serPre.ObtenerPrestamosPorSocioPaginados(paginacion, filtros);
            var formatData = ingresos.Select(x => new
            {
                ID_PRESTAMO = x.ID_PRESTAMO,
                NUMERO = x.ID_PRESTAMO,
                ID_CAJA = x.ID_CAJA,
                CAJA = x.SD_CAJAS.NOMBRE,
                FECHA = x.FECHA,
                FECHA_REG = x.FECHA_REG,
                IMPORTE_PRESTAMO = x.IMPORTE_PRESTAMO,
                LOGIN_USR = x.LOGIN_USR,
                MONEDA = x.MONEDA,
                TIPO_PRESTAMO = x.SD_TIPOS_PRESTAMOS.NOMBRE,
                OBSERVACION = x.OBSERVACION,
                NRO_MOVIL = x.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL,
                SOCIO = x.SD_SOCIO_MOVILES.ObtenerNombreSocio(),
                SEMANAS = x.SEMANAS,
                INTERES = x.INTERES,
                SALDO = (x.IMPORTE_PRESTAMO + x.IMPORTE_INTERES + x.SD_PRESTAMOS_MORA.Where(z => z.ESTADO != "ANULADO").Sum(y => y.IMPORTE_MORA)) - x.SD_PAGO_DE_PRESTAMOS.Where(z => z.ESTADO != "ANULADO").Sum(y => y.IMPORTE + y.IMPORTE_MORA),
                MORA = x.SD_PRESTAMOS_MORA.Where(t => t.ESTADO != "ANULADO").Sum(y => y.IMPORTE_MORA),
                COUTA = x.SD_PLAN_DE_PAGO.Where(y => y.ESTADO == "NUEVO").Count() > 0 ? x.SD_PLAN_DE_PAGO.Where(y => y.ESTADO == "NUEVO").OrderBy(z=>z.NRO_SEMANA).FirstOrDefault().IMPORTE_A_PAGAR : 0,
                //DEBE = (x.IMPORTE_PRESTAMO + x.IMPORTE_INTERES + x.SD_PRESTAMOS_MORA.Where(y => y.ESTADO != "ANULADO").Sum(y => y.IMPORTE_MORA)) - ((x.SD_PAGO_DE_PRESTAMOS.Where(z => z.ESTADO != "ANULADO").Sum(y => y.IMPORTE + y.IMPORTE_MORA) + x.SD_PLAN_DE_PAGO.Count() > 0 ? x.SD_PLAN_DE_PAGO.Sum(z => z.CONDONACION) : 0)),
                DEBE = x.SD_PLAN_DE_PAGO.Where(z => z.ESTADO == "NUEVO").Count() > 0 ? x.SD_PLAN_DE_PAGO.Where(z => z.ESTADO == "NUEVO").Sum(y=> y.IMPORTE_A_PAGAR +  y.INTERES_A_PAGAR + y.MORA_A_PAGAR) : 0,
                ESTADO = x.ESTADO,
                MORA_CUOTA = x.SD_PRESTAMOS_MORA.Where(t => t.ESTADO == "NUEVO").Sum(y => y.IMPORTE_MORA),
                IMPORTE_INTERES = x.IMPORTE_INTERES,
                IMPORTE_TOTAL = x.IMPORTE_PRESTAMO + x.IMPORTE_INTERES + x.SD_PRESTAMOS_MORA.Sum(y => y.IMPORTE_MORA),
                TIPO_INTERES = x.SD_TIPOS_PRESTAMOS.TIPO_INTERES,
                FECHA_LIMITE_PAGO = x.FECHA_LIMITE_PAGO,
                CONDONACION_INTERES = x.SD_PLAN_DE_PAGO.Count() > 0 ? x.SD_PLAN_DE_PAGO.Sum(z=>z.CONDONACION) : 0,
                TOTAL_CANCELADO = x.SD_PAGO_DE_PRESTAMOS.Where(z => z.ESTADO != "ANULADO").Sum(y => y.IMPORTE + y.IMPORTE_MORA),
                ESTADO_CIERRE = x.ESTADO_CIERRE

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [HttpPost]
        public JsonResult GuardarPrestamos(SD_PRESTAMOS_POR_SOCIOS pre)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPre.GuardarPrestamo(pre, login);
            return Json(respuestaSP);
        }



        [HttpPost]
        public JsonResult EliminarPrestamo(int ID_PRESTAMO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPre.EliminarPrestamo(ID_PRESTAMO);
            return Json(respuestaSP);
        }
        #endregion

        #region Tipo de Prestamos
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerTiposPrestamosPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros, IngresosModel entidad)
        {
            filtros.Entidad = entidad;
            var retiros = _serPre.ObtenerTiposPrestamosPaginados(paginacion, filtros);
            var formatData = retiros.Select(x => new
            {
                ID_TIPO = x.ID_TIPO,
                ID_CAJA = x.ID_CAJA,
                CAJA = x.SD_CAJAS.NOMBRE,
                ESTADO = x.ESTADO,
                FECHA_REG = x.FECHA_REG,
                IMPORTE_MINIMO = x.IMPORTE_MINIMO,
                IMPORTE_MAXIMO = x.IMPORTE_MAXIMO,
                SEMANAS = x.SEMANAS,
                MULTA_POR_MORA = x.MULTA_POR_MORA,
                LOGIN_USR = x.LOGIN_USR,
                NOMBRE = x.NOMBRE,
                OBSERVACION = x.OBSERVACION,
                MONEDA = x.MONEDA,
                CATEGORIA = x.CATEGORIA,
                INTERES = x.INTERES,
                TIPO_INTERES = x.TIPO_INTERES,
                INTERES_FIJO = x.INTERES_FIJO,
                DIAS_ESPERA_MORA = x.DIAS_ESPERA_MORA

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerPlanDePagosGenerados(PagingInfo paginacion, double capital, double tasaAnual, int plazoMeses, DateTime fechaPago)
        {

            var planes = _serPre.generarPlanDeCuotasFrances(capital, tasaAnual ,plazoMeses, fechaPago, 1);
            var formatData = planes.Select(x => new
            {
                NRO_SEMANA = x.NRO_CCUOTA,
                SALDO_PRESTAMO = x.SALDO,
                IMPORTE_A_PAGAR = x.CAPITAL,
                IMPORTE_TOTAL = x.CUOTA,
                FECHA_PAGO = x.FECHA_CUOTA,
                INTERES_A_PAGAR = x.INTERES,
                CAPITAL_A_PAGAR = x.TOTAL_AMORTIZACION

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost, ValidateInput(false)]
        public JsonResult GuardarTipoPrestamos(SD_TIPOS_PRESTAMOS ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPre.GuardarTipoPrestamo(ant, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarTipoPrestamos(int ID_TIPO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPre.EliminarTipoPrestamo(ID_TIPO);
            return Json(respuestaSP);
        }
        #endregion

        #region plan de pagos
        [HttpPost]
        public JsonResult GenerarPlanDePagos(int ID_PRESTAMO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPre.GenerarPlanDePagos(ID_PRESTAMO, login);
            return Json(respuestaSP);
        }

        //
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerPlanDePagosPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros, IngresosModel entidad)
        {
            filtros.Entidad = entidad;
            var retiros = _serPre.ObtenerPlanDePagosPaginados(paginacion, filtros);
            var formatData = retiros.Select(x => new
            {
                CAPITAL_A_PAGAR = x.SALDO_PLAN,
                ESTADO = x.ESTADO,
                FECHA_PAGO = x.FECHA_PAGO,
                FECHA_REG = x.FECHA_REG,
                ID_PLAN = x.ID_PLAN,
                ID_PRESTAMO = x.ID_PRESTAMO,
                IMPORTE_A_PAGAR = x.CAPITAL_A_PAGAR,
                INTERES_A_PAGAR = x.INTERES_A_PAGAR,
                IMPORTE_TOTAL = x.IMPORTE_A_PAGAR,
                LOGIN_USR = x.LOGIN_USR,
                NRO_SEMANA = x.NRO_SEMANA,
                SALDO_PLAN = x.SALDO_PLAN,
                SALDO_PRESTAMO = x.SALDO_PRESTAMO,


            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        #endregion

        #region Pagos de Prestamos


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerPagosPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros, IngresosModel entidad)
        {
            filtros.Entidad = entidad;
            var retiros = _serPre.ObtenerPagosPaginados(paginacion, filtros);
            var formatData = retiros.Select(x => new
            {
                ID_PAGO = x.ID_PAGO,
                FECHA = x.FECHA,
                ID_CAJA = x.ID_CAJA,
                CAJA = x.SD_CAJAS.NOMBRE,
                ESTADO = x.ESTADO,
                FECHA_REG = x.FECHA_REG,
                ID_PRESTAMO = x.ID_PRESTAMO,
                IMPORTE = x.IMPORTE,
                MONEDA = x.MONEDA,
                IMPORTE_MORA = x.IMPORTE_MORA,
                TOTAL = x.IMPORTE_MORA + x.IMPORTE,
                OBSERVACION = x.OBSERVACION,
                TIPO = x.TIPO,
                LOGIN_USR = x.LOGIN_USR,
                SOCIO = x.SD_PRESTAMOS_POR_SOCIOS.SD_SOCIO_MOVILES.ObtenerNombreSocio()

            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        //[HttpPost]
        //public JsonResult GuardarPagoPrestamos(SD_PAGO_DE_PRESTAMOS pre, decimal CUOTA)
        //{
        //    string login = User.Identity.Name.Split('-')[0];
        //    pre.IMPORTE = CUOTA;
        //    RespuestaSP respuestaSP = new RespuestaSP();
        //    respuestaSP = _serPre.GuardarPagoPrestamo(pre, login);
        //    return Json(respuestaSP);
        //}
        [HttpPost, ValidateInput(false)]
        public JsonResult GuardarPago(SD_PAGO_DE_PRESTAMOS ant, decimal CUOTA)
        {
            string login = User.Identity.Name.Split('-')[0];
            ant.IMPORTE = CUOTA;
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPre.GuardarPagoPrestamo(ant, login);
            return Json(respuestaSP);
        }

        [HttpPost, ValidateInput(false)]
        public JsonResult GuardarPagoTotal(SD_PAGO_DE_PRESTAMOS ant, decimal CUOTA)
        {
            string login = User.Identity.Name.Split('-')[0];
            ant.IMPORTE = CUOTA;
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPre.GuardarPagoTotalPrestamo(ant, login);
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult EliminarPago(int ID_PAGO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPre.EliminarPagoPrestamo(ID_PAGO,login);
            return Json(respuestaSP);
        }

        [HttpPost, ValidateInput(false)]
        public JsonResult GuardarMora(SD_PRESTAMOS_MORA ant)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPre.GuardarMora(ant, login);
            return Json(respuestaSP);
        }
        [HttpPost]
        public JsonResult EliminarMora(int ID_MORA)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPre.EliminarMora(ID_MORA);
            return Json(respuestaSP);
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerMorasPaginados(PagingInfo paginacion, FiltrosModel<IngresosModel> filtros, IngresosModel entidad)
        {
            filtros.Entidad = entidad;
            var ingresos = _serPre.ObtenerMorasPaginados(paginacion, filtros);
            var formatData = ingresos.Select(x => new
            {
                ID_PRESTAMO = x.ID_PRESTAMO,
                ID_MORA = x.ID_MORA,
                FECHA = x.FECHA,
                FECHA_LIMITE_PAGO_MORA = x.FECHA_LIMITE_PAGO_MORA,
                FECHA_REG = x.FECHA_REG,
                IMPORTE_MORA = x.IMPORTE_MORA,
                LOGIN_USR = x.LOGIN_USR,
                OBSERVACION = x.OBSERVACION,
                NRO_SEMANA = x.SD_PLAN_DE_PAGO.NRO_SEMANA,
                DIAS_RETRASO = x.SD_PLAN_DE_PAGO.DIAS_RETRASO,
                ID_PLAN = x.SD_PLAN_DE_PAGO.ID_PLAN,
                ESTADO = x.ESTADO
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult ObtenerImporteDeuda(string TIPO, DateTime FECHA, int ID_PRESTAMO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPre.ObtenerImporteDeuda(TIPO ,FECHA ,ID_PRESTAMO, login);
            return Json(respuestaSP);
        }

        #endregion



        [HttpPost]
        public JsonResult ObtenerPlanAPagar(int ID_PRESTAMO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPre.ObtenerPlanDePagoACancelar(ID_PRESTAMO);
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult ObtenerTotalAPagar(int ID_PRESTAMO)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPre.ObtenerTotalACancelar(ID_PRESTAMO);
            return Json(respuestaSP);
        }

        [HttpPost, ValidateInput(false)]
        public JsonResult GuardarRefinanciamientoPrestamo(SD_PAGO_DE_PRESTAMOS ant, SD_PRESTAMOS_POR_SOCIOS prestamo, decimal CUOTA)
        {
            string login = User.Identity.Name.Split('-')[0];
            ant.IMPORTE = CUOTA;
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serPre.GuardarRefinanciamientoPrestamo(ant, prestamo, login);
            return Json(respuestaSP);
        }
    }
}
