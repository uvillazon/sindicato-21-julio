Ext.define("App.View.Usuarios.GridUsuarios", {
    extend: "Ext.grid.Panel",
    //title: 'Clientes Registrados',
    iconCls: '',
    criterios: true,
    textBusqueda: 'Usuarios',
    imprimir: true,
    width: 550,
    height: 350,
    equipo: 'Usuarios',
    toolbar: '',
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridUsuarios") {
            me.CargarGridUsuarios();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarGridUsuarios: function () {
        var me = this;
        me.store = Ext.create("App.Store.Usuarios.Usuarios");
        me.store.load();
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.equipo + ".",
            items: me.toolbar
        });

        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Usuario", width: 100, sortable: true, dataIndex: "LOGIN" },
            { header: "Nombre", width: 200, sortable: true, dataIndex: "NOMBRE" },
            { header: "Perfil", width: 100, sortable: true, dataIndex: "PERFIL" },
            { header: "Email", width: 200, sortable: true, dataIndex: "EMAIL" },
            { header: "Fecha Alta", width: 100, sortable: true, dataIndex: "FCH_ALTA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Estado", width: 150, sortable: true, dataIndex: "ESTADO" },
        ];
        me.dock = this.dockedItems;

    }
});