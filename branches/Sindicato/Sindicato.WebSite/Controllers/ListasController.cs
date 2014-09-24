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
    public class ListasController : Controller
    {
        private IListasServices _serLista;

        public ListasController(IListasServices serLista)
        {
            _serLista = serLista;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerListas(PagingInfo paginacion)
        {

            var jsondata = _serLista.ObtenerListas(paginacion, null);
            var formattData = jsondata.Rows.Select(l => new
            {
                ID_LISTA = l.ID_LISTA,
                LISTA = l.LISTA,
                DESCRIPCION = l.DESCRIPCION,
                TAM_LIMITE = l.TAM_LIMITE,
                TIPO_VALOR = l.TIPO_VALOR,
                MAYUS_MINUS = l.MAYUS_MINUS,
                ESTADO = l.ESTADO
            });

            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formattData, Total = jsondata.Total }) + ");";
            return JavaScript(callback1);

        }
        [HttpGet]
        public ActionResult ObtenerListasItem(PagingInfo paginacion, FiltrosModel<ListasItemsModel> filtros, ListasItemsModel listasItemsModel)
        {
            filtros.Entidad = listasItemsModel;
            var result = _serLista.ObtenerListasItems(paginacion, filtros);
            var query = (from c in result
                         select new
                         {
                             ID_TABLA = c.ID_TABLA,
                             ID_LISTA = c.ID_LISTA,
                             CODIGO = c.CODIGO,
                             VALOR = c.VALOR,
                             ESTADO = c.ESTADO,
                             ID_PADRE = c.ID_PADRE
                         }).ToList();

            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Total = result.Count(), Rows = query.ToList() }) + ");";
            //string callback1 = info.callback + "(" + json + ");";


            return JavaScript(callback1);

        }
        [HttpPost]
        public ActionResult GrabarListaItemSP(SD_LISTAS_ITEMS listaItems)
        {
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serLista.SP_GrabarListaItem(listaItems, User.Identity.Name.Split('-')[0]); //Cuando se implemente la autenticacion cambiar por esta instruccion == Thread.CurrentPrincipal.Identity.Name
            return Json(respuestaSP);
        }
        [HttpPost]
        public ActionResult GrabarListaSP(SD_LISTAS l)//por favor no cambiar la variable l 
        {
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serLista.SP_GrabarLista(l);
            return Json(respuestaSP);
        }
    }
}
