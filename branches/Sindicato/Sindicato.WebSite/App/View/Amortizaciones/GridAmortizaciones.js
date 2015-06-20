Ext.define("App.View.Amortizaciones.GridAmortizaciones", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Amortizaciones',
    tamBusqueda: 50,
    title: 'Amortizaciones Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Amortizaciones.Amortizaciones");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro <br>Recibo", width: 80, sortable: false, dataIndex: "NRO_RECIBO" },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Socio", width: 150, sortable: false, dataIndex: "SOCIO" },
                { header: "Caja", width: 100, sortable: false, dataIndex: "CAJA" },
                { header: "Concepto", width: 100, sortable: false, dataIndex: "CONCEPTO" },
                { header: "Observacion", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Importe<br>Retiro BOB", width: 100, sortable: false, dataIndex: "IMPORTE" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];


    }
});