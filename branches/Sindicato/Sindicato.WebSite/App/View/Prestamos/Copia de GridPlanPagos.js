Ext.define("App.View.Prestamos.GridPlanPagos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    busqueda: true,
    imprimir: true,
    excel: true,
    cargarStore : false,
    textBusqueda: 'Buscar Prestamo',
    tamBusqueda: 70,
    title: 'Prestamos Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Prestamos.PlanPagos");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Fecha<br>Pago", width: 80, sortable: true, dataIndex: "FECHA_PAGO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Nro Semana", width: 70, sortable: false, dataIndex: "NRO_SEMANA" },
                { header: "Importe a pagar<br>a Capital", width: 100, sortable: false, dataIndex: "IMPORTE_A_PAGAR" },
                { header: "Importe a pagar<br>a Interes", width: 100, sortable: false, dataIndex: "INTERES_A_PAGAR" },
                { header: "Importe Total<br>a pagar", width: 100, sortable: false, dataIndex: "IMPORTE_TOTAL" },
                { header: "Amortizacion<br>Capital", width: 80, sortable: false, dataIndex: "CAPITAL_A_PAGAR" },
                { header: "Saldo", width: 70, sortable: false, dataIndex: "SALDO_PLAN" },
                { header: "Saldo Prestamo", width: 100, sortable: false, dataIndex: "SALDO_PRESTAMO" },
                 { header: "Estado", width: 80, sortable: false, dataIndex: "ESTADO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN_USR" }
        ];


    }
});