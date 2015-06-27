Ext.define("App.View.CierresParada.GridDetalles", {
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
                { header: "Detalle", width: 200, sortable: false, dataIndex: "DETALLE" },
                { header: "Ingreso", width: 100, sortable: false, dataIndex: "INGRESO" },
                { header: "Egresos", width: 100, sortable: false, dataIndex: "EGRESO" },
        ];


    }
});