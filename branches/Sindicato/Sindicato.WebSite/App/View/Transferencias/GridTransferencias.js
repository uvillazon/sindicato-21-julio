Ext.define("App.View.Transferencias.GridTransferencias", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Transferencias',
    tamBusqueda: 50,
    title: 'Transferencias Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Transferencias.Transferencias");
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'VENTAS');
            }
        };
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro <br>Recibo", width: 80, sortable: false, dataIndex: "ID_TRANSFERENCIA" },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Caja Origen", width: 100, sortable: false, dataIndex: "CAJA_ORIGEN" },
                { header: "Caja Destino", width: 100, sortable: false, dataIndex: "CAJA_DESTINO" },
                { header: "Concepto", width: 100, sortable: false, dataIndex: "CONCEPTO" },
                { header: "Observacion", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Importe<br>Retiro BOB", width: 100, sortable: false, dataIndex: "IMPORTE" },
                { header: "Estado", width: 100, sortable: false, dataIndex: "ESTADO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];


    }
});