using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sindicato.Services.Interfaces;
using Sindicato.Common;
using Sindicato.Services.Model;
using System.Web.Script.Serialization;
using Sindicato.Model;

namespace Sindicato.WebSite.Controllers
{
    public class FamiliaresController : Controller
    {
        private IFamiliaresServices _serFlia;

        public FamiliaresController(IFamiliaresServices serFlia)
        {
            this._serFlia = serFlia;
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult ObtenerFamiliaresPaginados(PagingInfo paginacion, FiltrosModel<FamiliaresModel> filtros, FamiliaresModel entidad)
        {
            filtros.Entidad = entidad;
            var socios = _serFlia.ObtenerFamiliaresPaginados(paginacion, filtros);
            var formatData = socios.Select(x => new
            {
                ID_FAMILIAR = x.ID_FAMILIAR,
                ID_SOCIO = x.ID_SOCIO,
                ID_CHOFER = x.ID_CHOFER,
                NOMBRE = x.NOMBRE,
                APELLIDO_MATERNO = x.APELLIDO_MATERNO,
                APELLIDO_PATERNO = x.APELLIDO_PATERNO,
                NOMBRE_COMPLETO = string.Format("{0} {1} {2} ", x.NOMBRE, x.APELLIDO_PATERNO, x.APELLIDO_MATERNO),
                PARENTESCO = x.PARENTESCO,
                CI = x.CI,
                EXPEDIDO = x.EXPEDIDO,
                FECHA_NAC = x.FECHA_NAC,
                EDAD = (DateTime.Now.Year - x.FECHA_NAC.Value.Year),
                DIRECCION = x.DIRECCION,
                TELEFONO = x.TELEFONO,
                OBSERVACION = x.OBSERVACION
            });
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string callback1 = paginacion.callback + "(" + javaScriptSerializer.Serialize(new { Rows = formatData, Total = paginacion.total }) + ");";
            return JavaScript(callback1);
        }

        [HttpPost]
        public JsonResult GuardarFamiliar(SD_FAMILIARES fam)
        {
            int id_usr = Convert.ToInt32(User.Identity.Name.Split('-')[3]);
            RespuestaSP respuestaSP = new RespuestaSP();
            respuestaSP = _serFlia.GuardarFamiliar(fam, id_usr);
            return Json(respuestaSP);
        }

    }
}
