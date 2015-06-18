Ext.define("App.View.Descuentos.GridDetalles", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Socios',
    tamBusqueda: 50,
    title: 'Detalles Descuentos Registrados',
    equipo: '',
    modoEdicion : false,
    initComponent: function () {
        var me = this;
        if (!me.modoEdicion) {
            me.CargarGrid();
        }
        else {
            me.CargarGridEdicion();
        }
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Descuentos.Detalles");
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Socio", width: 150, sortable: false, dataIndex: "SOCIO" },
                { header: "Descuento", width: 250, sortable: false, dataIndex: "DESCUENTO" },
                { header: "Importe<br>Total BOB", width: 100, sortable: false, dataIndex: "IMPORTE" },
                { header: "Observacion", width: 100, sortable: false, dataIndex: "DETALLE" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];
    },
    CargarGridEdicion: function () {
        var me = this;
        me.plugins = [
           Ext.create('Ext.grid.plugin.CellEditing', {
               clicksToEdit: 1
           })
        ];
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Socio", width: 250, sortable: false, dataIndex: "SOCIO" },
                //{ header: "Importe<br>Total BOB", width: 80, sortable: false, dataIndex: "IMPORTE" }
                {
                    header: "Importe<br>Total BOB", width: 100, sortable: false, dataIndex: "IMPORTE", editor: {
                        xtype: 'numberfield',


                    }
                },
                {
                    header: "Observacion", width: 100, sortable: false, dataIndex: "DETALLE", editor: {
                        xtype : 'textfield'
                    }
                }
        ];
    }
});