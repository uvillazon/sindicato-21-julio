﻿Ext.define("App.View.RetirosSocio.GridRetiros", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Retiros',
    tamBusqueda: 50,
    title: 'Retiros Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.RetirosSocio.Retiros");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro <br>Recibo", width: 80, sortable: false, dataIndex: "NRO_RECIBO" },
                { header: "Socio", width: 150, sortable: false, dataIndex: "NOMBRE_SOCIO" },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Detalle", width: 250, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Importe<br>Retiro BOB", width: 100, sortable: false, dataIndex: "RETIRO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];


    }
});