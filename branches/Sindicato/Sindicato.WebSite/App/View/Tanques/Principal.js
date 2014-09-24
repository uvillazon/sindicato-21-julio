Ext.define("App.View.Tanques.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Tanques',
    accionGrabar: 'GrabarTanques',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.toolbar = Funciones.CrearMenuBar();

        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.EventosTanques, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Imprimirsa', 'Imprimir S/A', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosTanques, me.toolbar, this);
        Funciones.CrearMenu('btn_AjustarTanque', 'Ajustar', Constantes.ICONO_CREAR, me.EventosTanques, me.toolbar, this);
        Funciones.CrearMenu('btn_RepAjustes', 'Reporte Ajustes', 'report', me.EventosTanques, me.toolbar, this);

        me.grid = Ext.create('App.View.Tanques.GridTanques', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridTanques',
            toolbar: me.toolbar
        });
        me.items = [me.grid];

    },
    EventosTanques: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_AjustarTanque") {
            if (me.winAjustarTanque == null) {
                me.winAjustarTanque = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar' });
                me.formAjustarTanque = Ext.create("App.View.Tanques.FormAjustarTanque", {
                    columns: 1,
                    title: 'Formulario de Ajuste de Tanques ',
                    botones: false
                })

                me.winAjustarTanque.add(me.formAjustarTanque);
                me.winAjustarTanque.show();
            } else {
                me.formAjustarTanque.getForm().reset();
                me.winAjustarTanque.show();
            }
        }
        else if (btn.getItemId() == "btn_RepAjustes") {
            var win = Ext.create("App.Config.Abstract.Window");
            var grid = Ext.create('App.View.Tanques.Grids', { opcion: 'GridAjustes', height: 350, width: 550 });
            win.add(grid);
            grid.getStore().load();
            win.show();
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }

});
