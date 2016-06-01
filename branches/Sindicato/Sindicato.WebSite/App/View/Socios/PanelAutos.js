Ext.define("App.View.Socios.PanelAutos", {
    extend: "Ext.panel.Panel",
    title: "Autos Socios-Movil",
    mostrarAcciones : true,
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
        me.grupo = Funciones.CrearGrupoBoton("6", "opciones de Moviles");
        me.grupo.setVisible(me.mostrarAcciones);
        Funciones.CrearMenu('btn_autoPrimario', 'Agregar<br>Auto Primario', 'car_add', me.EventosForm, me.grupo, this);
        Funciones.CrearMenu('btn_autoReemplazo', 'Agregar <br>Reemplazo', 'car_add', me.EventosForm, me.grupo, this);
        Funciones.CrearMenu('btn_editarAuto', 'Editar<br>Auto', 'application_form_edit', me.EventosForm, me.grupo, this);
        //Funciones.CrearMenu('btn_bajaPrimario', 'Baja<br>Auto Primario', 'car_delete', me.EventosForm, me.grupo, this);
        //Funciones.CrearMenu('btn_bajaReemplazo', 'Baja<br>Reemplazo', 'car_delete', me.EventosForm, me.grupo, this);
    


      
        me.grid = Ext.create("App.View.Socios.Grids", {
            opcion: 'GridAutomoviles',
            height: 200,
            //fbarmenu: me.toolbarAuto
        });
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatosAuto, this);
        me.form = Ext.create("App.View.Autos.FormAuto", {
            title : 'Datos Automovil',
            columns: 2,
            botones: false
        });
        me.form.BloquearFormulario();
        me.items = [
            me.grupo,
            me.grid,
            me.form
        ];
    },
    CargarDatosAuto: function (sel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];
        if (!disabled) {
            me.form.loadFormulario("Autos", "ObtenerAutoPorId", { ID_AUTO: selections[0].get('ID_AUTO') });
            me.form.formImagen.CargarImagen(selections[0].get('ID_AUTO'));
        }
        else {
            me.form.getForm().reset();
            me.form.formImagen.CargarImagen(0);
        }
      
    },
    CargarDatos: function (socio) {
        var me = this;
        me.socio = socio;
        me.grid.getStore().setExtraParams({ ID_SOCIO_MOVIL: socio.get('ID_SOCIO_MOVIL') });
        me.grid.getStore().load();

    },
    EventosForm: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_autoPrimario":
                me.FormAutoPrincipal("PRINCIPAL");
                break;
            case "btn_autoReemplazo":
                me.FormAutoPrincipal("REEMPLAZO");
                break;
            case "btn_editarAuto":
                if (me.record != null) {
                    me.EditarAuto(me.record);
                }
                else {
                    Ext.Msg.alert("Error", "Seleccione un Auto");
                }
                break;
            default:
                break;
        }
    },
    FormAutoPrincipal: function (tipo) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Socios.FormAutoSocio", {
            title: 'Registro de Automovil Principal',
            opcion: 'FormAutoPrincipal',
            botones: false,
            tipo : tipo
        });
        form.getForm().loadRecord(me.socio);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Socios", "GuardarSocioMovilAutoPrincipal", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });

    },
    EditarAuto: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Socios.Forms.FormAuto", {
            title: 'Datos Socio Movil',
            opcion: 'FormCrearMovil',
            botones: false
        });
        form.loadFormulario("Autos", "ObtenerAutoPorId", { ID_AUTO: record.get('ID_AUTO') });
        //form.loadRecord(record);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Autos", "GuardarAuto", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });
    },
});