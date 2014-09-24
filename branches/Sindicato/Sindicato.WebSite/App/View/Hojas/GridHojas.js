Ext.define("App.View.Hojas.GridHojas", {
    extend: "App.Config.Abstract.Grid",
    //title: 'Compras Registradas',
    iconCls: '',
    criterios: true,
    busqueda: true,
    imprimir: true,
    toolbar: '',
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridHojas") {
            me.CargarGridCompras();
            me.eventosGrid();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    eventosGrid: function () {
        var me = this;
        //        me.cmp.on('select',function(dat,))
        me.cmp.on('change', function (dat, newvalue) {
            if (newvalue != null) {
//                me.date_fin.setValue(Ext.Date.add(newvalue, Ext.Date.DAY, me.num_cantidad.getValue()));
                me.getStore().setExtraParams({ FECHA_COMPRA: newvalue });
                me.getStore().load();
            }
        });
        //        me.cbx_mes.on('select', function (cmb, record) {
        //            me.store.setExtraParam('MES', record[0].get('CODIGO'));
        //            me.store.setExtraParam('ANIO', me.cbx_anio.getValue());
        //            me.store.load();
        //        });
        //        me.cbx_anio.on('select', function (cmb, record) {
        //            me.store.setExtraParam('ANIO', record[0].get('CODIGO'));
        //            me.store.setExtraParam('MES', me.cbx_mes.getValue());
        //            me.store.load();
        //        });

    },
    CargarGridCompras: function () {
        var me = this;
        me.store = Ext.create("App.Store.Hojas.Hojas");
        me.cmp = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: 'Fecha Compra',
            margin: '5',
            name: 'FECHA_COMPRA',
            value: new Date(),
            width: 170,
            labelWidth: 50
        });
        me.CargarComponentes();
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


    }
});