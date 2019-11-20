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
using Newtonsoft.Json;

namespace Sindicato.WebSite.Controllers
{
    public class SgafController : Controller
    {

        [HttpPost]
        public JsonResult VerificarSgaf(string detalles)
        {
            var obj = JsonConvert.DeserializeObject<List<dynamic>>(detalles);
            Random rnd = new Random();
            List<object> result = new List<object>();

            foreach (var item in obj)
            {

                int STATUS = rnd.Next(1, 4);
                object res = new
                {
                    ID_STATUS = STATUS,
                    ID = item.ID.Value,
                    RESULTADO = STATUS == 2 ? "CON ERRORES" : STATUS == 3 ? "CON ADVERTENCIA" : ""

                };
                result.Add(res);
            }

            return Json(new { data = result, success = true, msg = "Proceso Ejecutado Correctamente" });

        }

        [HttpPost]
        public JsonResult procesarSgaf(string detalles)
        {
            Random rnd = new Random();
            int valor = rnd.Next(100);
            return Json(new { success = valor % 2 == 0, msg = valor % 2 == 0 ? "Proceso ejectaudo correctamente" : "Error al procesar" });
        }
    }
}
