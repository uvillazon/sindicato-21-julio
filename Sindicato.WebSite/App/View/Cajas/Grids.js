Ext.define("App.View.Cajas.Grids", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    requires: ['App.Config.ux.Printer'],
    loadMask: true,
    opcion: "",
    pieTitulo: '',
   
    btnEliminarRecord: false,
    toolbar : null,
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        if (me.opcion == "GridTransferencia") {
            me.title = "Transferencias entre Cajas";
            me.pieTitulo = "Transferencias";
            me.CargarGridTransferencia();
        }
//        else if (me.opcion == "GridVentasCredito") {
//            me.title = "Ventas a Credito";
//            me.pieTitulo = "Ventas a Credito";
//            me.CargarGridVentasCredito();
//        }
        else {
            alert("Defina el tipo primero");
        }
        
        this.callParent(arguments);
    },
    CargarGridTransferencia : function(){
        var me = this;
        
        
        me.store = Ext.create("App.Store.Transferencias.Transferencias");
        me.store.load();
        me.columns = [
           { header: "Nro Comp", width: 80, sortable: true, dataIndex: "NRO_COMP" },
           { header: "Fecha", width: 100, sortable: false, dataIndex: "FECHA" ,renderer: Ext.util.Format.dateRenderer('d/m/Y') },
           { header: "Caja <br>Origen", width: 100, sortable: false, dataIndex: "CAJA_ORIGEN" },
           { header: "Caja <br>Destino", width: 100, sortable: false, dataIndex: "CAJA_DESTINO" },
           { header: "Importe", width: 100, sortable: false, dataIndex: "IMPORTE_BS" },
           { header: "Concepto", width: 150, sortable: false, dataIndex: "CONCEPTO" }
        ];
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.pieTitulo + ".",
            items: me.toolbar
        });
    },
    ImprimirReporte: function () {
        var me = this;
        // alert(me.tituloImpresion);
        App.Config.ux.Printer.filtros = me.tituloImpresion;
        App.Config.ux.Printer.print(me);

    }

});

