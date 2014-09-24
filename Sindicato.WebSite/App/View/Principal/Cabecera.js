/**
 * @class App.View.Principal.Cabecera
 * @extends Ext.Component
 * requires 
 * @autor Ubaldo Villazon
 * @date 23/07/2013
 *
 * Description
 *
 *
 **/

Ext.define("App.View.Principal.Cabecera", {
    extend: "Ext.panel.Panel",
    height: 30,
    region: 'north',
    layout: 'border',
    tabPanel: null,
    split: false,
    panelMenu : null,
    initComponent: function () {
        var me = this;
//        me.flash = Ext.create('Ext.flash.Component', {
//            url: 'Content/banner/banner.swf',
//            region: 'west',
//            height: 60,
//            width: 400,
//        });
        me.cabecera_top = Ext.create('Ext.Component', {
            xtype: 'box',
            id: 'header',
            region: 'west',
            html: '<h1> Sistema de Administracion </h1>',
            height: 30,
            width : '50%',
        });
        me.tb = Ext.create('Ext.toolbar.Toolbar', {
            itemId: 'mainmenu',
            padding: 0,
            margin: 0,
            height: 30,
//            cls: 'ux-start-menu-toolbar',
        });

        me.panel_menubar = new Ext.Panel({
            region: 'east',
//            title : 'sdsadad',
            width: '50%',
//            border: true,
//            margins: '0 0 1 0',
            split: false,
            tbar: me.tb
        });
//        me.panel_bar = Ext.create('Ext.panel.Panel', {
//            height: 60,
//            region: 'center',
//            layout: 'border',
//            items: [me.cabecera_top, me.panel_menubar]
//        });
//        me.items = [me.flash, me.panel_bar];
        me.items = [me.cabecera_top , me.panel_menubar];


        Ext.Ajax.request({
            //url: "MenuJs.js",
            url: "MenuOpciones/ObtenerMenuOpciones",
            method: 'POST',
            scope: this,
            success: this.buildDesktop,
            failure: this.onError
        });
        //me.CargarBandejaEntrada();
//        me.CrearCabeceraLogin(me.tb,null);
        me.callParent();
    },
    onError: function (data) {
        
//        Ext.Msg.alert("Error", "Error al Recuperar los Datos de las Opciones del Menu.");
//        document.location = Constantes.HOST + 'Account/LogOff';
                document.location = Constantes.HOST + 'Account/LogOn';

    },
    buildDesktop: function (data) {
        var me = this;
        var data1 = Ext.decode(data.responseText);
        me.configuracion = data1;

        Constantes.LiSTAS = data1.Listas;
        Constantes.Usuario = data1.Usuario;
        Constantes.Parametros = data1.Parametros;
//        me.CrearMenu(me.tb, data1.Menu);
        me.CrearCabeceraLogin(me.tb, data1.Usuario);
        me.panelMenu.CrearMenu(me.panelMenu,data1);
//        alert("entro");
    },
    CrearCabeceraLogin : function(tb,data){
        var me = this;
//        var NombreUsuario = '<span  style="font-size:11px;height:11px;font-weight: bold;"> Administrador  </span>';
        var NombreUsuario = '<span  style="font-size:11px;height:11px;font-weight: bold;"> ' + data.Perfil + ' : ' + data.Nombre + '  </span>';
        tb.add("->");
        tb.add(NombreUsuario ,{
            text:"Salir (Esc)",
            iconCls: "exclamation",
            tooltip: "Cerrar Session",
            scope: me,
            handler: me.SalirSession
        }
        );

    },
    SalirSession: function () {
        Ext.Msg.confirm("Confirmar", "Esta seguro salir de la aplicación?", function (btn) {
            if (btn === "yes") {
                document.location = Constantes.HOST + 'Account/LogOff';
            }
        });
        //Ext.Msg.alert("Aviso", "Falta Implementar Opcion Salir");
        //var redirect = Constantes.HOST + 'Account/LogOff';
        //window.location = redirect;
    },
    CrearMenu: function (tb, data) {
        var me = this;
        //alert(me.tabPanel.getId());
        Ext.each(data, function (menu) {
            if (menu.menus) {
                var subMenu = Ext.create('Ext.menu.Menu');
                //alert(menu.text);
                tb.add({
                    text: menu.text,
                    iconCls: menu.iconCls,
                    menu: subMenu,
                    tooltip: menu.tooltip,
                    datos: menu,
                    scope: me,
                    handler: me.CargarClase
                });

                me.CrearMenu(subMenu, menu.menus);
            }
            else {
                tb.add({
                    text: menu.text,
                    iconCls: menu.iconCls,
                    menu: subMenu,
                    tooltip: menu.tooltip,
                    datos: menu,
                    scope: me,
                    handler: me.CargarClase
                });
            }
        });
    },
    CargarClase: function (menu) {
        var me = this;
       
            if (menu.datos.clase) {
            //alert(menu.estilo);
            if (menu.datos.estilo == null) {
                var open = !Ext.getCmp(menu.text);
                if (open) {
                    var principal = Ext.create(menu.datos.clase);
                    var tab = new Ext.Panel({
                        id: menu.text,
                        autoHeigth: true,
                        autoWidht: true,
                        title: menu.text,
                        autoScroll: true,
                        iconCls: menu.iconCls,
                        tooltip: menu.tooltip,
                        viewConfig: {
                            forceFit: true,
                        },
                        items: principal,
                        closable: true,

                    });
                    me.tabPanel.add(tab);
                    tab.show();
                }
                else {
                    me.tabPanel.setActiveTab(menu.text);
                }
            }
            else if (menu.datos.estilo == "ventana") {
                var principal = Ext.create(menu.datos.clase).show();
            }
            else {
                //sas
            }
        }

    },
    CargarBandejaEntrada: function () {
        var me = this;
        var principal = Ext.create("App.View.BandejasEntrada.Principal");
        var tab = new Ext.Panel({
            id: "BandejaPrincipal",
            autoHeigth: true,
            autoWidht: true,
            title: "Bandeja de Entrada",
            autoScroll: true,
            iconCls: "email",
            tooltip: "Bandeja de Entrada por Usuario",
            viewConfig: {
                forceFit: true,
            },
            items: principal,
            closable: true,

        });
        me.tabPanel.add(tab);
        tab.show();
    }
});
