using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sindicato.Services.Interfaces;
using Sindicato.WebSite.Models;
using System.Web.Script.Serialization;

namespace Sindicato.WebSite.Controllers
{
    public class MenuOpcionesController : Controller
    {
        //
        // GET: /MenuOpciones/
        private IMenuOpcionesServices _serMen;
        private IUsuariosServices _serUsu;
        private IListasServices _serLista;
        private IParametrosServices _serPar;

        public MenuOpcionesController(IMenuOpcionesServices serMen, IUsuariosServices serUsu, IListasServices serLista, IParametrosServices serPar)
        {
            _serMen = serMen;
            _serUsu = serUsu;
            _serLista = serLista;
            _serPar = serPar;
        }

        public ActionResult ObtenerMenuOpciones()
        {
            try
            {
                var id_perfil = User.Identity.Name.Split('-')[2];
                var login = User.Identity.Name.Split('-')[0];

                var usuario = _serUsu.ObtenerUsuariosPorCriterio(x => x.LOGIN.ToUpper() == login.ToUpper()).FirstOrDefault();
                var menus = usuario.SD_PERFILES.SD_PERFILES_OPCIONES.Select(x => x.SD_MENU_OPCIONES);
                menus = menus.OrderBy(x => x.ORDEN);
                //var menus = perfil.MN_PERFILES_OPCIONES.Select(x => x.MN_MENU_OPCIONES);

                //var menu = _mnMenOpcMng.ObtenerMenuOpciones(null);
                //menus = menus.OrderBy(x => x.ID_OPC);
                MenuOpcionesModel menu1 = new MenuOpcionesModel();
                var listas = _serLista.ObtenerTodasListas().Select(l => new {
                    ID_LISTA = l.ID_LISTA,
                    LISTA = l.LISTA
                });
                var parametros = _serPar.ObtenerParametros(x => x.ESTADO == "VIGENTE").Select(x => new {
                    NOMBRE = x.NOMBRE,
                    MONTO = x.MONTO
                }).ToList();
                var menuOpciones = menu1.MenuBotton(menus.ToList());
                var Usr = new
                {
                    Login = usuario.LOGIN,
                    Nombre = usuario.NOMBRE,
                    Perfil = usuario.SD_PERFILES.NOMBRE,
                    Parada = usuario.SD_PERFILES.SD_PARADAS == null ? null : usuario.SD_PERFILES.SD_PARADAS.NOMBRE,
                    ID_PARADA = usuario.SD_PERFILES.SD_PARADAS == null ? 0 : usuario.SD_PERFILES.SD_PARADAS.ID_PARADA,
                    Caja = usuario.SD_PERFILES.SD_PARADAS == null ? null : usuario.SD_PERFILES.SD_PARADAS.SD_CAJAS.NOMBRE,
                    ID_CAJA = usuario.SD_PERFILES.SD_PARADAS == null ? 0 : usuario.SD_PERFILES.SD_PARADAS.ID_CAJA
                };
                //var result = menu1.MenuDinamico(menus.ToList());
                return Json(new { Usuario = Usr , Menu = menuOpciones ,Listas = listas , Parametros  = parametros});
            }
            catch (Exception)
            {
                return Json(new { success = false, msg = "Se produjo un error al intentar recuperar el menu de opciones" });
            }

        }
        public ActionResult GetAllTablas(int page, int start, int limit, string sort, string dir, long _dc, string callback, string condicion = null, string codigo = null)
        {

            var query = _serMen.ObtenerCamposTabla(x => x.TABLA.ToUpper() == condicion.ToUpper());
            query = query.OrderBy(x => x.ID_TABLA);
            
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            //javaScriptSerializer.MaxJsonLength = 50000000;
            string callback1 = callback + "(" + javaScriptSerializer.Serialize(new { Total = query.Count() , Rows = query }) + ");";
            return JavaScript(callback1);

        }


    }
}
