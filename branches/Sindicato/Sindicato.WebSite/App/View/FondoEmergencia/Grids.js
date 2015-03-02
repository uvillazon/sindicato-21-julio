Ext.define("App.View.FondoEmergencia.Grids", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    btnEliminarRecord: false,
    fbarmenu: null,
    initComponent: function () {
        var me = this;
        switch (me.opcion) {
            case "GridKardex":
                me.title = "Kardex Fondo Emergencia";
                me.pieTitulo = "Detalle";
                me.CargarKardexFondoEmergencia();
                break;
            
            default:
                alert("Defina el tipo primero");

        }
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.pieTitulo + ".",
            items: me.fbarmenu
        });

        this.callParent(arguments);
    },
    CargarKardexFondoEmergencia: function () {

        var me = this;
        me.store = Ext.create("App.Store.FondoEmergencia.Kardex");
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Operacion", width: 80, sortable: true, dataIndex: "OPERACION" },
            { header: "Nro Recibo", width: 80, sortable: true, dataIndex: "NRO_CMP" },
            { header: "Ingreso", width: 80, sortable: true, dataIndex: "INGRESO" },
            { header: "Egreso", width: 80, sortable: true, dataIndex: "EGRESO" },
            { header: "Saldo", width: 80, sortable: true, dataIndex: "SALDO" },
            { header: "Observaciones", width: 200, sortable: true, dataIndex: "OBSERVACION" },
        ];

    },

});

