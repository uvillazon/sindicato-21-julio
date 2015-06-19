Ext.define("App.View.Descuentos.GridDescuentos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Descuentos',
    tamBusqueda: 50,
    title: 'Descuentos Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                //if(record.get('ESTADO')== "")
                console.dir(record);
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'DESCUENTO');
            }
        };
        me.store = Ext.create("App.Store.Descuentos.Descuentos");
        me.CargarComponentes();
       
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Periodo", width: 80, sortable: false, dataIndex: "PERIODO" },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Descuento", width: 100, sortable: false, dataIndex: "DESCUENTO" },
                { header: "Descripcion", width: 250, sortable: false, dataIndex: "DESCRIPCION" },
                { header: "Importe<br>Total BOB", width: 100, sortable: false, dataIndex: "TOTAL" },
                { header: "Estado", width: 80, sortable: false, dataIndex: "ESTADO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN" }
        ];


    }
});