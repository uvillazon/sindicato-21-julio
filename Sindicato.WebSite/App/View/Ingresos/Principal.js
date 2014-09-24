Ext.define("App.View.Ingresos.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Ingresos',
    accionGrabar: 'GrabarIngresos',
    view: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearIngreso', 'Crear Ingreso', Constantes.ICONO_CREAR, me.EventosIngreso, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', Constantes.ICONO_IMPRIMIR, me.ImprimirReporteGrid, me.toolbar, this);
        // Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosIngreso, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosIngreso, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosIngreso, me.toolbar, this, null, true);

        me.grid = Ext.create('App.View.Ingresos.GridIngresos', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridIngresos',
            toolbar: me.toolbar

        });
        me.items = [me.grid];

        me.grid.on('itemclick', me.onItemClick, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);

    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.recordSelected = record;
        me.id_ingreso = record.get('ID_INGRESO');
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        Funciones.DisabledButton('btn_Editar', me.toolbar, disabled);
        //Funciones.DisabledButton('btn_Detalle', me.toolbar, disabled);
        Funciones.DisabledButton('btn_Eliminar', me.toolbar, disabled);
    },
    EventosIngreso: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_CrearIngreso":
                me.MostrarFormIngreso(true);
                break;
            case "btn_Editar":
                me.MostrarFormIngreso(false, false);
                break;
            case "btn_Detalle":
                me.MostrarFormIngreso(false, true);
                break;
            case "btn_Eliminar":
                me.EliminarRegistro();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    MostrarFormIngreso: function (isNew, block) {
        var me = this;
        if (me.winCrearIngreso == null) {
            me.winCrearIngreso = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar' });
            me.formIngreso = Ext.create("App.View.Ingresos.FormIngreso", {
                columns: 1,
                title: 'Registro de Otros Ingresos ',
                botones: false
            });

            me.winCrearIngreso.add(me.formIngreso);
            me.winCrearIngreso.btn_guardar.on('click', me.GuardarIngresos, this);
        } else {
            me.formIngreso.getForm().reset();
            me.formIngreso.CargarStore();
        }
        if (!isNew && !Funciones.isEmpty(me.recordSelected)) {
            me.formIngreso.ocultarSaldos(false);
            me.formIngreso.CargarStore();
            me.formIngreso.CargarDatos(me.recordSelected);
        } else
            me.formIngreso.ocultarSaldos(true);
        me.winCrearIngreso.show();
    },
    GuardarIngresos: function () {
        var me = this;
        Funciones.AjaxRequestWin('Ingresos', 'GuardarIngreso', me.winCrearIngreso, me.formIngreso, me.grid, 'Esta Seguro de Guardar el Ingreso?', null, me.winCrearIngreso);
    },

    EliminarRegistro: function () {
        var me = this;
        Funciones.AjaxRequestGrid("Ingresos", "EliminarIngreso", me, "Esta Seguro de Eliminar este Registro", { ID_INGRESO: me.id_ingreso }, me.grid, null);
    }

});
