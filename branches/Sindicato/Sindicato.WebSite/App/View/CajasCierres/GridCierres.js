Ext.define("App.View.CajasCierres.GridCierres", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'codigo',
    tamBusqueda: 50,
    title: 'Cierre de Cajas Parciales',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.CajasCierres.Cierres");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                
                { header: "Id", width: 70, sortable: false, dataIndex: "ID_CIERRE" },
                { header: "Caja", width: 80, sortable: true, dataIndex: "CAJA" },
                { header: "Fecha <br> Inicial", width: 80, sortable: true, dataIndex: "FECHA_INI", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Fecha <br> Final", width: 80, sortable: true, dataIndex: "FECHA_FIN", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Saldo <br> Inical", width: 80, sortable: true, dataIndex: "SALDO_INICIAL" },
                { header: "Saldo <br> Final", width: 100, sortable: true, dataIndex: "SALDO_FINAL" },
                { header: "Observacion", width: 150, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Estado", width: 80, sortable: false, dataIndex: "ESTADO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" },
                { header: "Fecha <br> Registro", width: 80, sortable: true, dataIndex: "FECHA_REG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },


        ];


    }
});