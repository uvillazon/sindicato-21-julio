Ext.define("App.View.Socios.PanelDocumentaciones", {
    extend: "Ext.panel.Panel",
    title: "Documentaciones",
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
        Funciones.CrearMenu('btn_crear', 'Crear<br>Antecedente', Constantes.ICONO_CREAR, me.EventosForm, me.grupo, this);
        Funciones.CrearMenu('btn_editar', 'Editar<br>Antecedente', Constantes.ICONO_EDITAR, me.EventosForm, me.grupo, this, null, true);
        Funciones.CrearMenu('btn_eliminar', 'Eliminar<br>Antecedente', Constantes.ICONO_BAJA, me.EventosForm, me.grupo, this, null, true);
        Funciones.CrearMenu('btn_imagen', 'Agregar<br>Imagen', 'image_add', me.EventosForm, me.grupo, this, null, true);


        me.grid = Ext.create("App.View.Socios.Grids", {
            opcion: 'GridDocumentos',
            height: 200,
            //fbarmenuArray: ['btn_editarFamiliar', 'btn_eliminarFamiliar']
        });
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatosDocumentos, this);
        me.form = Ext.create("App.View.Socios.Forms", {
            title: 'Datos Documentacion',
            columns: 2,
            opcion: 'FormDocumentacion',
            botones: false
        });
        me.formImagen = Ext.create('App.View.Imagenes.ViewImagenes', {
            colspan: 2,
            TABLA: 'SD_DOCUMENTACION',
            height: 200,
        });
        me.form.BloquearFormulario();
        me.items = [
            me.grupo,
            me.grid,
            me.form ,
            me.formImagen
        ];
    },
    CargarDatosDocumentos: function (sel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.documentacion = disabled ? null : selections[0];
        Funciones.DisabledButton("btn_editar", me, disabled);
        Funciones.DisabledButton("btn_eliminar", me, disabled);
        Funciones.DisabledButton("btn_imagen", me, disabled);
        if (!disabled) {
            me.form.loadFormulario("Otros", "ObtenerDocumentacionPorId", { ID_DOCUMENTACION: selections[0].get('ID_DOCUMENTACION') });
            me.formImagen.CargarImagen(selections[0].get('ID_DOCUMENTACION'));
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
            case "btn_crear":
                me.FormDocumentacion(null);
                break;
            case "btn_editar":
                me.FormDocumentacion(me.documentacion);
                break;
            case "btn_eliminar":
                //me.CrearImagen();
                Funciones.AjaxRequestGrid("Otros", "EliminarDocumentacion", me.grid, "Esta seguro de Eliminar la Documentacion?", { ID_DOCUMENTACION: me.documentacion.get('ID_DOCUMENTACION') }, me.grid, null);
                break;
            case "btn_imagen":
                me.CrearImagen();
                break;

            default:
                break;
        }
    },
    FormDocumentacion: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Socios.Forms", {
            title: 'Datos Documentacion',
            columns: 2,
            opcion: 'FormDocumentacion',
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
            //console.dir(params);
            Funciones.AjaxRequestWin("Otros", "GuardarDocumentacion", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });

    },
    CrearImagen: function () {
        var me = this;
        var form = Ext.create("App.View.Imagenes.FormImagen", { opcion: 'FormImagen', grid: me.grid });
        form.MostrarWindowImagen("SD_DOCUMENTACION", me.documentacion.get('ID_DOCUMENTACION'), null);
    },
});