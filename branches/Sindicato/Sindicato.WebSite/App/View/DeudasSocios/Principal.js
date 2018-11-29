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
        me.toolbar = Funciones.CrearMenuBar();
        //Funciones.CrearMenu('btn_Detalle', 'Detalle Socio', 'report', me.EventosPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_Kardex', 'Kardex Caja', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_VerDetalle', 'Ver Recibo', 'report', me.EventosPrincipal, me.toolbar, this, null, true);

        //Funciones.CrearMenu('btn_KardexDestino', 'Kardex Caja Destino', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.DeudasSocios.GridDeudas', {
            region: 'west',
            width: '50%',
            fbarmenu: me.toolbar,
            paramsStore: me.paramsStore,
            noLimpiar : me.noLimpiar,
            fbarmenuArray: ["btn_Kardex", "btn_eliminar", "btn_VerDetalle"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Deuda', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Eliminar Deuda', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);

        me.btn_crear_detalle = Funciones.CrearMenu('btn_crear_detalle', 'Crear Deuda Socio', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_eliminar_detalle = Funciones.CrearMenu('btn_eliminar_detalle', 'Eliminar Deuda Socio', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);

        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_eliminar , me.btn_crear_detalle , me.btn_eliminar_detalle]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");


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
            me.form.getForm().loadRecord(selections[0])
        }
        else {
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
            case "btn_eliminar":
                if (me.record != null && me.record.get('ESTADO') == 'NUEVO') {
                    Funciones.AjaxRequestGrid("Transferencias", "EliminarIngresoPorSocio", me.grid, "Esta seguro de Eliminar la Ingreso?", { ID_INGRESO: me.record.get('ID_INGRESO') }, me.grid, null);
                }
                else {
                    Ext.Msg.alert("Aviso", "Solo se puede ANULAR los ingresos en estado NUEVO");
                }
                break;
            case "btn_Kardex":
                me.VentanaKardex(me.record.get('ID_CAJA'));
                break;
            case "btn_VerDetalle":
                me.VentanaRecibo(me.grid.record.get('ID_INGRESO'));
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    FormCrearIngreso: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.DeudasSocios.FormDeuda", {
            title: 'Datos Deuda',
            columns: 2,
            botones: false,
            paramsStore : me.paramsStore
        });
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            //Funciones.AjaxRequestWin("Ingresos", "GuardarIngreso", win, form, me.grid, "Esta Seguro de Guardar", null, win);
            Funciones.AjaxRequestWinSc("DeudasSocios", "GuardarDeuda", win, form, me.grid, "Esta Seguro de Guardar", null, win, function (result) {
                //console.dir(result);
                me.VentanaRecibo(result.id);
            });
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