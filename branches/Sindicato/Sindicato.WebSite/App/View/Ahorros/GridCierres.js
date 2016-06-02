Ext.define("App.View.Ahorros.GridCierres", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'codigo',
    tamBusqueda: 50,
    title: 'Cierres para el pago de Ahorros',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Aho.CierresParada");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "mes", width: 100, sortable: false, dataIndex: "MES" },
                { header: "Fecha <br> Registro", width: 80, sortable: true, dataIndex: "FECHA_REG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Importe Total", width: 80, sortable: false, dataIndex: "IMPORTE_TOTAL" },
                { header: "Observacion", width: 250, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Estado", width: 80, sortable: false, dataIndex: "ESTADO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];


    }
});