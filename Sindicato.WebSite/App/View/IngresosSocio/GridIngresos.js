Ext.define("App.View.IngresosSocio.GridIngresos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Ingreso',
    tamBusqueda: 50,
    title: 'Ingresos Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.IngresosSocio.Ingresos");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro <br>Recibo", width: 100, sortable: false, dataIndex: "NRO_RECIBO" },
                { header: "Fecha", width: 150, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Detalle", width: 250, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Importe<br>Ingreso BOB", width: 100, sortable: false, dataIndex: "INGRESO" },
                { header: "Login", width: 100, sortable: false, dataIndex: "LOGIN" }
        ];


    }
});