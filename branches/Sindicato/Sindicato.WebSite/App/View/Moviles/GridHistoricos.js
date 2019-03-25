Ext.define("App.View.Moviles.GridHistoricos", {
    extend: "App.Config.Abstract.Grid",
    title: 'Historicos de cambios registrados',
    criterios: false,
    textBusqueda: 'Detalles.',
    imprimir: false,
    equipo : 'Detalles',
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.Store.Moviles.Historicos");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro Movil <br>Nuevo", width: 100, sortable: true, dataIndex: "MOVIL_NUEVO" },
            { header: "Nro Movil <br>Anterior", width: 100, sortable: true, dataIndex: "MOVIL_ANTERIOR" },
            { header: "Observaciones", width: 150, sortable: true, dataIndex: "OBSERVACION" },
            { header: 'Fecha<br>Alta', dataIndex: 'FECHA_REG', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Usuario", width: 70, sortable: true, dataIndex: "LOGIN_USR" },         
            ];
        this.callParent(arguments);
    }
});

