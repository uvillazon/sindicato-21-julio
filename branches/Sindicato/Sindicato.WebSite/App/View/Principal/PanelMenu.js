Ext.define("App.View.Principal.PanelMenu", {
    extend: "Ext.Panel",
    //    title:'DIAGRAMAS TRANSICION ESTADOS',
    defaults: {
        bodyStyle: 'padding:2px'
    },
    activeTab: 0,
    data: '',
    layout: {
        type: 'table',
        columns: 5
    },
    tabPanel: null,
    initComponent: function () {
        var me = this;
//        me.buttonuno = Ext.create('Ext.Button', {
//            text: 'Modulo <br> Ventas',
//            width : 200,
//            height : 100,
//            scale: 'large',
//            padding : 10,
//            margin : 10,
//            datos : null,
//            clase : 'App.View.Ventas.Principal'
//        });
//        me.buttondos = Ext.create('Ext.Button', {
//            width : 200,
//            height : 100,
//            text: 'Modulo <br> Compras',
//            scale: 'large',
//             padding : 10,
//            margin : 10
//        });
//        me.buttontres = Ext.create('Ext.Button', {
//            width : 200,
//            height : 100,
//            text: 'Modulo <br> Efectivos',
//            scale: 'large',
//             padding : 10,
//            margin : 10
//        });
//        me.buttoncuatro = Ext.create('Ext.Button', {
//            width : 200,
//            height : 100,
//            text: 'Modulo <br> Reportes',
//            scale: 'large',
//             padding : 10,
//            margin : 10
//        });
//        this.items = [
//        me.buttonuno,
//        me.buttondos,
//        me.buttontres,
//        me.buttoncuatro
//        ];
//        me.buttonuno.on('click',me.CargarPanel,this);
//        Ext.Ajax.request({
//            url: "MenuOpciones/ObtenerMenuOpciones",
//            method: 'POST',
//            //url:'http://localhost:89/demo/extjs/crysfel-Bleextop-7fdca2b/index.php/desktop/config',
//            scope: this,
//            success: this.buildDesktop,
//            failure: this.onError
//        });
        this.callParent(arguments);

    },
    CrearMenu: function (panel,data) {
        var me = this;
        //alert(me.tabPanel.getId());
        Ext.each(data.Menu, function (menu) {
//            alert(menu.text);
            var menubtn = Ext.create('Ext.Button',{
                text: menu.text,
                iconCls: menu.iconCls,
                cls: 'botonesBtn',
                iconAlign: 'top',
                textAlign : 'center',
                scale: 'button48',
                width : Constantes.BTNANCHO,
                height : Constantes.BTNALTO,
                tooltip: menu.tooltip,
                margin : 10,
                datos: menu,
                scope: me,
                handler: me.CargarPanel
            });
            panel.add(menubtn);
        });
    },
    CargarPanel : function(btn){
        var me = this;
//        alert(btn.datos);
        if (btn.datos != null) {
            var open = !Ext.getCmp(btn.datos.text);
            if (open) {
                var principal = Ext.create(btn.datos.clase);
                var tab = new Ext.Panel({
                    id: btn.datos.text,
                    autoHeigth: true,
                    autoWidht: true,
                    title: btn.datos.text,
                    autoScroll: true,
                    iconCls: btn.datos.iconCls,
                    tooltip: btn.datos.tooltip,
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
                me.tabPanel.setActiveTab(btn.text);
            }
        }
//        else if (menu.datos == "ventana") {
//            var principal = Ext.create(btn.clase).show();
//        }
        else{
            Ext.Msg.alert("Aviso","No tiene Opcion");
        }
    }
});