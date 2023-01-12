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
           { header: "Observacion", width: 100, sortable: false, dataIndex: "CIERRE.OBSERVACION" },
           { header: "inicio", width: 75, sortable: false, dataIndex: "CIERRE.FECHA_INI", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
           { header: "Final", width: 75, sortable: false, dataIndex: "CIERRE.FECHA_FIN", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
           { header: "Cant.<br>Regulaciones", width: 70, sortable: false, dataIndex: "CANT_REGULACIONES" },
           { header: "Cant.<br>Hojas", width: 70, sortable: false, dataIndex: "CANT_HOJAS" },
           { header: "Total<br>Ahorro", width: 70, sortable: false, dataIndex: "TOTAL_AHORRO" },
           { header: "Saldo", width: 80, sortable: false, dataIndex: "SALDO" },
        ];
        this.callParent(arguments);
    },
   
});

