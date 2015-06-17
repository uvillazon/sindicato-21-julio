Ext.define("App.View.Socios.PanelFamiliares", {
    extend: "Ext.panel.Panel",
    title: "Familiares",
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
        Funciones.CrearMenu('btn_crearFamiliar', 'Crear<br>Familiar', Constantes.ICONO_CREAR, me.EventosForm, me.grupo, this);
        Funciones.CrearMenu('btn_editarFamiliar', 'Editar<br>Familiar', Constantes.ICONO_EDITAR, me.EventosForm, me.grupo, this, null, true);
        Funciones.CrearMenu('btn_imagenFamiliar', 'Agregar<br>Imagen', 'image_add', me.EventosForm, me.grupo, this, null, true);
        //Funciones.CrearMenu('btn_bajaPrimario', 'Baja<br>Auto Primario', 'car_delete', me.EventosForm, me.grupo, this);
        //Funciones.CrearMenu('btn_bajaReemplazo', 'Baja<br>Reemplazo', 'car_delete', me.EventosForm, me.grupo, this);




        me.grid = Ext.create("App.View.Socios.Grids", {
            opcion: 'GridFamiliares',
            height: 200,
            //fbarmenuArray: ['btn_editarFamiliar', 'btn_eliminarFamiliar']
        });
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatosFamiliar, this);
        me.form = Ext.create("App.View.Socios.Forms", {
            title: 'Datos Familiares',
            columns: 2,
            opcion: 'formFamiliar',
            botones: false
        });
        me.formImagen = Ext.create('App.View.Imagenes.ViewImagenes', {
            colspan: 2,
            TABLA: 'SD_FAMILIARES',
            //tamano: 100,
            height: 200,
            //html : 'aaaaaa'
            //ID_TABLA :15
        });
        me.form.BloquearFormulario();
        me.items = [
            me.grupo,
            me.grid,
            me.form,
            me.formImagen
        ];
    },
    CargarDatosFamiliar: function (sel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.familiar = disabled ? null : selections[0];
        Funciones.DisabledButton("btn_editarFamiliar", me, disabled);
        Funciones.DisabledButton("btn_imagenFamiliar", me, disabled);
        if (!disabled) {
            me.form.loadFormulario("Familiares", "ObtenerFamiliarPorId", { ID_FAMILIAR: selections[0].get('ID_FAMILIAR') });
            me.formImagen.CargarImagen(selections[0].get('ID_FAMILIAR'));
            //me.form.formImagen.CargarImagen(selections[0].get('ID_AUTO'));
        }
        else {
            me.form.getForm().reset();
            me.formImagen.CargarImagen(0);
            //me.form.formImagen.CargarImagen(0);
        }

    },
    CargarDatos: function (socio) {
        var me = this;
        me.socio = socio;
        if (me.esSocio) {
            me.grid.getStore().setExtraParams({ ID_SOCIO: socio.get('ID_SOCIO') });
        }
        else {
            me.grid.getStore().setExtraParams({ ID_CHOFER: socio.get('ID_CHOFER') });
        }
        me.grid.getStore().load();

    },
    EventosForm: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_crearFamiliar":
                me.FormFamiliar(null);
                break;
            case "btn_editarFamiliar":
                me.FormFamiliar(me.familiar);
                break;
            case "btn_imagenFamiliar":
                me.CrearImagen();
                break;

            default:
                break;
        }
    },
    FormFamiliar: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Socios.Forms", {
            title: 'Datos Familiares',
            columns: 2,
            opcion: 'formFamiliar',
            botones: false
        });
        if (record != null) {
            form.getForm().loadRecord(record);
        }
        win.add(form);
        win.show();
       
        if (me.esSocio) {
            form.txt_id_socio.setValue(me.socio.get('ID_SOCIO'));
        }
        else {
            form.txt_id_chofer.setValue(me.socio.get('ID_CHOFER'));
        }
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Familiares", "GuardarFamiliar", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });

    },
    CrearImagen: function () {
        var me = this;
        var form = Ext.create("App.View.Imagenes.FormImagen", { opcion: 'FormImagen', grid: me.grid });
        form.MostrarWindowImagen("SD_FAMILIARES", me.familiar.get('ID_FAMILIAR'), null);
    },
});