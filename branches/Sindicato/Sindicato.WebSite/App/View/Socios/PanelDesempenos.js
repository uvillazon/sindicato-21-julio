Ext.define("App.View.Socios.PanelDesempenos", {
    extend: "Ext.panel.Panel",
    title: "Desempenos",
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
        Funciones.CrearMenu('btn_crear', 'Crear<br>Desempeno', Constantes.ICONO_CREAR, me.EventosForm, me.grupo, this);
        Funciones.CrearMenu('btn_editar', 'Editar<br>Desempeno', Constantes.ICONO_EDITAR, me.EventosForm, me.grupo, this, null, true);
        Funciones.CrearMenu('btn_eliminar', 'Eliminar<br>Desempeno', Constantes.ICONO_BAJA, me.EventosForm, me.grupo, this, null, true);
        Funciones.CrearMenu('btn_imagen', 'Agregar<br>Imagen', 'image_add', me.EventosForm, me.grupo, this, null, true);


        me.grid = Ext.create("App.View.Socios.Grids", {
            opcion: 'GridDesempenos',
            height: 200,
            //fbarmenuArray: ['btn_editarFamiliar', 'btn_eliminarFamiliar']
        });
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatosDocumentos, this);
        me.form = Ext.create("App.View.Socios.Forms", {
            title: 'Datos Desempenos',
            columns: 2,
            opcion: 'FormDesempenos',
            botones: false
        });
        me.formImagen = Ext.create('App.View.Imagenes.ViewImagenes', {
            colspan: 2,
            TABLA: 'SD_SOCIO_DESEMPENOS',
            height: 200,
        });
        me.form.BloquearFormulario();
        me.items = [
            me.grupo,
            me.grid,
            me.form,
            me.formImagen
        ];
    },
    CargarDatosDocumentos: function (sel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.desempeno = disabled ? null : selections[0];
        Funciones.DisabledButton("btn_editar", me, disabled);
        Funciones.DisabledButton("btn_eliminar", me, disabled);
        Funciones.DisabledButton("btn_imagen", me, disabled);
        if (!disabled) {
            me.form.loadFormulario("Otros", "ObtenerDesempenoPorId", { ID_DESEMPENO: selections[0].get('ID_DESEMPENO') });
            me.formImagen.CargarImagen(selections[0].get('ID_DESEMPENO'));
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
                me.FormDesempeno(null);
                break;
            case "btn_editar":
                me.FormDesempeno(me.desempeno);
                break;
            case "btn_eliminar":
                //me.CrearImagen();
                Funciones.AjaxRequestGrid("Otros", "EliminarDesempeno", me.grid, "Esta seguro de Eliminar el Desempeno?", { ID_DESEMPENO: me.desempeno.get('ID_DESEMPENO') }, me.grid, null);
                break;
            case "btn_imagen":
                me.CrearImagen();
                break;

            default:
                break;
        }
    },
    FormDesempeno: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Socios.Forms", {
            title: 'Datos Desempeno',
            columns: 2,
            opcion: 'FormDesempenos',
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
            Funciones.AjaxRequestWin("Otros", "GuardarDesempeno", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });

    },
    CrearImagen: function () {
        var me = this;
        var form = Ext.create("App.View.Imagenes.FormImagen", { opcion: 'FormImagen', grid: me.grid });
        form.MostrarWindowImagen("SD_SOCIO_DESEMPENOS", me.desempeno.get('ID_DESEMPENO'), null);
    },
});