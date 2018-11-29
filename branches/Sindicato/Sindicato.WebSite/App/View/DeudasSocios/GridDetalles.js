Ext.define("App.View.DeudasSocios.GridDetalles", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Nro Socio',
    tamBusqueda: 50,
    title: 'Lista de Socios con Deuda',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.DeudasSocios.Detalles");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Movil", width: 80, sortable: false, dataIndex: "MOVIL" },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Observacion", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Importe", width: 100, sortable: false, dataIndex: "IMPORTE" },
                { header: "Importe Cancelado", width: 100, sortable: false, dataIndex: "IMPORTE_CANCELADO" },
                { header: "Estado", width: 100, sortable: false, dataIndex: "ESTADO" },
                { header: "Fecha <br>Registro", width: 80, sortable: true, dataIndex: "FECHA_REG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN_USR" }
        ];


    }
});
