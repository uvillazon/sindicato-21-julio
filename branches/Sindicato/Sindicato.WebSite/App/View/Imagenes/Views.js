Ext.define("App.View.Postes.GridConductores", {
    extend: "App.Config.Abstract.Grid",
    title: 'Conductores Registrados',
    criterios: true,
    textBusqueda: 'UC',
    imprimir: true,
    width: 550,
    height: 350,
    equipo: 'Postes',
    win: null,
    formulario: null,
    initComponent: function () {
        var me = this;
        if (me.opcion == "GridConductores") {
            me.CargarComponentesGridConductores();
        }
        else {
            alert("No selecciono ninguna opcion");
        }
        this.callParent(arguments);
    },
    CargarComponentesGridConductores: function () {
        var me = this;
        me.store = Ext.create("App.Store.Postes.Conductores");
        me.CargarComponentes();
        me.columns = [
            { xtype: "rownumberer", width: 30, sortable: false },
            { header: "Codigo<br>Conductor", width: 70, sortable: true, dataIndex: "COD_CONDUCTOR" },
            { header: "Cod Tipo", width: 70, sortable: true, dataIndex: "COD_TIPO" },
            { header: "Tipo", width: 100, sortable: true, dataIndex: "DESC_TIPO" },
            { header: "Formacion", width: 70, sortable: true, dataIndex: "FORMACION" },
            { header: "cod Poste<br>Inicio", width: 70, sortable: true, dataIndex: "COD_POSTE_I" },
            { header: "Nodo Poste<br>Inicio", width: 70, sortable: true, dataIndex: "NODO_POSTE_I" },
            { header: "Cod Poste<br>Final", width: 70, sortable: true, dataIndex: "COD_POSTE_F" },
            { header: "Nodo Poste<br>Final", width: 70, sortable: true, dataIndex: "NODO_POSTE_F" },
            { header: "Longitud", width: 70, sortable: true, dataIndex: "LONGITUD" },
            { header: "Fecha <br>Operacion", width: 80, sortable: true, dataIndex: "FECHA_OPER", renderer: Ext.util.Format.dateRenderer("d/m/Y") },
            { header: "Propiedad", width: 70, sortable: true, dataIndex: "PROPIEDAD" },
            { header: "Estado", width: 70, sortable: true, dataIndex: "ESTADO" },
        ];

    }
});