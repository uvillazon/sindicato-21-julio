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
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'VENTAS');
            }
        };
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Numero", width: 70, sortable: true, dataIndex: "ID_HOJA" },
            { header: "Nro Hoja", width: 70, sortable: true, dataIndex: "NRO_HOJA" },
            { header: "Movil", width: 70, sortable: true, dataIndex: "NRO_MOVIL" },
            { header: "Socio", width: 150, sortable: true, dataIndex: "SOCIO" },
            { header: 'Fecha<br>Compra', dataIndex: 'FECHA_COMPRA', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: 'Fecha<br>Uso', dataIndex: 'FECHA_USO', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: 'Fecha<br>Registro', dataIndex: 'FECHA_REG', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            { header: "Importe", width: 70, sortable: true, dataIndex: "MONTO" },
            { header: "Observaciones", width: 200, sortable: true, dataIndex: "OBSERVACION" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },
            { header: "Responsable", width: 70, sortable: true, dataIndex: "LOGIN" }

        ];
        this.callParent(arguments);
    }
});

