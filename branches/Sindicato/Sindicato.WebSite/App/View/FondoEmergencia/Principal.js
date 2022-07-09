Ext.define("App.View.FondoEmergencia.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'FondoEmergencia',
    accionGrabar: 'GrabarFondoEmergencia',
    view: '',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        //me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_detalleFondo', 'Detalle Fondo Emergencia', 'report', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_deposito', 'Deposito', 'arrow_down', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_retiro', 'Retiro', 'arrow_up', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_ImprimirReporte', 'Imprimir Reporte', 'printer', me.EventosPrincipal, me.toolbar, this);
        me.grid = Ext.create('App.View.Choferes.GridChoferes', {
            region: 'center',
            opcion: 'GridPrincipal',
            width: '100%',
            height: '100%',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_detalleFondo", "btn_deposito", "btn_retiro"]

        });
        //        me.grid.bar.add(me.toolbar);
        me.items = [me.grid];

    },
    //Ext.define("App.View.FondoEmergencia.ReporteFondoEmergencia", {

    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_ImprimirReporte":
                me.VentanaReporte();
                break;
            case "btn_detalleFondo":
                me.VentanaDetalleFondo(me.grid.record);
                break;

            case "btn_deposito":
                me.VentanaDepositoRetiro("Deposito");
                break;
            case "btn_retiro":
                me.VentanaDepositoRetiro("Retiro");
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },

    VentanaDepositoRetiro: function (accion) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true, destruirWin: true });
        //var form = Ext.create("App.View.FondoEmergencia.FormRetiroDeposito", { title: 'Reporte Fondo Emergencia', botones: false, accion: accion });
        var form = Ext.create("App.View.FondoEmergencia.FormDepositoRetiro", { title: 'Reporte Fondo Emergencia', botones: false, accion: accion });
        form.loadRecord(me.grid.record);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            var ingreso = accion === "Deposito" ? form.num_monto.getValue() : 0;
            var egreso = accion === "Retiro" ? form.num_monto.getValue() : 0;
            var operacion = accion === "Deposito" ? 'DEPOSITO' : 'RETIRO';
            Funciones.AjaxRequestWin("Choferes", "GuardarFondoEmergenciaChofer", win, form, me.grid, "Esta Seguro de Guardar Los Cambios", { INGRESO: ingreso, EGRESO: egreso, OPERACION: operacion }, win);
        });

    },
    VentanaReporte: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false, destruirWin: true });
        var form = Ext.create("App.View.FondoEmergencia.ReporteFondoEmergencia", { title: 'Reporte Fondo Emergencia', width: 700, height: 550 });
        win.add(form);
        win.show();


    },
    VentanaDetalleFondo: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false, destruirWin: true });
        var form = Ext.create("App.View.FondoEmergencia.DetalleFondoEmergencia", { title: 'Detalle Fondo Emergencia' });
        form.loadRecord(record);
        form.grid.getStore().setExtraParams({ ID_CHOFER: record.get('ID_CHOFER') });
        form.grid.getStore().load();
        win.add(form);
        win.show();
        //App.View.FondoEmergencia.DetalleFondoEmergencia
    }

});
