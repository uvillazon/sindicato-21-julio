Ext.define("App.View.Ahorros.GridDetalles", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Cierres Parada',
    tamBusqueda: 50,
    title: 'Cierres de Parada',
    equipo: '',
    storeGenerar : false,
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        if (!me.storeGenerar) {
            me.store = Ext.create("App.Store.Cierres.Detalles");
        } else {
            me.store = Ext.create("App.Store.Cierres.Detalles", {
                url: 'Cierres/ObtenerDetalleCierreGenerado'
            });
        }
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Movil", width: 50, sortable: false, dataIndex: "NRO_MOVIL" },
                { header: "Socio", width: 150, sortable: false, dataIndex: "SOCIO" },
                { header: "Cant <br>Hojas", width: 80, sortable: false, dataIndex: "CANT_HOJAS" },
                { header: "Cant <br>Regulaciones", width: 80, sortable: false, dataIndex: "CANT_REGULACIONES" },
                { header: "Ahorro <br>Hojas", width: 80, sortable: false, dataIndex: "AHORRO_HOJA" },
                { header: "Ahorro <br>Regulaciones", width: 80, sortable: false, dataIndex: "AHORRO_REGULACIONES" },
                { header: "Ahorro <br>Total", width: 80, sortable: false, dataIndex: "TOTAL_AHORRO" },
                 { header: "Observacion", width: 200, sortable: false, dataIndex: "MSG" },
        ];


    }
});