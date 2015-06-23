Ext.define("App.View.Ventas.GridVentas", {
    extend: "App.Config.Abstract.Grid",
    title: 'Ventas Registrados',
    criterios: true,
    textBusqueda: 'Socio/Movil.',
    imprimir: false,
    equipo: 'Ventas',
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.Store.Ventas.Ventas");
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                //if(record.get('ESTADO')== "")
                console.dir(record);
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'VENTAS');
            }
        };
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Nro Venta", width: 70, sortable: true, dataIndex: "ID_VENTA" },
            { header: "Movil", width: 70, sortable: true, dataIndex: "NRO_MOVIL" },
            { header: "Socio", width: 150, sortable: true, dataIndex: "SOCIO" },
            { header: 'Fecha<br>Venta', dataIndex: 'FECHA_VENTA', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Cantidad<br>Hojas Vendidas", width: 70, sortable: true, dataIndex: "TOTAL_HOJAS" },
            { header: "Total", width: 70, sortable: true, dataIndex: "TOTAL" },
            { header: "Descuento", width: 70, sortable: true, dataIndex: "DESCUENTO" },
            { header: "Observaciones", width: 200, sortable: true, dataIndex: "OBSERVACION" },

            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },
            { header: "Responsable", width: 70, sortable: true, dataIndex: "LOGIN" }

        ];
        this.callParent(arguments);
    }
});

