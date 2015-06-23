Ext.define("App.View.Hojas.GridDetalles", {
    extend: "App.Config.Abstract.Grid",
    busqueda: true,
    textBusqueda: 'Detalles',
    tamBusqueda: 50,
    title: 'Detalles  Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Ventas.DetallesVenta");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro Hoja", width: 150, sortable: false, dataIndex: "ID_DETALLE" },
                { header: "Fecha Uso", width: 100, sortable: true, dataIndex: "FECHA_USO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Importe BOB", width: 100, sortable: false, dataIndex: "MONTO" },
                { header: "Observacion", width: 150, sortable: false, dataIndex: "OBSERVACION" },
              
        ];
    }
});