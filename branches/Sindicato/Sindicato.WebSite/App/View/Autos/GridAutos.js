Ext.define("App.View.Autos.GridAutos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Automoviles',
    tamBusqueda: 50,
    title: 'Autos Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGridAutos();
        this.callParent(arguments);
    },
    CargarGridAutos: function () {
        var me = this;
        me.store = Ext.create("App.Store.Autos.Autos");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Placa", width: 100, sortable: true, dataIndex: "PLACA" },
                { header: "Tipo Actual", width: 100, sortable: false, dataIndex: "TIPO_ACTUAL" },
                { header: "Movil Actual", width: 100, sortable: false, dataIndex: "MOVIL_ACTUAL" },
                { header: "Tipo", width: 100, sortable: true, dataIndex: "TIPO" },
                { header: "Marca", width: 100, sortable: true, dataIndex: "MARCA" },
                { header: "Modelo", width: 100, sortable: true, dataIndex: "MODELO" },
                { header: "Color", width: 100, sortable: true, dataIndex: "COLOR" },
                { header: "Nro. Chasis", width: 100, sortable: true, dataIndex: "CHASIS" },
                { header: "Motor", width: 100, sortable: true, dataIndex: "MOTOR" },
                { header: "Descripcion", width: 150, sortable: true, dataIndex: "DESCRIPCION" },
                { header: "Fecha", width: 100, sortable: true, dataIndex: "FECHA_ALTA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                //{ header: " - ", width: 30, sortable: false, dataIndex: "ID_USR", hidden: true },
        ];


    }
});