Ext.define("App.View.Moviles.GridMoviles", {
    extend: "App.Config.Abstract.Grid",
    title: 'Moviles Registrados',
    criterios: true,
    textBusqueda: 'Moviles.',
    imprimir: false,
    equipo : 'Moviles',
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.Store.Moviles.Moviles");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro Movil", width: 70, sortable: true, dataIndex: "NRO_MOVIL" },
            { header: "Descripcion", width: 150, sortable: true, dataIndex: "DESCRIPCION" },
            { header: "Observaciones", width: 150, sortable: true, dataIndex: "OBSERVACION" },
            { header: 'Fecha<br>Alta', dataIndex: 'FECHA_ALTA', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: 'Fecha<br>Baja', dataIndex: 'FECHA_BAJA', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },         
            ];
        this.callParent(arguments);
    }
});

