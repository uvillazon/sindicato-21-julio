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
    public class ParadasController : Controller
    {
        //
        // GET: /MenuOpciones/
        //private ISociosServices _serSoc;
        private IParadasServices _serPar;
        public ParadasController(IParadasServices serPar )
        {
            _serPar = serPar;
        }
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerParadasPaginados(PagingInfo paginacion, FiltrosModel<ParadasModel> filtros, ParadasModel entidad)
        {
            filtros.Entidad = entidad;
            //var socios = _serSoc.ObtenerSociosPaginados(paginacion, filtros);
            var paradas = _serPar.ObtenerParadasPaginado(paginacion, filtros);
            var formatData = paradas.Select(x => new
            {
                ID_PARADA = x.ID_PARADA,
                ID_CAJA = x.ID_CAJA,
                NOMBRE = x.NOMBRE,
                DESCRIPCION = x.DESCRIPCION,
                DIRECCION = x.DIRECCION,
                ESTADO = x.ESTADO,
                FECHA_FIN = x.FECHA_FIN,
                FECHA_INICIO = x.FECHA_INICIO,
                CAJA = x.SD_CAJAS.NOMBRE,
                RESPONSABLE = x.RESPONSABLE
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }
       
    }
}
