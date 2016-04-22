Ext.define("App.View.Socios.Principal", {
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
        Funciones.CrearMenu('btn_ReporteSocioMovilHoja', 'Reporte Socios Hoja', 'printer', me.EventosPrincipal, me.toolbar, this, null, false);
        //Funciones.CrearMenu('btn_Detalle', 'Detalle Socio', 'report', me.EventosPrincipal, me.toolbar, this);
        //Funciones.CrearMenu('btn_ImprimirReporte', 'Imprimir Reporte', 'printer', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_ConfigHoja', 'Config Hoja', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Kardex', 'Kardex Socio', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.Socios.GridSocios', {
            region: 'west',
            width: '50%',
            opcion: 'GridSocios',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_ConfigObligacion", "btn_ImprimirReporte", "btn_Editar", "btn_EditarMovil", "btn_Imagen", "btn_Kardex", "btn_ConfigHoja"]

        });
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.btn_crear = Funciones.CrearMenu('btn_Crear', 'Crear Socio', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_editar = Funciones.CrearMenu('btn_Editar', 'Modificar Socio', 'user_edit', me.EventosPrincipal, null, this, null, true);
        me.btn_crearMovil = Funciones.CrearMenu('btn_CrearMovil', 'Crear Movil', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this, null, false);
        me.btn_editarMovil = Funciones.CrearMenu('btn_EditarMovil', 'Modificar Movil', Constantes.ICONO_EDITAR, me.EventosPrincipal, null, this, null, true);
        me.btn_crearImagen = Funciones.CrearMenu('btn_Imagen', 'Imagen', 'image_add', me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_editar, me.btn_crearMovil, me.btn_editarMovil, me.btn_crearImagen]);

        me.form = Ext.create("App.View.Socios.FormSocio", {
            title: 'Datos Socio',
            botones: false
        });
        me.form.BloquearFormulario();
        me.panelAutos = Ext.create("App.View.Socios.PanelAutos");
        me.panelFamiliar = Ext.create("App.View.Socios.PanelFamiliares");
        me.panelAntecedente = Ext.create("App.View.Socios.PanelAntecedentes");
        me.panelDocumentaciones = Ext.create("App.View.Socios.PanelDocumentaciones");
        me.panelDesempeno = Ext.create("App.View.Socios.PanelDesempenos");
        me.tabPanel = Ext.create('Ext.tab.Panel', {
            items: [
                me.form, me.panelAutos, me.panelFamiliar, me.panelAntecedente, me.panelDocumentaciones, me.panelDesempeno
            ],
            region: 'center',
            width: '50%'
        });
        //        me.grid.bar.add(me.toolbar);
        me.items = [me.grid, me.tabPanel];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    CargarGridSocio: function () {
        var me = this;
    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.socio = disabled ? null : selections[0];
        if (!disabled) {
            me.form.loadRecord(selections[0]);
            me.form.formImagen.CargarImagen(selections[0].get('ID_SOCIO'));
            me.tabPanel.getLayout().setActiveItem(0);
            me.panelAutos.setDisabled(false);
            me.panelAutos.CargarDatos(selections[0]);
            me.panelFamiliar.setDisabled(false);
            me.panelFamiliar.CargarDatos(selections[0]);
            me.panelAntecedente.setDisabled(false);
            me.panelAntecedente.CargarDatos(selections[0]);
            me.panelDocumentaciones.setDisabled(false);
            me.panelDocumentaciones.CargarDatos(selections[0]);
            me.panelDesempeno.setDisabled(false);
            me.panelDesempeno.CargarDatos(selections[0]);

        }
        else {
            me.form.getForm().reset();
            me.form.formImagen.CargarImagen(0);
            me.tabPanel.getLayout().setActiveItem(0);
            me.panelAutos.setDisabled(true);
            me.panelFamiliar.setDisabled(true);
            me.panelAntecedente.setDisabled(true);
            me.panelDocumentaciones.setDisabled(true);
            me.panelDesempeno.setDisabled(true);
            //me..setActiveTab(me.form);

        }
    },
    //        me.cbx_socio.on('select', function (cmb, record) {
    //            me.loadRecord(record[0]);
    //            me.record = record[0];
    //            Funciones.BloquearFormularioReadOnly(me, ["ID_SOCIO1"], "botones");
    //            me.gridFamiliares.getStore().setExtraParams({ ID_SOCIO: record[0].get('ID_SOCIO') });
    //            me.gridFamiliares.getStore().load();
    //            me.gridAutos.getStore().setExtraParams({ ID_MOVIL: record[0].get('ID_MOVIL') });
    //            me.gridAutos.getStore().load();
    ////            alert("asdas2");
    //            me.formImagen.CargarImagen(record[0].get('ID_IMG'));
    //        });
    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_Detalle":
                var win = Ext.create("App.Config.Abstract.Window", { gridLoads: [me.grid] });
                var form = Ext.create("App.View.Socios.FormSocio", {
                    columns: 4,
                    title: 'Formulario de Registro de Socios (Afiliados) ',
                    botones: true,
                    gridPrincipal: me.grid
                })
                form.BotonesSocio(true);
                win.add(form);
                win.show();
                break;
            case "btn_ImprimirReporte":
                var win = Ext.create("App.Config.Abstract.Window", { botones: true, title: 'Datos de Reporte' });
                var form = Ext.create("App.View.Socios.Forms", { opcion: 'FormReporte' });
                win.add(form);
                win.show();
                win.btn_guardar.on('click', function () {
                    window.open(Constantes.HOST + 'Reportes/ReporteSocioMovil?fecha=' + form.dat_fecha.getSubmitValue());
                });
                break;
            case "btn_ReporteSocioMovilHoja":
                Funciones.ImprimirReport("ReporteSocioMovilHoja", null);
                break;
            case "btn_ConfigObligacion":
                var win = Ext.create("App.Config.Abstract.Window", { botones: false, title: 'Configuracion de Obligaciones' });
                var form = Ext.create("App.View.Socios.FormObligacionSocio", { opcion: 'FormReporte' });
                form.loadRecord(me.grid.record);
                form.gridObligaciones.getStore().setExtraParams({ ID_SOCIO: me.grid.record.get('ID_SOCIO') });
                form.gridObligaciones.getStore().load();
                win.add(form);
                win.show();

                break;
            case "btn_ConfigHoja":
                var win = Ext.create("App.Config.Abstract.Window", { botones: false, title: 'Configuracion de Obligaciones' });
                var form = Ext.create("App.View.Socios.FormObligacionSocioHoja", { opcion: 'FormReporte' });
                form.loadRecord(me.grid.record);
                form.gridObligaciones.getStore().setExtraParams({ ID_SOCIO_MOVIL: me.grid.record.get('ID_SOCIO_MOVIL') });
                form.gridObligaciones.getStore().load();
                win.add(form);
                win.show();
                break;
            case "btn_Crear":
                me.CrearSocio(null);
                break;
            case "btn_Editar":
                me.CrearSocio(me.grid.record);
                break;
            case "btn_CrearMovil":
                me.CrearSocioMovil();
                break;
            case "btn_EditarMovil":
                me.EditarLinea();
                break;
            case "btn_Imagen":
                me.CrearImagen();
                break;
            case "btn_Kardex":
                me.VentanaKardex();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    CrearSocio: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Socios.Forms", {
            title: 'Datos Socio',
            opcion: 'FormSocio',
            botones: false
        });
        if (record != null) {
            form.loadRecord(record);
        }
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Socios", "GuardarSocio", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });
        win.add(form);
        win.show();
    },
    EditarLinea: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Socios.Forms", {
            title: 'Datos Socio Movil',
            opcion: 'FormMovil',
            botones: false
        });
        Funciones.BloquearFormularioReadOnly(form, ["FECHA_ALTA", "OBSERVACION", "DESCRIPCION", "TIPO_MOVIL"], "botones");
        //        form.loadRecord(me.record);
        form.loadFormulario('Socios', 'ObtenerSocioMovil', { ID_SOCIO_MOVIL: me.grid.record.get('ID_SOCIO_MOVIL') });
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Socios", "GuardarSocioMovil", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });
    },
    CrearSocioMovil: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Socios.Forms", {
            title: 'Datos Socio Movil',
            opcion: 'FormCrearMovil',
            botones: false
        });
        //        form.loadRecord(me.record);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Socios", "GuardarNuevoSocioMovilPrimario", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });
    },
    //CargarFormCrearMovil
    CrearImagen: function () {
        var me = this;
        var form = Ext.create("App.View.Imagenes.FormImagen", { opcion: 'FormImagen', grid: me.grid });
        form.MostrarWindowImagen("SD_SOCIOS", me.grid.record.get('ID_SOCIO'), null);
    },
    VentanaKardex: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false });
        var grid = Ext.create("App.View.Socios.GridKardex", {
            region: 'center',
            width: 760,
            height: 450,
            id_socio: me.socio.get('ID_SOCIO')
        });
        win.add(grid);
        win.show();
    }
});