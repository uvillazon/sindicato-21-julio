Ext.define("App.View.TiposEgresos.GridEgresos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Tipos Egresos',
    tamBusqueda: 50,
    title: 'Tipos Egresos Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Egresos.TiposEgresos");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro. Tipo<br>Egreso", width: 80, sortable: false, dataIndex: "ID_TIPO" },
                { header: "Tipo Egreso", width: 200, sortable: false, dataIndex: "NOMBRE" },
                { header: "Caja", width: 100, sortable: false, dataIndex: "CAJA" },
                { header: "Pagado A", width: 100, sortable: false, dataIndex: "CONCEPTO" },
                { header: "Concepto", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Importe", width: 100, sortable: false, dataIndex: "IMPORTE" },
                { header: "Moneda", width: 100, sortable: false, dataIndex: "MONEDA" },
                { header: "Estado", width: 100, sortable: false, dataIndex: "ESTADO" },
                { header: "Fecha <br>Registro", width: 80, sortable: true, dataIndex: "FECHA_REG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN_USR" }
        ];


    }
});
