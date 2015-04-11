using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sindicato.Services.Interfaces;
using Sindicato.Common;
using System.Web.Script.Serialization;
using Sindicato.Model;
using Sindicato.Services.Model;

namespace Sindicato.WebSite.Controllers
{
    [Authorize]
    public class VentaHojasController : Controller
    {
        private IVentaHojasServices _serven;

        public VentaHojasController(IVentaHojasServices serven)
        {
            _serven = serven;
        }


        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerFechaDisponibles(DateTime FECHA_VENTA, int ID_SOCIO, int NRO_MOVIL)
        {
            
            var result = _serven.ObtenerFechasDisponibles(FECHA_VENTA,ID_SOCIO,NRO_MOVIL);
            return Json(result,JsonRequestBehavior.AllowGet);

        }
        //ObtenerVentasPaginadas
        //ObtenerVentasHojasPaginados
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerVentasPaginadas(PagingInfo paginacion, FiltrosModel<HojasModel> filtros, HojasModel entidad)
        {
            filtros.Entidad = entidad;
            var jsondata = _serven.ObtenerVentasHojasPaginados(paginacion, filtros);
            var formattData = jsondata.Select(l => new
            {
                TOTAL = l.TOTAL,
                DESCUENTO = l.DESCUENTO,
                ESTADO = l.ESTADO,
                FECHA_VENTA = l.FECHA_VENTA,
                ID_SOCIO = l.ID_SOCIO,
                ID_VENTA = l.ID_VENTA,
                LOGIN = l.LOGIN,
                NRO_MOVIL = l.NRO_MOVIL,
                OBSERVACION = l.OBSERVACION,
                TOTAL_HOJAS = l.TOTAL_HOJAS,
                SOCIO = string.Format("{0} {1} {2}",l.SD_SOCIOS.NOMBRE , l.SD_SOCIOS.APELLIDO_PATERNO,l.SD_SOCIOS.APELLIDO_MATERNO)
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formattData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);

        }
        //[HttpPost]
        //public ActionResult GrabarHoja(SD_HOJAS_CONTROL hoja, int CANTIDAD,int ID_CAJA)//por favor no cambiar la variable l 
        //{
        //    RespuestaSP respuestaSP = new RespuestaSP();
        //    hoja.FECHA_USO = hoja.FECHA_COMPRA;
        //    int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
        //    //int id_parada = Convert.ToInt32(User.Identity.Name.Split('-')[4]);
        //    //hoja.ID_PARADA = id_parada == 0 ? 0 : id_parada;
        //    respuestaSP = _serven.GuardarHojas(hoja,id_usr,CANTIDAD,ID_CAJA);
        //    return Json(respuestaSP);
        //}
    }
}
