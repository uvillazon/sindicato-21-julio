Ext.define("App.View.CierreCaja.GridDetalles", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Caja',
    tamBusqueda: 50,
    title: 'Cierres de Cajas',
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
            me.store = Ext.create("App.Store.CierreCaja.Detalles");
        } else {
            me.store = Ext.create("App.Store.CierreCaja.Detalles", {
                url: 'Cierres/ObtenerDetalleCierreCajaGenerado'
            });
        }
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Codigo", width: 50, sortable: false, dataIndex: "CAJA" },
                { header: "Caja", width: 150, sortable: false, dataIndex: "NOMBRE" },
                { header: "Moneda", width: 150, sortable: false, dataIndex: "MONEDA" },
                { header: "Importe", width: 80, sortable: false, dataIndex: "SALDO" },
                { header: "Observacion", width: 200, sortable: false, dataIndex: "OBSERVACION" },
        ];


    }
});