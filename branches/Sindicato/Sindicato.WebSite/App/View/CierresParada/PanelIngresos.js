Ext.define("App.View.IngresosSocio.PanelIngresos", {
    extend: "Ext.panel.Panel",
    title: "Ingresos Clientes",
    mostrarAcciones: true,
    botones: false,
    esSocio: true,
    layout: {
        type: 'vbox',       // Arrange child items vertically
        align: 'stretch',    // Each takes up full width
        padding: 5
    },
    icono: '',
    esSocio: true,
    initComponent: function () {

        //        this.initConfig(config);
        this.initConfig();
        this.callParent(arguments);
        //        return this;
    },
    initConfig: function () {
        var me = this;
        me.grupo = Funciones.CrearGrupoBoton("6", "opciones de Registro");
        me.grupo.setVisible(me.mostrarAcciones);
        Funciones.CrearMenu('btn_crear', 'Crear<br>Ingreso', Constantes.ICONO_CREAR, me.EventosForm, me.grupo, this);
        //Funciones.CrearMenu('btn_editar', 'Editar<br>Antecedente', Constantes.ICONO_EDITAR, me.EventosForm, me.grupo, this, null, true);
        Funciones.CrearMenu('btn_eliminar', 'Eliminar<br>Ingreso', Constantes.ICONO_BAJA, me.EventosForm, me.grupo, this, null, true);
        //Funciones.CrearMenu('btn_imagen', 'Agregar<br>Imagen', 'image_add', me.EventosForm, me.grupo, this, null, true);


        me.grid = Ext.create("App.View.IngresosSocio.GridIngresos", {
            height: 350,
            cargarStore : false
            //fbarmenuArray: ['btn_editarFamiliar', 'btn_eliminarFamiliar']
        });
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatosDocumentos, this);
        me.form = Ext.create("App.View.IngresosSocio.FormIngreso", {
            title: 'Recibo Ingreso',
            columns: 2,
            botones: false
        });
        me.form.ocultarSaldos(false);
        me.form.BloquearFormulario();
        me.items = [
            me.grupo,
            me.grid,
            me.form
        ];
    },
    CargarDatosDocumentos: function (sel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.ingreso = disabled ? null : selections[0];
        Funciones.DisabledButton("btn_eliminar", me, disabled);
        if (!disabled) {
            me.form.loadFormulario("Socios", "ObtenerIngresoPorId", { ID_INGRESO: selections[0].get('ID_INGRESO') });
        }
        else {
            me.form.getForm().reset();
        }

    },
    CargarDatos: function (socio) {
        var me = this;
        me.socio = socio;
        me.grid.getStore().setExtraParams({ ID_SOCIO: socio.get('ID_SOCIO') });
        me.grid.getStore().load();

    },
    reset: function () {
        var me = this;
        me.grid.getStore().setExtraParams({ ID_SOCIO: 0 });
        me.grid.getStore().load();
        me.form.getForm().reset();
        
    },
    EventosForm: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_crear":
                me.FormCrearIngreso(null);
                break;

            case "btn_eliminar":
                //me.CrearImagen();
                Funciones.AjaxRequestGrid("Socios", "EliminarIngreso", me.grid, "Esta seguro de Eliminar el Ingreso?", { ID_INGRESO: me.ingreso.get('ID_INGRESO') }, me.grid, null);
                break;
            default:
                break;
        }
    },
    FormCrearIngreso: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.IngresosSocio.FormIngreso", {
            title: 'Datos Ingresos Socios',
            columns: 2,
            botones: false
        });
        form.getForm().loadRecord(me.socio);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            Funciones.AjaxRequestWin("Socios", "GuardarIngreso", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });

    },
    CrearImagen: function () {
        var me = this;
        var form = Ext.create("App.View.Imagenes.FormImagen", { opcion: 'FormImagen', grid: me.grid });
        form.MostrarWindowImagen("SD_DOCUMENTACION", me.documentacion.get('ID_DOCUMENTACION'), null);
    },
});