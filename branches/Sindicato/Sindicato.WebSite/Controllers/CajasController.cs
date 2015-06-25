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
using System.Diagnostics;
using System.IO;
using Sindicato.WebSite.Controllers.Utils;

namespace Sindicato.WebSite.Controllers
{
    public class CajasController : Controller
    {
        //
        // GET: /MenuOpciones/
        private ICajasServices _serCaj;

        public CajasController(ICajasServices serCaj)
        {
            _serCaj = serCaj;
        }
        public ActionResult ObtenerCajasPaginado(PagingInfo paginacion,FiltrosModel<TransferenciasModel> filtros , TransferenciasModel Entidad)
        {
            filtros.Entidad = Entidad;
            var cajas = _serCaj.ObtenerCajasPaginado(paginacion,filtros);
            var formatData = cajas.Select(x => new
            {
                ID_CAJA = x.ID_CAJA,
                NOMBRE = x.NOMBRE,
                CODIGO = x.CODIGO,
                DESCRIPCION = x.DESCRIPCION,
                NRO_CUENTA = x.NRO_CUENTA,
                SALDO = x.SALDO,
                //COMPRAS = x.SG_COMPRAS.Count(),
            });
            //formatData.ToList().Add(new
            //{
            //    SALDO = formatData.Sum(x => x.SALDO)
            //});
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerKardexEfectivoPaginado(PagingInfo paginacion, FiltrosModel<KardexEfectivoModel> filtros, KardexEfectivoModel Kardex)
        {
            filtros.Entidad = Kardex;
            var kardexd = _serCaj.ObtenerKardexEfectivo(paginacion, filtros);
            //kardexd = kardexd.OrderByDescending(x => new { x.FECHA , x.ID_KARDEX});
            var formatData = kardexd.Select(x => new
            {
                ID_CAJA = x.ID_CAJA,
                ID_KARDEX = x.ID_KARDEX,
                FECHA = x.FECHA,
                INGRESO = x.INGRESO,
                EGRESO = x.EGRESO,
                SALDO = x.SALDO,
                DETALLE = x.DETALLE,
            });
            formatData = formatData.OrderBy(x => x.FECHA).ThenBy(x => x.ID_KARDEX);
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult GuardarCaja(SD_CAJAS caj)
        {
            string login = User.Identity.Name.Split('-')[0];
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serCaj.SP_GrabarCaja(caj, login);
            return Json(respuestaSP);
        }

        [HttpPost]
        public JsonResult EliminarCaja(int ID_CAJA)
        {
            try
            {
                int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
                RespuestaSP respuestaRSP = new RespuestaSP();
                respuestaRSP = _serCaj.SP_EliminarCaja(ID_CAJA, id_usr);
                return Json(respuestaRSP);
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
