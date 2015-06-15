Ext.define("App.View.IngresosSocio.Principal", {
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
        Funciones.CrearMenu('btn_ImprimirReporte', 'Imprimir Reporte', 'printer', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Kardex', 'Kardex Socio', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.Socios.GridSocios', {
            region: 'west',
            width: '50%',
            opcion: 'GridSocios',
            fbarmenu: me.toolbar,
            fbarmenuArray: [ "btn_ImprimirReporte", "btn_Kardex"]

        });
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.form = Ext.create("App.View.IngresosSocio.PanelIngresos", {
            region: 'center',
            width: '50%'
        });
      
        //        me.grid.bar.add(me.toolbar);
        me.items = [me.grid, me.form];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        if (!disabled) {
            me.form.CargarDatos(selections[0]);

        }
        else {
            me.form.reset();
          
        }
    },
   
    EventosPrincipal: function (btn) {
        var me = this;
        //switch (btn.getItemId()) {
        //    case "btn_Detalle":
        //        var win = Ext.create("App.Config.Abstract.Window", { gridLoads: [me.grid] });
        //        var form = Ext.create("App.View.Socios.FormSocio", {
        //            columns: 4,
        //            title: 'Formulario de Registro de Socios (Afiliados) ',
        //            botones: true,
        //            gridPrincipal: me.grid
        //        })
        //        form.BotonesSocio(true);
        //        win.add(form);
        //        win.show();
        //        break;
        //    case "btn_ImprimirReporte":
        //        var win = Ext.create("App.Config.Abstract.Window", { botones: true, title: 'Datos de Reporte' });
        //        var form = Ext.create("App.View.Socios.Forms", { opcion: 'FormReporte' });
        //        win.add(form);
        //        win.show();
        //        win.btn_guardar.on('click', function () {
        //            window.open(Constantes.HOST + 'Reportes/ReporteSocioMovil?fecha=' + form.dat_fecha.getSubmitValue());
        //        });
        //        break;
        //    case "btn_ConfigObligacion":
        //        var win = Ext.create("App.Config.Abstract.Window", { botones: false, title: 'Configuracion de Obligaciones' });
        //        var form = Ext.create("App.View.Socios.FormObligacionSocio", { opcion: 'FormReporte' });
        //        form.loadRecord(me.grid.record);
        //        form.gridObligaciones.getStore().setExtraParams({ ID_SOCIO: me.grid.record.get('ID_SOCIO') });
        //        form.gridObligaciones.getStore().load();
        //        win.add(form);
        //        win.show();

        //        break;
        //    case "btn_Crear":
        //        me.CrearSocio();
        //        break;
        //    case "btn_Editar":
        //        me.CrearSocio();
        //        break;
        //    case "btn_CrearMovil":
        //        me.CrearSocioMovil();
        //        break;
        //    case "btn_EditarMovil":
        //        me.EditarLinea();
        //        break;
        //    case "btn_Imagen":
        //        me.CrearImagen();
        //        break;
        //    default:
        //        Ext.Msg.alert("Aviso", "No Existe el botton");
        //        break;
        //}
    },

});