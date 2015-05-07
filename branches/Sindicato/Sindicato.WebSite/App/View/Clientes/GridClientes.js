 Ext.define("App.View.Clientes.GridClientes", {
     extend: "App.Config.Abstract.Grid",
    title: 'Socios Registrados',
    iconCls:'',
    criterios: true,
    textBusqueda: 'cliente',
    imprimir: true,
    width: 550,
    height: 350,
    equipo: 'Clientes',
    toolbar:'',
    initComponent: function () {
        var me = this;
        var me = this;
        me.store = Ext.create("App.Store.Clientes.Clientes");
        me.CargarComponentes();
        //me.button_search = Ext.create('Ext.Button', {
        //    pressed: true,
        //    text: 'Buscar',
        //    hidden: me.busqueda,
        //    iconCls: 'zoom',
        //    tooltip: 'Buscar por Mes',
        //    enableToggle: true,
        //    scope: this

        //});
        //this.bbar = Ext.create('Ext.PagingToolbar', {
        //    store: me.store,
        //    displayInfo: true,
        //    displayMsg: 'Desplegando {0} - {1} of {2}',
        //    emptyMsg: "No existen " + me.equipo + ".",
        //    items: me.toolbar
        //});

        me.columns = [
           { xtype: "rownumberer", width: 30, sortable: false },
           { header: "Codigo<br>Cliente", width: 70, sortable: true, dataIndex: "CODIGO" },
           { header: "Nombre", width: 200, sortable: true, dataIndex: "EMPRESA" },
           { header: "Saldo", width: 100, sortable: true, dataIndex: "SALDO" },
           { header: "Consumo", width: 150, sortable: true, dataIndex: "CONSUMO" },
        ];
        this.callParent(arguments);
    }
});