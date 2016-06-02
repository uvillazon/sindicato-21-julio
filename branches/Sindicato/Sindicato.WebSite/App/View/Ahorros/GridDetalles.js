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
            me.store = Ext.create("App.Store.CierresParada.Detalles");
        } else {
            me.store = Ext.create("App.Store.CierresParada.Detalles", {
                url : 'CierresParada/ObtenerDetalleCierreParada'
            });
        }
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Socio", width: 150, sortable: false, dataIndex: "SOCIO" },
                { header: "Cant Hojas", width: 100, sortable: false, dataIndex: "CANT_HOJAS" },
                { header: "Cant Regulaciones", width: 100, sortable: false, dataIndex: "CANT_REGULACIONES" },
                { header: "Ahorro Total", width: 100, sortable: false, dataIndex: "AHORRO" },
        ];


    }
});