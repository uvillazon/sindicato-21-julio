Ext.define("App.View.Listas.Grids", {
    extend: "Ext.grid.Panel",
    //width: 250,
    margins: '0 2 0 0',
    loadMask: true,
    opc : "",
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        if (me.opc == "GridListaItems") {
            me.title = "Listas Registradas del Tipo";
            me.CargarComponentesListaItems();
        }
        else if (me.opc == "GridListaItemRel") {
            me.title = "Listes Relacionadas Registradas ";
            me.CargarComponentesListaItemRel();
        }
        else {
            alert("Defina el tipo primero");
        }
        this.callParent(arguments);
    },
    CargarComponentesListaItems : function(){
        var me = this;
        me.store = Ext.create("App.Store.Listas.StoreLista", { autoLoad: false });
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 80, sortable: true, dataIndex: "CODIGO" },
            { header: "Valor", width: 300, sortable: true, dataIndex: "VALOR" },
            { header: "Estado", width: 80, sortable: true, dataIndex: "ESTADO" },
            
        ];
    },
    CargarComponentesListaItemRel: function () {
        var me = this;
        me.store = Ext.create("App.Store.Listas.StoreLista", { autoLoad: false });
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo", width: 80, sortable: true, dataIndex: "CODIGO" },
            { header: "Valor", width: 300, sortable: true, dataIndex: "VALOR" },
            { header: "Estado", width: 80, sortable: true, dataIndex: "ESTADO" },

        ];
    }
    
});

