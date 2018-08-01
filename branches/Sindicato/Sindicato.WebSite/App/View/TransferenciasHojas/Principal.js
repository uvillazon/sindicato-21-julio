Ext.define("App.View.TransferenciasHojas.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.TransferenciasHojas.GridTransferenciasHojas', {
            region: 'center',
            width: '100%',

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Transferencia Hojas', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.grid.AgregarBtnToolbar([me.btn_crear]);

        me.items = [me.grid];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];

    },

    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_crear":
                me.FormCrearTransferenciaHojas();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    
    FormCrearTransferenciaHojas: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Socios.TransferenciasHojasForm", {
            title: 'Datos de la Transferencia de Hojas',
            columns: 2,
            botones: false
        });
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Socios", "GuardarTransferenciaHojas", win, form, me.grid, "Esta Seguro de Guardar", null, win);

        });

    },

  

});