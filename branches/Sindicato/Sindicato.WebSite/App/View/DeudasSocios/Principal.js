Ext.define("App.View.DeudasSocios.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    paramsStore: {},
    noLimpiar: [],
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        //var paramsStore = {};


        me.grid = Ext.create('App.View.DeudasSocios.GridDeudas', {
            region: 'west',
            width: '50%',
            fbarmenu: me.toolbar,
            paramsStore: me.paramsStore,
            noLimpiar: me.noLimpiar,
            fbarmenuArray: ["btn_eliminar", "btn_editar", "btn_add_socios"]

        });

        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Tipo Deuda', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_editar = Funciones.CrearMenu('btn_editar', 'Editar Tipo Deuda', Constantes.ICONO_EDITAR, me.EventosPrincipal, null, this, null, true);
        me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Eliminar Tipo Deuda', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.btn_agregar_socios = Funciones.CrearMenu('btn_add_socios', 'Agregar Socios', 'cog', me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_editar, me.btn_eliminar, me.btn_agregar_socios]);



        me.gridDetalles = Ext.create('App.View.DeudasSocios.GridDetalles', {
            width: '100%',
            height: 400,
            cargarStore: false

        });

        me.form = Ext.create("App.View.DeudasSocios.FormDeuda", {
            region: 'center',
            width: '100%',
            columns: 2,
            modoConsulta: true,
        });

        me.form.BloquearFormulario();

        me.panel = Ext.create("Ext.panel.Panel", {
            region: 'center',
            width: '50%',
            items: [me.form, me.gridDetalles]
        });
        me.items = [me.grid, me.panel];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];
        if (!disabled) {
            me.form.getForm().loadRecord(selections[0]);
            me.gridDetalles.getStore().setExtraParams({ ID_DEUDA: me.record.get('ID_DEUDA') });
            me.gridDetalles.getStore().load();
        }
        else {
            me.gridDetalles.getStore().setExtraParams({ ID_DEUDA: 0 });
            me.gridDetalles.getStore().load();
            me.form.getForm().reset();

        }
    },

    EventosPrincipal: function (btn) {
        var me = this;
        //console.log(btn.getItemId());
        switch (btn.getItemId()) {
            case "btn_crear":
                me.FormCrearIngreso();
                break;
            case "btn_editar":
                me.FormCrearIngreso(me.record);
                break;
            case "btn_eliminar":
                Funciones.AjaxRequestGrid("DeudasSocios", "EliminarDeuda", me.grid, "Esta seguro de Eliminar el tipo de Deuda?", { ID_DEUDA: me.record.get('ID_DEUDA') }, me.grid, null);
                break;
            case "btn_Kardex":
                me.VentanaKardex(me.record.get('ID_CAJA'));
                break;
            case "btn_add_socios":
                me.FormCrearSociosDeudas(me.record);
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    FormCrearSociosDeudas: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.DeudasSocios.FormSociosDeuda", {
            title: 'Agregar Socios a Deudas',
            columns: 2,
            botones: false
        });
        win.add(form);
        win.show();
        form.loadRecord(record);
        form.gridDetalles.getStore().setExtraParams({ ID_DEUDA: me.grid.record.get('ID_DEUDA') });
        form.gridDetalles.getStore().load();

    },
    FormCrearIngreso: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.DeudasSocios.FormDeuda", {
            title: 'Datos Deuda',
            columns: 2,
            botones: false,
            paramsStore: me.paramsStore
        });
        win.add(form);
        win.show();
        if (record != null) {
            form.loadRecord(record);
        }
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWinSc("DeudasSocios", "GuardarDeuda", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });

    },
    VentanaKardex: function (id_caja) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false });
        var grid = Ext.create("App.View.Cajas.GridKardexCaja", {
            region: 'center',
            width: 760,
            height: 450,
            id_caja: id_caja
        });
        win.add(grid);
        win.show();

    },
    VentanaRecibo: function (id) {
        fn.VerImpresion("ReporteIngreso", "ID_INGRESO=" + id);
    }

});