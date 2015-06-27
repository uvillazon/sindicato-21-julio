Ext.define("App.View.Cierres.GridCierreSocios", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Socio',
    tamBusqueda: 50,
    title: 'Detalle Socios Por Periodo',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Cierres.Detalles");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Periodo", width: 80, sortable: false, dataIndex: "PERIODO" },
                { header: "Socios", width: 150, sortable: false, dataIndex: "SOCIO" },
                { header: "(+)Ingresos<br>Hoja", width: 80, sortable: false, dataIndex: "INGRESOS_HOJAS" },
                { header: "(+)Otros<br>Ingresos", width: 80, sortable: false, dataIndex: "OTROS_INGRESOS" },
                { header: "(-)Obligaciones<br>Inst.", width: 80, sortable: false, dataIndex: "OBLIGACIONES_INSTITUCION" },
                { header: "(-)Otras<br>Obligaciones", width: 80, sortable: false, dataIndex: "OTRAS_OBLIGACIONES" },
                { header: "(-)Descuentos", width: 80, sortable: false, dataIndex: "DESCUENTOS" },
                { header: "(+)Ahorra<br>Socio", width: 80, sortable: false, dataIndex: "AHORRO" },
                { header: "(-)Deuda<br>Socio", width: 80, sortable: false, dataIndex: "DEUDA" }
        ];


    }
});
