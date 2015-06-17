Ext.define("App.View.Choferes.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    view: '',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        //me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        //        Funciones.CrearMenu('btn_Crear', 'Nuevo', Constantes.ICONO_CREAR, me.EventosCliente, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosCliente, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosCliente, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle Chofer (F4)', 'report', me.EventosPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_CambiarGarante', 'Cambiar Garante', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Historico', 'Historico Garantes', 'report', me.EventosPrincipal, me.toolbar, this,null,true);

        me.grid = Ext.create('App.View.Choferes.GridChoferes', {
            region: 'center',
            opcion: 'GridPrincipal',
            width: '100%',
            height: '100%',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_CambiarGarante", "btn_Historico"]

        });
        //        me.grid.bar.add(me.toolbar);
        me.items = [me.grid];
        //me.grid.on('itemclick', me.onItemClick, this);

    },
    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_CambiarGarante":
                me.VentanaCambioGarante();
                break;
            case "btn_Detalle":
                me.MostrarForm();
                break;
            case "btn_Historico":
                me.VentanaHistorico();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    VentanaCambioGarante: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Cambio Garante', destruirWin: true });
        var form = Ext.create("App.View.Choferes.FormCambioGarante", { botones: false, });
        //form.loadRecord(me.grid.record);
        win.add(form);
        win.show();
        form.CargarDatos(me.grid.record);
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Choferes", "GuardarCambioGarante", win, form, me.grid, "Esta Seguro de Guardar Los Cambios", null, win);
        });
    },
    VentanaHistorico : function(){
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false,  destruirWin: true });
        var grid = Ext.create("App.View.Choferes.Grids", { opcion: 'GridHistoricoGarante', width: 550, height: 400 });
        grid.getStore().setExtraParams({ ID_CHOFER: me.grid.record.get('ID_CHOFER') });
        grid.getStore().load();
        win.add(grid);
        win.show();
       
    },
    MostrarForm: function () {
        var me = this;
        if (me.win == null) {
            me.win = Ext.create("App.Config.Abstract.Window");
            me.form = Ext.create("App.View.Choferes.FormChofer", {
                columns: 4,
                title: 'Formulario de Registro de Choferes ',
                botones: true,
                gridPrincipal: me.grid
            })
            me.form.BotonesChofer(true);
            me.win.add(me.form);
        } else {
            me.form.getForm().reset();
        }

        if (!Funciones.isEmpty(me.recordSelected)) {
            me.form.cargarDatos(me.recordSelected);
        }
        me.win.show();
        me.form.Bloquear();
    }
});
