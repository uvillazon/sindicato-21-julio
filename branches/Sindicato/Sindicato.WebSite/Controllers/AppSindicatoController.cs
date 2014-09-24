using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sindicato.WebSite.Controllers
{
    [Authorize]
    public class AppSindicatoController : Controller
    {
        //
        // GET: /AppSindicato/

        public ActionResult Index()
        {
            return View();
        }

    }
}
