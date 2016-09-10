Ext.define("App.View.Prestamos.GridPrestamos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Retiros',
    tamBusqueda: 50,
    title: 'Prestamos Registrados',
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
                { header: "Nro <br>Prestamos", width: 80, sortable: false, dataIndex: "ID_PRESTAMO" },
                { header: "Nro Movil", width: 80, sortable: false, dataIndex: "NRO_MOVIL" },
                { header: "Socio", width: 150, sortable: false, dataIndex: "SOCIO" },
                { header: "Caja", width: 100, sortable: false, dataIndex: "CAJA" },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Tipo Prestamo", width: 150, sortable: false, dataIndex: "TIPO_PRESTAMO" },
                { header: "Importe<br>Prestado", width: 100, sortable: false, dataIndex: "IMPORTE_PRESTAMO" },
                { header: "Moneda", width: 100, sortable: false, dataIndex: "MONEDA" },
                { header: "Semanas", width: 100, sortable: false, dataIndex: "SEMENAS" },
                { header: "Interes", width: 100, sortable: false, dataIndex: "INTERES" },
                { header: "Saldo", width: 100, sortable: false, dataIndex: "SALDO" },
                { header: "Saldo", width: 100, sortable: false, dataIndex: "SALDO" },
                { header: "Total <br>Cancelado", width: 100, sortable: false, dataIndex: "TOTAL_CANCELADO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];


    }
});