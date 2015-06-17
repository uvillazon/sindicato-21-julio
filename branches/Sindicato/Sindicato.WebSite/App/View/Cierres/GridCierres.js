Ext.define("App.View.Cierres.GridCierres", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Cierres Sistema',
    tamBusqueda: 50,
    title: 'Cierres Sistema',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Cierres.Cierres");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Codigo", width: 100, sortable: false, dataIndex: "CODIGO" },
                { header: "Fecha <br> Inicial", width: 80, sortable: true, dataIndex: "FECHA_INI", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Fecha <br> Final", width: 80, sortable: true, dataIndex: "FECHA_FIN", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Observacion", width: 250, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Estado", width: 80, sortable: false, dataIndex: "ESTADO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];


    }
});