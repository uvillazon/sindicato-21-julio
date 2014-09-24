Ext.define("App.View.Listas.GridListas", {
    extend: "App.Config.Abstract.Grid",
    title: 'Tipo de listas Registradas',
    criterios: true,
    stateId: 'MNGridListas',
    textBusqueda: 'Listas.',
    imprimir: true,
    equipo : 'Listas',
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.Store.Listas.Listas");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nombre<br>Lista", width: 100, sortable: true, dataIndex: "LISTA" },
            { header: "Descripcion", width: 150, sortable: true, dataIndex: "DESCRIPCION" },
            { header: "Tamaño <br>limite", width: 70, sortable: true, dataIndex: "TAM_LIMITE" },
            { header: "Tipo <br>Valor", width: 80, sortable: true, dataIndex: "TIPO_VALOR" },
            { header: "Tipo", width: 80, sortable: true, dataIndex: "MAYUS_MINUS" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },
             
            ];
        this.callParent(arguments);
    }
});

