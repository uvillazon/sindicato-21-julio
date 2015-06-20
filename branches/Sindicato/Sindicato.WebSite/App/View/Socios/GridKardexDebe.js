Ext.define("App.View.Socios.GridKardexDebe", {
    extend: "Ext.grid.Panel",
    title: 'Kardex Socio Debe',
    criterios: true,
    imprimir: false,
    width: 650,
    height: 650,
    equipo: 'Kardex',
    win: null,
    formulario: null,
    id_socio: '',
    imagenes: true,
    initComponent: function () {
        var me = this;
        me.CargarGridKardex(me.id_socio);
        this.callParent(arguments);
    },
    CargarGridKardex: function (id_socio) {
        var me = this;
//        alert(me.id_caja);
        var fecha_actual = new Date();
        me.store = Ext.create("App.Store.Socios.KardexDebe");
        me.store.setExtraParams({ ID_SOCIO: id_socio });
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
            { header: "Nro <br>Recibo", width: 80, sortable: false, dataIndex: "NRO_RECIBO", hidden: true },
            { header: "Fecha", width: 80, sortable: false, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Operacion", width: 80, sortable: false, dataIndex: "OPERACION" },
            { header: "Detalle", width: 300, sortable: false, dataIndex: "DETALLE" },
            { header: "Debe", width: 80, sortable: false, dataIndex: "DEBE", align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') },
            { header: "Amortizacion", width: 80, sortable: false, dataIndex: "AMORTIZACION", align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') },
            { header: "Saldo Debe", width: 80, sortable: false, dataIndex: "SALDO_DEBE", align: "right", renderer: Ext.util.Format.numberRenderer('0,000.00') }

        ];

        this.dockedItems = me.toolBar;
        me.dock = this.dockedItems;

    }
});