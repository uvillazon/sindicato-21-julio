Ext.define("App.View.ConsumoPropio.GridConsumoPropio", {
    extend: "Ext.grid.Panel",
    //title: 'Consumo Propio',
    iconCls: '',
    criterios: true,
    textBusqueda: 'Buscar Consumo Propio',
    imprimir: false,
    width: 550,
    height: 350,
    equipo: 'Consumo Propio',
    win: null,
    formulario: null,
    imagenes: true,
    toolbar: '',
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridConsumoPropio") {
            me.CargarGridCuentasPC();
        }
        else if (me.opcion == "GridConsumo") {
            me.CargarGridConsumos();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarGridConsumos : function(){
        var me = this;
        me.store = Ext.create("App.Store.ConsumoPropio.Consumos");
//        me.store.load();
        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.equipo + ".",
            items: me.toolbar

        });
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Fecha", width: 80, sortable: false, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Turno", width: 80, sortable: false, dataIndex: "TURNO" },
            { header: "Cliente <br>Consumo", width: 100, sortable: false, dataIndex: "CLIENTE" },
            { header: "Responsable", width: 100, sortable: false, dataIndex: "RESPONSABLE" },
            { header: "Consumo<br>(Litros)", width: 80, sortable: false, dataIndex: "CONSUMO" },
            { header: "Consumo<br>(Importe)", width: 80, sortable: false, dataIndex: "CONSUMO_BS" }
        ];
        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;
    },
    CargarGridCuentasPC: function () {
        var me = this;
        //        var fecha_actual = new Date();
        me.store = Ext.create("App.Store.ConsumoPropio.Clientes");
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
            { header: "C\u00F3digo", width: 100, sortable: true, dataIndex: "CODIGO" },
            { header: "Nombre", width: 250, sortable: false, dataIndex: "DESCRIPCION" },
            { header: "Consumo<br>(Litros)", width: 100, sortable: false, dataIndex: "CONSUMO" },
            { header: "Consumo<br>(Importe)", width: 100, sortable: false, dataIndex: "CONSUMO_BS" }
        ];
        //        me.button_search.on('click', this.buscarBotonCodigo, this);
        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;

    }
});