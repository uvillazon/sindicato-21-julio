Ext.define("App.View.Egresos.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Egresos',
    accionGrabar: 'GrabarEgresos',
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
        Funciones.CrearMenu('btn_CrearEgreso', 'Crear Egreso', Constantes.ICONO_CREAR, me.EventosEgreso, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        //Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosEgreso, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosEgreso, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosEgreso, me.toolbar, this, null, true);

        me.grid = Ext.create('App.View.Egresos.GridEgresos', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridEgresos',
            toolbar: me.toolbar
        });
        me.items = [me.grid];

        me.grid.on('itemclick', me.onItemClick, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);

    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.recordSelected = record;
        me.id_egreso = record.get('ID_EGRESO');
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        Funciones.DisabledButton('btn_Editar', me.toolbar, disabled);
        // Funciones.DisabledButton('btn_Detalle', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Eliminar', me.toolbar, disabled);
    },
    EventosEgreso: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_CrearEgreso":
                me.MostrarFormEgreso(true);
                break;
            case "btn_Editar":
                me.MostrarFormEgreso(false, false);
                break;
            case "btn_Detalle":
                me.MostrarFormEgreso(false, true);
                break;
            case "btn_Eliminar":
                me.EliminarRegistro();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }

    }, MostrarFormEgreso: function (isNew, block) {
        var me = this;
        if (me.winCrearEgreso == null) {
            me.winCrearEgreso = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar' });
            me.formEgreso = Ext.create("App.View.Egresos.FormEgreso", {
                columns: 1,
                title: ' Registro de Otros Egresos ',
                botones: false
            });

            me.winCrearEgreso.add(me.formEgreso);
            me.winCrearEgreso.btn_guardar.on('click', me.GuardarEgresos, this);
        } else {
            me.formEgreso.CargarStore();
            me.formEgreso.ocultarSaldos(true);
            me.formEgreso.getForm().reset();
        }
        if (!isNew && !Funciones.isEmpty(me.recordSelected)) {
            me.formEgreso.ocultarSaldos(false);
            me.formEgreso.CargarStore();
            me.formEgreso.CargarDatos(me.recordSelected);
        } else
            me.formEgreso.CargarStore();
            me.formEgreso.ocultarSaldos(true);

        me.winCrearEgreso.show();
    },
    GuardarEgresos: function () {
        var me = this;
        Funciones.AjaxRequestWin('Egresos', 'GuardarEgreso', me.winCrearEgreso, me.formEgreso, me.grid, 'Esta Seguro de Guardar el Egreso?', null, me.winCrearEgreso);
    },

    EliminarRegistro: function () {
        var me = this;
        Funciones.AjaxRequestGrid("Egresos", "EliminarEgreso", me, "Esta Seguro de Eliminar este Registro", { ID_EGRESO: me.id_egreso }, me.grid, null);
    }

});
