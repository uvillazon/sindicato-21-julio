Ext.define("App.View.Choferes.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        //Funciones.CrearMenu('btn_Detalle', 'Detalle Socio', 'report', me.EventosPrincipal, me.toolbar, this);
        //Funciones.CrearMenu('btn_Detalle', 'Detalle Chofer', 'report', me.EventosPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_CambiarGarante', 'Cambiar Garante', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Historico', 'Historico Garantes', 'report', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.Choferes.GridChoferes', {
            region: 'west',
            width: '50%',
            opcion: 'GridPrincipal',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_CambiarGarante", "btn_Historico", "btn_Editar", "btn_Imagen"]

        });
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.btn_crear = Funciones.CrearMenu('btn_Crear', 'Crear Chofer', 'user_add', me.EventosPrincipal, null, this);
        me.btn_editar = Funciones.CrearMenu('btn_Editar', 'Modificar Chofer', 'user_edit', me.EventosPrincipal, null, this, null, true);
        me.btn_crearImagen = Funciones.CrearMenu('btn_Imagen', 'Imagen', 'image_add', me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_editar, me.btn_crearMovil, me.btn_editarMovil, me.btn_crearImagen]);

        me.form = Ext.create("App.View.Choferes.FormChofer", {
            title: 'Datos Chofer',
            botones: false
        });
        me.form.BloquearFormulario();
        me.panelFamiliar = Ext.create("App.View.Socios.PanelFamiliares", { esSocio: false });
        me.panelAntecedente = Ext.create("App.View.Socios.PanelAntecedentes", { esSocio: false });
        me.panelDocumentaciones = Ext.create("App.View.Socios.PanelDocumentaciones", { esSocio: false });
        me.tabPanel = Ext.create('Ext.tab.Panel', {
            items: [
                me.form, me.panelFamiliar, me.panelAntecedente, me.panelDocumentaciones
            ],
            region: 'center',
            width: '50%'
        });
        //        me.grid.bar.add(me.toolbar);
        me.items = [me.grid, me.tabPanel];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.chofer = disabled ? null : selections[0];
        if (!disabled) {
            me.form.loadRecord(selections[0]);
            me.form.formImagen.CargarImagen(selections[0].get('ID_CHOFER'));
            me.tabPanel.getLayout().setActiveItem(0);
            me.panelFamiliar.setDisabled(false);
            me.panelFamiliar.CargarDatos(selections[0]);
            me.panelAntecedente.setDisabled(false);
            me.panelAntecedente.CargarDatos(selections[0]);
            me.panelDocumentaciones.setDisabled(false);
            me.panelDocumentaciones.CargarDatos(selections[0]);

        }
        else {
            me.form.getForm().reset();
            me.form.formImagen.CargarImagen(0);
            me.tabPanel.getLayout().setActiveItem(0);
            me.panelFamiliar.setDisabled(true);
            me.panelAntecedente.setDisabled(true);
            me.panelDocumentaciones.setDisabled(true);
            //me..setActiveTab(me.form);

        }
    },
    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_CambiarGarante":
                me.VentanaCambioGarante();
                break;
            case "btn_Historico":
                me.VentanaHistorico();
                break;
            case "btn_Crear":
                me.CrearChofer(null);
                break;
            case "btn_Editar":
                me.CrearChofer(me.grid.record);
                break;
            case "btn_Imagen":
                me.CrearImagen();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    CrearChofer: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Choferes.Forms", {
            title: 'Datos Socio',
            opcion: 'FormChofer',
            botones: false
        });
        if (record != null) {
            Funciones.DesbloquearFormularioReadOnly(form, ["FECHA_BAJA", "ESTADO", "NOMBRE_SOCIO"], false);
            form.loadRecord(record);
        }
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Choferes", "GuardarChofer", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });
        win.add(form);
        win.show();
    },
    VentanaCambioGarante: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Cambio Garante', destruirWin: true });
        var form = Ext.create("App.View.Choferes.FormCambioGarante", { botones: false, });
        //form.loadRecord(me.grid.record);
        win.add(form);
        win.show();
        form.CargarDatos(me.grid.record);
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Choferes", "GuardarCambioGarante", win, form, me.grid, "Esta Seguro de Guardar Los Cambios", null, win);
        });
    },
    VentanaHistorico: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false, destruirWin: true });
        var grid = Ext.create("App.View.Choferes.Grids", { opcion: 'GridHistoricoGarante', width: 550, height: 400 });
        grid.getStore().setExtraParams({ ID_CHOFER: me.grid.record.get('ID_CHOFER') });
        grid.getStore().load();
        win.add(grid);
        win.show();

    },
    //CargarFormCrearMovil
    CrearImagen: function () {
        var me = this;
        var form = Ext.create("App.View.Imagenes.FormImagen", { opcion: 'FormImagen', grid: me.grid });
        form.MostrarWindowImagen("SD_CHOFERES", me.grid.record.get('ID_CHOFER'), null);
    },
   
});