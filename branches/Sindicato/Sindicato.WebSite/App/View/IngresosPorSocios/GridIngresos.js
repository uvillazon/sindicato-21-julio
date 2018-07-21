Ext.define("App.View.IngresosPorSocios.GridIngresos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Ingresos',
    tamBusqueda: 50,
    title: 'Ingresos Por Socios Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.IngresosPorSocios.Ingresos");
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'VENTAS');
            }
        };
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro<br>Ingreso", width: 80, sortable: false, dataIndex: "ID_INGRESO" },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Movil", width: 100, sortable: false, dataIndex: "MOVIL" },
                { header: "Socio", width: 100, sortable: false, dataIndex: "SOCIO" },
                { header: "Caja", width: 100, sortable: false, dataIndex: "CAJA" },
                { header: "Concepto", width: 100, sortable: false, dataIndex: "TIPO_INGRESO" },
                { header: "Observacion", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Importe", width: 100, sortable: false, dataIndex: "IMPORTE" },
                { header: "Moneda", width: 100, sortable: false, dataIndex: "MONEDA" },
                { header: "Estado", width: 100, sortable: false, dataIndex: "ESTADO" },
                { header: "Fecha <br>Registro", width: 80, sortable: true, dataIndex: "FECHA_REG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN_USR" }
        ];


    }
});
