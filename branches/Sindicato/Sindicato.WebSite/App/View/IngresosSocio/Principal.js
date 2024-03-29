﻿Ext.define("App.View.IngresosSocio.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Clientes',
    accionGrabar: 'GrarbarCliente',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        //Funciones.CrearMenu('btn_Detalle', 'Detalle Socio', 'report', me.EventosPrincipal, me.toolbar, this);
        //Funciones.CrearMenu('btn_ImprimirReporte', 'Imprimir Reporte', 'printer', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Kardex', 'Kardex Socio', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.Socios.GridSocios', {
            region: 'west',
            width: '50%',
            opcion: 'GridSocios',
            fbarmenu: me.toolbar,
            fbarmenuArray: [ "btn_ImprimirReporte", "btn_Kardex"]

        });
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.form = Ext.create("App.View.IngresosSocio.PanelIngresos", {
            region: 'center',
            width: '50%'
        });
      
        //        me.grid.bar.add(me.toolbar);
        me.items = [me.grid, me.form];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];
        if (!disabled) {
            me.form.CargarDatos(selections[0]);

        }
        else {
            me.form.reset();
          
        }
    },
   
    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_Kardex":
                me.VentanaKardex();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    VentanaKardex: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false });
        var grid = Ext.create("App.View.Socios.GridKardex", {
            region: 'center',
            width: 760,
            height: 450,
            id_socio: me.record.get('ID_SOCIO')
        });
        win.add(grid);
        win.show();
    }

});