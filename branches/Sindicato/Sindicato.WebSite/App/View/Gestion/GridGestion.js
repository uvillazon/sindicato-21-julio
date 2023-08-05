Ext.define("App.View.Gestion.GridGestion", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Buscar gestion',
    tamBusqueda: 70,
    title: 'Gestion Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Gestion.Gestion");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Gestion", width: 100, sortable: false, dataIndex: "CODIGO" },
                { header: "Descripcion", width: 200, sortable: false, dataIndex: "DESCRIPCION" },
                { header: "Observ. Cierre", width: 200, sortable: false, dataIndex: "OBSERVACION_CIERRE" },
                { header: "Fecha Inicio", width: 80, sortable: true, dataIndex: "FECHA_INICIO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Fecha Fin", width: 80, sortable: true, dataIndex: "FECHA_FIN", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Total Disponible", width: 100, sortable: false, dataIndex: "SALDO_A_FAVOR" },
                { header: "Total P/Cobrar", width: 100, sortable: false, dataIndex: "SALDO_POR_COBRAR" },
                { header: "Estado", width: 80, sortable: false, dataIndex: "ESTADO" },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA_REG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];


    }
});