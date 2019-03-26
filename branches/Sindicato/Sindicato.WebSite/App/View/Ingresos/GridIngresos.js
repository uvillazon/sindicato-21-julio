Ext.define("App.View.Ingresos.GridIngresos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Ingresos',
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
        me.store = Ext.create("App.Store.Ingresos.Ingresos");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro <br>Recibo", width: 80, sortable: false, dataIndex: "ID_INGRESO" },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Caja", width: 100, sortable: false, dataIndex: "CAJA" },
                { header: "Tipo", width: 100, sortable: false, dataIndex: "TIPO" },
                { header: "Concepto", width: 100, sortable: false, dataIndex: "CONCEPTO" },
                { header: "Observacion", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Importe<br>Retiro BOB", width: 100, sortable: false, dataIndex: "IMPORTE" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];


    }
});