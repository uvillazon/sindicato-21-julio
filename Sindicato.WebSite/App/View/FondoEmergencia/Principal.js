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
            default :
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
    VentanaReporte: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false, destruirWin: true });
        var form = Ext.create("App.View.FondoEmergencia.ReporteFondoEmergencia", { title: 'Reporte Fondo Emergencia', width: 700, height: 550 });
        win.add(form);
        win.show();

    },
    VentanaDetalleFondo: function () {

    }

});
