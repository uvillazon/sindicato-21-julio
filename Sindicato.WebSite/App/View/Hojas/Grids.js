Ext.define("App.View.Hojas.Grids", {
    extend: "Ext.grid.Panel",
    margins: '0 2 0 0',
    loadMask: true,
    opcion: "",
    pieTitulo: '',
    btnEliminarRecord: false,
    fbarmenu: null,
    initComponent: function () {
        var me = this;
        //me.store = Ext.create("App.Store.Listas.Listas");
        if (me.opcion == "GridHojasMovil") {
            me.title = "Hojas Vendidas ";
            me.pieTitulo = "Hojas";
            me.CargarGridHojasMovil();
        }
//        else if (me.opcion == "GridDocumentos") {
//            me.title = "Documentos";
//            me.pieTitulo = "Documentos";
//            me.CargarGridDocumentos();
//        }
//        else if (me.opcion == "GridDesempenos") {
//            me.title = "Desempenos";
//            me.pieTitulo = "Desempenos";
//            me.CargarGridDesempenos();
//        }
//        else if (me.opcion == "GridAntecedentes") {
//            me.title = "Antecedentes";
//            me.pieTitulo = "Antecedentes";
//            me.CargarGridAntecedentes();
//        }
//        else if (me.opcion == "GridAutomoviles") {
//            me.title = "Automoviles";
//            me.pieTitulo = "Automoviles";
//            me.CargarGridAutomoviles();
//        }
        else {
            alert("Defina el tipo primero");
        }
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.pieTitulo + ".",
            items: me.fbarmenu
        });
//        me.on('itemclick', me.onItemClick, this);
//        me.getSelectionModel().on('selectionchange', me.onSelectChange, this);
        this.callParent(arguments);
    },
    CargarGridHojasMovil: function () {
        var me = this;
        me.store = Ext.create("App.Store.Hojas.Hojas");
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro <br>Hoja", width: 100, sortable: false, dataIndex: "NRO_HOJA" },
            { header: "Parada", width: 100, sortable: false, dataIndex: "PARADA" },
            { header: "Fecha Compra", width: 100, sortable: true, dataIndex: "FECHA_COMPRA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Fecha Uso", width: 100, sortable: true, dataIndex: "FECHA_USO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Monto", width: 100, sortable: false, dataIndex: "MONTO" },
            { header: "Socio", width: 100, sortable: false, dataIndex: "SOCIO" },
            { header: "Nro Movil", width: 100, sortable: false, dataIndex: "NRO_MOVIL" },
            { header: "Observacion", width: 150, sortable: false, dataIndex: "OBSERVACION" }
        ];

    },
//    
});

