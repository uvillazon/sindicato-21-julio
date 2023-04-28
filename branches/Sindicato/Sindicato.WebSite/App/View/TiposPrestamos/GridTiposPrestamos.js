Ext.define("App.View.TiposPrestamos.GridTiposPrestamos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Tipos Prestamos',
    tamBusqueda: 50,
    title: 'Tipos Prestamos a Socios',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Prestamos.TiposPrestamos");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro. Tipo", width: 60, sortable: false, dataIndex: "ID_TIPO" },
                { header: "Tipo Prestamo", width: 100, sortable: false, dataIndex: "NOMBRE" },
                { header: "Caja", width: 100, sortable: false, dataIndex: "CAJA" },
                { header: "Moneda", width: 100, sortable: false, dataIndex: "MONEDA" },
                { header: "Categoria", width: 100, sortable: false, dataIndex: "CATEGORIA" },
                { header: "Observacion", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Importe Maximo", width: 80, sortable: false, dataIndex: "IMPORTE_MAXIMO" },
                { header: "Importe Minimo", width: 80, sortable: false, dataIndex: "IMPORTE_MINIMO" },
                { header: "Tipo Interes", width: 80, sortable: false, dataIndex: "TIPO_INTERES" },
                { header: "Interes %", width: 70, sortable: false, dataIndex: "INTERES" },
                { header: "Interes Fijo", width: 70, sortable: false, dataIndex: "INTERES_FIJO" },
                { header: "Semanas", width: 70, sortable: false, dataIndex: "SEMANAS" },
                { header: "Mora", width: 70, sortable: false, dataIndex: "MULTA_POR_MORA" },
                { header: "Dias Espera<br>Mora", width: 70, sortable: false, dataIndex: "DIAS_ESPERA_MORA" },
                
                { header: "Estado", width: 100, sortable: false, dataIndex: "ESTADO" },
                { header: "Fecha <br>Registro", width: 80, sortable: true, dataIndex: "FECHA_REG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN_USR" }
        ];


    }
});
