Ext.define("App.View.Obligaciones.GridObligaciones", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Obligaciones',
    tamBusqueda: 50,
    title: 'Obligaciones Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Obligaciones.Obligaciones");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Socio", width: 150, sortable: false, dataIndex: "SOCIO" },
                { header: "Periodo", width: 80, sortable: false, dataIndex: "PERIODO" },
                { header: "Concepto", width: 100, sortable: false, dataIndex: "CONCEPTO" },
                { header: "Observacion", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Importe<br>BOB", width: 100, sortable: false, dataIndex: "IMPORTE" },
                { header: "Estado", width: 80, sortable: false, dataIndex: "ESTADO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];


    }
});