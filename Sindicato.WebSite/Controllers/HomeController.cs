using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sindicato.Services.Interfaces;
using Sindicato.Common;

namespace Sindicato.WebSite.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private IListasServices _serLista;

        public HomeController(IListasServices serLista)
        {
            _serLista = serLista;
        }
        public ActionResult Index()
        {
            //ViewBag.Message = "Welcome to ASP.NET MVC!";
            //var filter = new PagingInfo
            //{
            //    page = 1,
            //    start = 1,
            //    limit = 100,
            //    sort = "ID_LISTA",
            //    dir = "ASC",
            //    _dc = 123213,
            //    callback = "sadadsad",
            //    search = null

            //};
            //_serLista.ObtenerListas(filter, null);
            return View();
        }

        public ActionResult About()
        {
            return View();
        }
        [Authorize]
        public ActionResult AppIndex()
        {
            return View();
        }
    }
}
