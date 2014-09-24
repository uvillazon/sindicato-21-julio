Ext.define("App.View.Ventas.Grids", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    title : '',
    btnEliminarRecord: false,
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        if (me.opcion == "GridVentasEditar") {
            me.title = me.title == '' ? "Ventas" : me.title;
            me.pieTitulo = "Ventas";
            me.CargarGridVentasEditar();
        }
        else if (me.opcion == "GridVentasCredito") {
            me.title = "Ventas a Credito";
            me.pieTitulo = "Ventas a Credito";
            me.CargarGridVentasCredito();
        }
        else if (me.opcion == "GridVentasConsumo") {
            me.title = "CONSUMO PROPIO - BS";
            me.pieTitulo = "Consumo";
            me.CargarGridVentasConsumo();
        }
        else {
            alert("Defina el tipo primero");
        }
       
        this.callParent(arguments);
    },
    CargarGridVentasEditar : function(){
        var me = this;
        me.store = Ext.create("App.Store.Ventas.DetallesVenta");
        
        me.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];
        me.columns = [
           { header: "Producto", width: 150, sortable: true, dataIndex: "PRODUCTO" },
           { header: "Entrada Lts.", width: 80, sortable: false, dataIndex: "ENT_LITTER" },
           { header: "Salida Lts.", width: 80, sortable: false, dataIndex: "SAL_LITTER" ,editor: {
                    xtype: 'numberfield',
                    
                } 
           },
           { header: "Total", width: 80, sortable: false, dataIndex: "TOTAL" }
        ];

    },
    CargarGridVentasCredito : function(){
        var me = this;
        me.store = Ext.create("App.Store.Ventas.VentasCredito");
        me.columns = [
           { header: "CLIENTE", width: 180, sortable: false, dataIndex: "CLIENTE" },
           { header: "DIESEL", width: 100, sortable: false, dataIndex: "DIESEL" },
           { header: "GASOLINA", width: 100, sortable: false, dataIndex: "GASOLINA" }
        ];

    },
    CargarGridVentasConsumo : function(){
        var me = this;
        me.store = Ext.create("App.Store.ConsumoPropio.ConsumoPropio");
        //        me.store = Ext.create("App.Store.SolicitudesMantenimiento.CodigosSolucion");
        me.columns = [
            { header: "USUARIO", width: 180, sortable: false, dataIndex: "CLIENTE" },
            { header: "DIESEL", width: 120, sortable: false, dataIndex: "DIESEL" },
            { header: "GASOLINA", width: 120, sortable: false, dataIndex: "GASOLINA" }
        ];
    },
});

