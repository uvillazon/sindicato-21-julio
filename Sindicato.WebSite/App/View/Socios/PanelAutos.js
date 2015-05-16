Ext.define("App.View.Socios.PanelAutos", {
    extend: "Ext.panel.Panel",
    title: "Autos Socios",
    botones: false,
    layout: {
        type: 'vbox',       // Arrange child items vertically
        align: 'stretch',    // Each takes up full width
        padding: 5
    },
    icono: '',
    initComponent: function () {

        //        this.initConfig(config);
        this.initConfig();
        this.callParent(arguments);
        //        return this;
    },
    initConfig: function () {
        var me = this;
        me.toolbarAuto = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearAuto', 'Crear', Constantes.ICONO_CREAR, me.EventosForm, me.toolbarAuto, this);
        Funciones.CrearMenu('btn_EditarAuto', 'Editar', Constantes.ICONO_EDITAR, me.EventosForm, me.toolbarAuto, this, null, true);
        Funciones.CrearMenu('btn_ImagenAuto', 'Imagen', 'image_add', me.EventosForm, me.toolbarAuto, this, null, true);
        me.grid = Ext.create("App.View.Socios.Grids", {
            opcion: 'GridAutomoviles',
            height: 200,
            fbarmenu: me.toolbarAuto
        });
        me.form = Ext.create("App.View.Socios.Forms.FormAuto", {
            //            opcion: 'formFamiliar',
            columns: 2,
            botones: false
        });
        me.formImagen = Ext.create('App.View.Socios.Forms', {
            opcion: 'FormImagen',
            colspan: 2,
            width: 480,
            height: 250,
            //solo cuando el evento esta fuera del formulario se envia el scope
            //            EventosForm : me.EventosForm,
            scope: me
        });
        me.form.BloquearFormulario();
        me.items = [
            me.grid,
            me.formImagen,
            me.form
        ];
    },
    CargarDatos: function (socio) {
        var me = this;
        me.grid.getStore().setExtraParams({ ID_MOVIL: record[0].get('ID_SOCIO_MOVIL') });
        me.grid.getStore().load();

    }
});