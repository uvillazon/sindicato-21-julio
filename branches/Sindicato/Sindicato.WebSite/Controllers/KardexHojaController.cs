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
    public class KardexHojaController : Controller
    {
        //
        // GET: /MenuOpciones/
        private IKardexHojasServices _serkar;
        public KardexHojaController(IKardexHojasServices serkar)
        {
            _serkar = serkar;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerKardexHojaPaginados(PagingInfo paginacion, FiltrosModel<AutosModel> filtros, AutosModel entidad , string codigo)
        {
            filtros.Entidad = entidad;
            var autos = _serkar.ObtenerKardex(paginacion, filtros , codigo);
            
            //var query = _serkar.ObtenerMesDeKardex();

            var formatData = autos.Select(x => new
            {
                CANT_HOJAS = x.CANT_HOJAS,
                CANT_HOJAS_OBLIG = x.CANT_HOJAS_OBLIG,
                CANT_REGULACIONES = x.CANT_REGULACIONES,
                DEBE = x.DEBE,
                ID_KARDEX = x.ID_KARDEX,
                ID_SOCIO_MOVIL = x.ID_SOCIO_MOVIL,
                MES = x.MES,
                SOCIO =x.SD_SOCIO_MOVILES.SD_SOCIOS.ObtenerNombreSocio(),
                NRO_MOVIL = x.SD_SOCIO_MOVILES.SD_MOVILES.NRO_MOVIL
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
    }
}
