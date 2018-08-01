Ext.define("App.View.TransferenciasHojas.GridTransferenciasHojas", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Buscar Transferencia',
    tamBusqueda: 70,
    title: 'Transferencias Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.TransferenciasHojas.Transferencias");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro <br>Transferencia", width: 60, sortable: false, dataIndex: "ID_TRANSF" },
                { header: "De Nro Movil", width: 60, sortable: false, dataIndex: "TO_NRO_MOVIL" },
                { header: "De Socio", width: 150, sortable: false, dataIndex: "TO_SOCIO" },
                { header: "Para Nro Movil", width: 60, sortable: false, dataIndex: "FROM_NRO_MOVIL" },
                { header: "Para Socio", width: 150, sortable: false, dataIndex: "FROM_SOCIO" },
                { header: "Cantidad Hojas", width: 100, sortable: false, dataIndex: "CANTIDAD_HOJAS" },
                { header: "Importe Total <br>Hojas", width: 100, sortable: false, dataIndex: "IMPORTE_TOTAL" },
                { header: "Observaciones", width: 150, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Estado", width: 80, sortable: false, dataIndex: "ESTADO" },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA_REG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN_USR" }
        ];


    }
});