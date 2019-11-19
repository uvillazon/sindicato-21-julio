Ext.define("App.View.Sgaf.View.GridImportarFactura", {
    extend: "Ext.grid.Panel",
    title: 'SGAF Importaciones de Facturas',
    controller: 'App.View.Sgaf.Controller.GridImportarFacturaController',
    multiSelect: true,
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                itemId: 'btn_validar',
                text: 'Validar',
                iconCls: 'application_add',
            },
            {
                itemId: 'btn_procesar',
                text: 'Procesar',
                iconCls: 'application_add',
            },
            {
                itemId: 'btn_limpiar',
                text: 'Limpiar',
                iconCls: 'cros',
            }
        ]
    }],
    columns: [
        //{ xtype: "rownumberer", width: 30, sortable: false },
        { text: 'Fecha<br>Contabilidad', dataIndex: 'FECHA_CONTABILIDAD', width: 70, sortable: true },
        { text: 'Tipo<br>Contabilizacion', dataIndex: 'TIPO_CONTABILIZACION', width: 70, sortable: true },
        { text: 'IdProveedor', dataIndex: 'IDPROVEEDOR', width: 50, sortable: true },
        { text: 'Nit Proveedor', dataIndex: 'NIT_PROVEEDOR', width: 100, sortable: true },
        { text: 'Fecha<br>Factura', dataIndex: 'FECHA_FACTURA', width: 70, sortable: true },
        { text: 'Nro<br>Autorizacion', dataIndex: 'NRO_AUTORIZACION', width: 120, sortable: true },
        { text: 'Nro<br>Factura<br>Proveedor', dataIndex: 'NRO_FACT_PROV', width: 100, sortable: true },
        { text: 'Nit<br>Empresa', dataIndex: 'NIT_ELFEC', width: 70, sortable: true },
        { text: 'Codigo<br>Control', dataIndex: 'COD_CONTROL', width: 100, sortable: true },
        { text: 'Placa', dataIndex: 'PLACA', width: 70, sortable: true },
        { text: 'Observaciones', dataIndex: 'OBSERVACIONES', width: 150, sortable: true },
        { text: 'Precio<br>Unitario', dataIndex: 'PRECIO_UNI', width: 70, sortable: true },
        { text: 'Importe<br>Total', dataIndex: 'IMPORTE_TOTAL', width: 70, sortable: true },
        { text: 'Auxiliar', dataIndex: 'AUXILIAR', width: 100, sortable: true },
        { text: 'Id Obra', dataIndex: 'IDOBRA', width: 70, sortable: true },
        { text: 'Centro<br>Costos', dataIndex: 'CENTRO_COSTOS', width: 70, sortable: true },
        { text: 'Grupo CC', dataIndex: 'GRUPO_CC', width: 70, sortable: true },
        { text: 'IDProducto', dataIndex: 'IDPRODUCTO', width: 70, sortable: true },
        { text: 'Resultado', dataIndex: 'RESULTADO', width: 100, sortable: true },

    ],
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.View.Sgaf.Store.Sgaf");
        this.callParent(arguments);
    }
});