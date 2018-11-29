Ext.define("App.View.DeudasSocios.GridDeudas", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Deudas',
    tamBusqueda: 50,
    title: 'Tipos de Deudas Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.DeudasSocios.DeudasSocios");
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'VENTAS');
            }
        };
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro<br>Deuda", width: 80, sortable: false, dataIndex: "ID_DEUDA" },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Caja", width: 100, sortable: false, dataIndex: "CAJA" },
                { header: "Moneda", width: 100, sortable: false, dataIndex: "MONEDA" },
                { header: "Motivo", width: 150, sortable: false, dataIndex: "MOTIVO" },
                { header: "Observacion", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Importe", width: 100, sortable: false, dataIndex: "IMPORTE" },
                { header: "Estado", width: 100, sortable: false, dataIndex: "ESTADO" },
                { header: "Fecha <br>Registro", width: 80, sortable: true, dataIndex: "FECHA_REG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN_USR" }
        ];


    }
});
