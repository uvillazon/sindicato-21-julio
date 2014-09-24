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
    public class ParametrosController : Controller
    {
        private IParametrosServices _serPar;

        public ParametrosController(IParametrosServices serPar)
        {
            _serPar = serPar;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerParametros(PagingInfo paginacion,FiltrosModel<ParametrosModel> filtros , ParametrosModel entidad)
        {
            filtros.Entidad = entidad;
            var jsondata = _serPar.ObtenerParametrosPaginados(paginacion, filtros);
            var formattData = jsondata.Select(l => new
            {
                CODIGO = l.CODIGO,
                NOMBRE = l.NOMBRE,
                MONTO = l.MONTO,
                NRO_LINEA = l.SD_LINEAS.NRO_LINEA,
                TIPO = l.TIPO,
                ESTADO = l.ESTADO,
                FECHA_INICIO = l.FECHA_INICIO,
                FECHA_FIN = l.FECHA_FIN
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formattData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);

        }
        
        [HttpPost]
        public ActionResult GrabarListaSP(SD_PARAMETROS_LINEA parametros)//por favor no cambiar la variable l 
        {
            RespuestaSP respuestaSP = new RespuestaSP();
            //respuestaSP = _serLista.SP_GrabarLista(l);
            return Json(respuestaSP);
        }
    }
}
