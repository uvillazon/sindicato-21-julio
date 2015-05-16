Ext.define("App.View.Autos.Principal", {
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
        Funciones.CrearMenu('btn_Crear', 'Crear Auto', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this, null, false);
        Funciones.CrearMenu('btn_Editar', 'Editar Auto', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Imagen', 'Imagen', 'image_add', me.EventosPrincipal, me.toolbar, this, null, true);


        me.grid = Ext.create('App.View.Autos.GridAutos', {
            region: 'west',
            width: '50%',
            opcion: 'GridSocios',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_Editar", "btn_Imagen"]

        });

        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_editar, me.btn_crearMovil, me.btn_editarMovil, me.btn_crearImagen]);

        me.form = form = Ext.create("App.View.Autos.FormAuto", {
            title: 'Datos Automovil',
            botones: false,
            region: 'center',
            width: '50%',
        });
        //me.form.BloquearFormulario();

        me.items = [me.grid, me.form];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    CargarGridSocio: function () {
        var me = this;
    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        if (!disabled) {
            me.form.loadRecord(selections[0]);
            me.form.formImagen.CargarImagen(selections[0].get('ID_AUTO'));
        }
        else {
            me.form.getForm().reset();
            me.form.formImagen.CargarImagen(0);

        }
    },
    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_Crear":
                me.CrearAuto(false);
                break;
            case "btn_Editar":
                me.CrearAuto(true);
                break;
            case "btn_Imagen":
                me.CrearImagen();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },

    CrearAuto: function (editar) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Socios.Forms.FormAuto", {
            title: 'Datos Socio Movil',
            opcion: 'FormCrearMovil',
            botones: false
        });
        if (me.grid.record != null && editar) {
            form.loadRecord(me.grid.record);
        }
        //        form.loadRecord(me.record);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Autos", "GuardarAuto", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });
    },
    //CargarFormCrearMovil
    CrearImagen: function () {
        var me = this;
        var form = Ext.create("App.View.Imagenes.FormImagen", { opcion: 'FormImagen', grid: me.grid });
        form.MostrarWindowImagen("SD_AUTOS", me.grid.record.get('ID_AUTO'), null);
    },

});