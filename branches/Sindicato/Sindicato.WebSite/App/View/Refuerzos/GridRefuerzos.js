Ext.define("App.View.Refuerzos.GridRefuerzos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Refuerzos',
    tamBusqueda: 50,
    title: 'Refuerzos Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Refuerzos.Refuerzos");
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'VENTAS');
            }
        };
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro <br>Recibo", width: 80, sortable: false, dataIndex: "ID_VENTA" },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Caja", width: 100, sortable: false, dataIndex: "CAJA" },
                { header: "Codigo", width: 100, sortable: false, dataIndex: "CODIGO" },
                { header: "Placa", width: 100, sortable: false, dataIndex: "PLACA" },
                { header: "Nombre", width: 200, sortable: false, dataIndex: "NOMBRE" },
                { header: "Cantidad", width: 70, sortable: false, dataIndex: "CANTIDAD" },
                { header: "Costo <br>Unitario", width: 80, sortable: false, dataIndex: "COSTO_UNITARIO" },
                { header: "Importe<br>Total", width: 80, sortable: false, dataIndex: "TOTAL" },
                { header: "Observacion", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Estado", width: 100, sortable: false, dataIndex: "ESTADO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];


    }
});