Ext.define("App.View.Cierres.GridDetalleSocio", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    title : 'Detalle de Ahorros',
    opcion: "",
    pieTitulo: '',
    btnEliminarRecord: false,
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.Store.Cierres.Detalles", {
            sortProperty: 'ID_DETALLE',
            sortDirection : 'DESC'
        });
        me.columns = [
           { header: "Observacion", width: 200, sortable: false, dataIndex: "CIERRE.OBSERVACION" },
           { header: "inicio", width: 90, sortable: false, dataIndex: "CIERRE.FECHA_INI", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
           { header: "Final", width: 90, sortable: false, dataIndex: "CIERRE.FECHA_FIN", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
           { header: "Saldo", width: 80, sortable: false, dataIndex: "SALDO" },
        ];
        this.callParent(arguments);
    },
   
});

