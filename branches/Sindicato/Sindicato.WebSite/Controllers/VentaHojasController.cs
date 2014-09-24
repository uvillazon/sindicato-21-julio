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
        public ActionResult ObtenerHojas(PagingInfo paginacion, FiltrosModel<HojasModel> filtros, HojasModel entidad)
        {
            entidad.FECHA_COMPRA = entidad.FECHA_COMPRA == null ? DateTime.Now.Date : entidad.FECHA_COMPRA;
            //int? id_parada = Convert.ToInt32(User.Identity.Name.Split('-')[4]);
            //entidad.ID_PARADA = id_parada == 0 ? null : id_parada;
            filtros.Entidad = entidad;
            var jsondata = _serven.ObtenerHojasPaginados(paginacion, filtros);
            var formattData = jsondata.Select(l => new
            {
                NRO_HOJA = l.NRO_HOJA,
                FECHA_COMPRA = l.FECHA_COMPRA,
                FECHA_USO = l.FECHA_USO,
                MONTO = l.MONTO,
                PARADA = l.SD_PARADAS.NOMBRE,
                ESTADO = l.ESTADO,
                NRO_MOVIL = l.SD_MOVILES.NRO_MOVIL,
                SOCIO = string.Format("{0} {1} {2}", l.SD_MOVILES.SD_SOCIO_MOVILES.FirstOrDefault().SD_SOCIOS.NOMBRE, l.SD_MOVILES.SD_SOCIO_MOVILES.FirstOrDefault().SD_SOCIOS.APELLIDO_PATERNO, l.SD_MOVILES.SD_SOCIO_MOVILES.FirstOrDefault().SD_SOCIOS.APELLIDO_MATERNO),
                OBSERVACION = l.OBSERVACION
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formattData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);

        }
        
        [HttpPost]
        public ActionResult GrabarHoja(SD_HOJAS_CONTROL hoja, int CANTIDAD,int ID_CAJA)//por favor no cambiar la variable l 
        {
            RespuestaSP respuestaSP = new RespuestaSP();
            hoja.FECHA_USO = hoja.FECHA_COMPRA;
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            //int id_parada = Convert.ToInt32(User.Identity.Name.Split('-')[4]);
            //hoja.ID_PARADA = id_parada == 0 ? 0 : id_parada;
            respuestaSP = _serven.GuardarHojas(hoja,id_usr,CANTIDAD,ID_CAJA);
            return Json(respuestaSP);
        }
    }
}
