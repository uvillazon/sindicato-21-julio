using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sindicato.Model;

namespace Sindicato.WebSite.Models
{
    public class MenuOpcionesModel
    {
        public string text { get; set; }
        public string clase { get; set; }
        public string tooltip { get; set; }
        public string iconCls { get; set; }
        public string estilo { get; set; }
        //public List<MenuOpcionesModel> menus { get; set; }
        //public bool leaf { get; set; }

        public List<MenuOpcionesModel> MenuBotton(IList<SD_MENU_OPCIONES> menus) {
            List<MenuOpcionesModel> result = new List<MenuOpcionesModel>();
            foreach (var item in menus)
            {
                if (item.ESTADO == "A") {
                    MenuOpcionesModel menu = new MenuOpcionesModel();
                    if (item.ID_PADRE == null)
                    {
                        menu.text = item.OPCION;
                        menu.tooltip = item.TOOLTIP;
                        menu.clase = item.LINK;
                        menu.iconCls = item.ICONO;
                        menu.estilo = item.ESTILO;
                        result.Add(menu);
                    }
                }
            }
            return result;
        }
        //public List<MenuOpcionesModel> MenuDinamico(IList<MN_MENU_OPCIONES> menus)
        //{
        //    List<MenuOpcionesModel> result = new List<MenuOpcionesModel>();

        //    foreach (var item in menus)
        //    {
        //        //item.MN_PERFILES_OPCIONES.Single(x=>x.MN_MENU_OPCIONES)
        //        if (item.ESTADO == "A")
        //        {
        //            MenuOpcionesModel menu = new MenuOpcionesModel();
        //            if (item.ID_PADRE == null)
        //            {
        //                menu.text = item.OPCION;
        //                menu.tooltip = item.TOOLTIP;
        //                menu.clase = item.LINK;
        //                menu.iconCls = item.ICONO;
        //                menu.estilo = item.ESTILO;
        //                if (VericiarHijos(menus, item.ID_OPC))
        //                {
        //                    menu.leaf = false;
        //                    menu.menus = BuscarHijos(menus, item.ID_OPC);
        //                }
        //                else
        //                {
        //                    menu.leaf = true;
        //                    menu.menus = null;
        //                }
        //                result.Add(menu);
        //            }
        //        }

        //    }

        //    return result;
        //}
        //public List<MenuOpcionesModel> BuscarHijos(IList<MN_MENU_OPCIONES> menus, int ID_PADRE)
        //{
        //    List<MenuOpcionesModel> result = new List<MenuOpcionesModel>();

        //    foreach (var item in menus)
        //    {
        //        if (item.ID_PADRE == ID_PADRE)
        //        {
        //            if (item.ESTADO == "A")
        //            {
        //                MenuOpcionesModel menu = new MenuOpcionesModel()
        //                {
        //                    text = item.OPCION,
        //                    tooltip = item.TOOLTIP,
        //                    clase = item.LINK,
        //                    iconCls = item.ICONO,
        //                    estilo = item.ESTILO,
        //                    leaf = true
        //                };
        //                if (VericiarHijos(menus, item.ID_OPC))
        //                {
        //                    menu.leaf = false;
        //                    menu.menus = BuscarHijos(menus, item.ID_OPC);
        //                }
        //                else
        //                {
        //                    menu.leaf = true;
        //                    menu.menus = null;
        //                }
        //                result.Add(menu);

        //            }
        //        }

        //    }

        //    return result;
        //}
        //public bool VericiarHijos(IList<MN_MENU_OPCIONES> menus, int ID_PADRE)
        //{
        //    foreach (var item in menus)
        //    {
        //        if (item.ID_PADRE == ID_PADRE)
        //        {
        //            return true;
        //        }
        //    }
        //    return false;
        //}
    }
}