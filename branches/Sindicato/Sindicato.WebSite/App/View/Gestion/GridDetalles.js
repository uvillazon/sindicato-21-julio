Ext.define("App.View.Gestion.GridDetalles", {
    extend: "App.Config.Abstract.Grid",
    busqueda: true,
    imprimir: true,
    excel: true,
    criterios: true,
    textBusqueda: 'Caja',
    tamBusqueda: 50,
    title: 'Detalle Cierre de Gestion',
    equipo: '',
    storeGenerar : false,
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Gestion.Detalles");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Detalle", width: 120, sortable: false, dataIndex: "DETALLE" },
                { header: "Cant<br>Prestamos", width: 50, sortable: false, dataIndex: "CANTIDAD" },
                { header: "Cant<br>Cancelados", width: 50, sortable: false, dataIndex: "CANT_PREST_CANCELADOS" },
                { header: "Cant<br>P/Cobrar", width: 50, sortable: false, dataIndex: "CANT_PREST_POR_COBRAR" },
                { header: "Total<br>Prestamo", width: 50, sortable: false, dataIndex: "TOTAL_PRESTAMO" },
                { header: "Total<br>Interes", width: 50, sortable: false, dataIndex: "TOTAL_INTERES" },
                { header: "Total<br>Moras", width: 50, sortable: false, dataIndex: "TOTAL_MORAS" },
                { header: "Total<br>Condonacion", width: 50, sortable: false, dataIndex: "TOTAL_CONDONACION_INTERES" },
                { header: "Total<br>Cancelado", width: 50, sortable: false, dataIndex: "TOTAL_CANCELADO" },
                { header: "Total<br>Mora<br>Cancelado", width: 50, sortable: false, dataIndex: "TOTAL_MORA_CANCELADO" },
                { header: "Total<br>Interes<br>Cancelado", width: 50, sortable: false, dataIndex: "TOTAL_INTERES_CANCELADO" },
                { header: "Total<br>Por Cobrar", width: 50, sortable: false, dataIndex: "TOTAL_POR_COBRAR" },
                
        ];


    }
});