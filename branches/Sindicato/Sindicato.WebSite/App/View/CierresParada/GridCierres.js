Ext.define("App.View.CierresParada.GridCierres", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Cierres Parada',
    tamBusqueda: 50,
    title: 'Cierres de Parada',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.CierresParada.CierresParada");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Parada", width: 100, sortable: false, dataIndex: "PARADA" },
                { header: "Fecha <br> Inicial", width: 80, sortable: true, dataIndex: "FECHA_INI", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Fecha <br> Final", width: 80, sortable: true, dataIndex: "FECHA_FIN", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Importe Total", width: 80, sortable: false, dataIndex: "IMPORTE_TOTAL" },
                { header: "Observacion", width: 250, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Estado", width: 80, sortable: false, dataIndex: "ESTADO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];


    }
});