Ext.define("App.View.Cajas.GridKardexCaja", {
    extend: "Ext.grid.Panel",
    title: 'Kardex Caja',
    criterios: true,
    textBusqueda: 'Buscar Caja',
    imprimir: false,
    width: 650,
    height: 650,
    equipo: 'Kardex',
    win: null,
    formulario: null,
    id_caja: '',
    imagenes: true,
    opcion: 'GridKardexCaja',
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridKardexCaja") {
            me.CargarGridKardexCaja(me.id_caja);
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarGridKardexCaja: function (id_caja) {
        var me = this;
//        alert(me.id_caja);
        var fecha_actual = new Date();
        me.store = Ext.create("App.Store.Cajas.Kardex");
        me.store.setExtraParams({ ID_CAJA: id_caja });
        me.store.load();
        //me.CargarComponentes();


        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Desplegando {0} - {1} of {2}',
            emptyMsg: "No existen " + me.equipo + "."

        });

        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro <br>Comprobante", width: 80, sortable: false, dataIndex: "NRO_COMP", hidden: true },
            { header: "Fecha", width: 80, sortable: false, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Detalle", width: 400, sortable: false, dataIndex: "DETALLE" },
            { header: "Ingreso", width: 80, sortable: false, dataIndex: "INGRESO", align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') },
            { header: "Egreso", width: 80, sortable: false, dataIndex: "EGRESO", align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') },
            { header: "Saldo", width: 80, sortable: false, dataIndex: "SALDO", align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') }

        ];

        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;

    }
});