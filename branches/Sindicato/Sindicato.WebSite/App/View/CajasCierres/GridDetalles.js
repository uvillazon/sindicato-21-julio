Ext.define("App.View.CajasCierres.GridDetalles", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'detalle',
    tamBusqueda: 50,
    title: 'Detalle de Cierres de Cajas',
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
            me.store = Ext.create("App.Store.CajasCierres.Detalles");
        } else {
            me.store = Ext.create("App.Store.CajasCierres.Detalles", {
                url: 'Cierres/ObtenerDetalleCierreCajaPacialGenerado',
                pageSize: 10000,
            });
        }
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Fecha", width: 80, sortable: false, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Detalle", width: 200, sortable: false, dataIndex: "DETALLE" },
                { header: "Importe", width: 100, sortable: false, dataIndex: "IMPORTE" },
                { header: "Saldo", width: 100, sortable: false, dataIndex: "SALDO" }
        ];
    }
});