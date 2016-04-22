Ext.define("App.View.TiposIngresos.GridIngresos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Tipos Ingresos',
    tamBusqueda: 50,
    title: 'Tipos Ingresos Por Socios Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.IngresosPorSocios.TiposIngresos");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro. Tipo<br>Ingreso", width: 80, sortable: false, dataIndex: "ID_TIPO" },
                { header: "Tipo Ingreso", width: 200, sortable: false, dataIndex: "NOMBRE" },
                { header: "Caja", width: 100, sortable: false, dataIndex: "CAJA" },
                { header: "Observacion", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Importe", width: 100, sortable: false, dataIndex: "IMPORTE" },
                { header: "Moneda", width: 100, sortable: false, dataIndex: "MONEDA" },
                { header: "Categoria", width: 100, sortable: false, dataIndex: "CATEGORIA" },
                { header: "Estado", width: 100, sortable: false, dataIndex: "ESTADO" },
                { header: "Fecha <br>Registro", width: 80, sortable: true, dataIndex: "FECHA_REG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN_USR" }
        ];


    }
});
