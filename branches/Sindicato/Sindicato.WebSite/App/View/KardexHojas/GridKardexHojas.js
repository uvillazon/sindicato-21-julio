Ext.define("App.View.KardexHojas.GridKardexHojas", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Movil',
    tamBusqueda: 50,
    title: 'Kardex Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGridAutos();
        this.callParent(arguments);
    },
    CargarGridAutos: function () {
        var me = this;
        me.store = Ext.create("App.Store.KardexHojas.KardexHojas");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
               { header: "Mes", width: 100, sortable: true, dataIndex: "MES", renderer: Ext.util.Format.dateRenderer('m/Y') },
                { header: "Nro Movil", width: 100, sortable: false, dataIndex: "NRO_MOVIL" },
                { header: "Socio", width: 200, sortable: false, dataIndex: "SOCIO" },
                { header: "Cantidad<br>Hojas Compradas", width: 100, sortable: true, dataIndex: "CANT_HOJAS" },
                { header: "Cantidad<br>Hojas Regularizadas", width: 100, sortable: true, dataIndex: "CANT_REGULACIONES" },
                { header: "Cantidad<br>Obligatorias", width: 100, sortable: true, dataIndex: "CANT_HOJAS_OBLIG" },
                { header: "Debe Hojas", width: 100, sortable: true, dataIndex: "DEBE" },
                //{ header: " - ", width: 30, sortable: false, dataIndex: "ID_USR", hidden: true },
        ];


    }
});