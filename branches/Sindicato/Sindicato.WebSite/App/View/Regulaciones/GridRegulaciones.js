Ext.define("App.View.Regulaciones.GridRegulaciones", {
    extend: "App.Config.Abstract.Grid",
    title: 'Regulaciones Registrados',
    criterios: true,
    textBusqueda: 'Socio/Movil.',
    imprimir: false,
    equipo: 'Regulaciones',
    initComponent: function () {
        var me = this;
        me.store = Ext.create("App.Store.Regulaciones.Regulaciones");
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'VENTAS');
            }
        };
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Numero", width: 70, sortable: true, dataIndex: "ID_REGULACION" },
            { header: "Movil", width: 70, sortable: true, dataIndex: "NRO_MOVIL" },
            { header: "Socio", width: 150, sortable: true, dataIndex: "SOCIO" },
            { header: 'Mes', dataIndex: 'MES', width: 80, renderer: Ext.util.Format.dateRenderer('m-Y') },
            { header: "Cantidad", width: 70, sortable: true, dataIndex: "CANTIDAD" },
            { header: "Importe", width: 70, sortable: true, dataIndex: "MONTO" },
            { header: "Observaciones", width: 200, sortable: true, dataIndex: "OBSERVACION" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },
            { header: "Responsable", width: 70, sortable: true, dataIndex: "LOGIN" },
            { header: 'Fecha<br>Registro', dataIndex: 'FECHA_REG', width: 80, renderer: Ext.util.Format.dateRenderer('d/m/Y') },
            
        ];
        this.callParent(arguments);
    }
});

