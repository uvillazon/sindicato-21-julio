Ext.define("App.View.Prestamos.GridPrestamos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Retiros',
    tamBusqueda: 50,
    title: 'Retiros Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Prestamos.Prestamos");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro <br>Recibo", width: 80, sortable: false, dataIndex: "ID_RETIRO" },
                { header: "Nro Movil", width: 80, sortable: false, dataIndex: "NRO_MOVIL" },
                { header: "Socio", width: 150, sortable: false, dataIndex: "SOCIO" },
                { header: "Caja Egreso", width: 100, sortable: false, dataIndex: "CAJA" },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Detalle", width: 250, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Importe<br>Retiro BOB", width: 100, sortable: false, dataIndex: "RETIRO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];


    }
});