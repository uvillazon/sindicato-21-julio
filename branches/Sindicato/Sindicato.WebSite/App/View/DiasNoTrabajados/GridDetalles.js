Ext.define("App.View.DetallesDeudasSocios.GridDetalles", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Buscar Deuda',
    tamBusqueda: 70,
    title: 'Deudas de Socios Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.DeudasSocios.Detalles");
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO_DEUDA"), 'DEUDA');
            }
        };
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Deuda", width: 150, sortable: false, dataIndex: "MOTIVO" },
                { header: "Observacion", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Observacion Anulacion", width: 200, sortable: false, dataIndex: "OBSERVACION_ANULACION" },
                
                { header: "Caja", width: 100, sortable: false, dataIndex: "CAJA" },
                { header: "Movil", width: 50, sortable: false, dataIndex: "MOVIL" },
                { header: "Socio", width: 150, sortable: false, dataIndex: "SOCIO" },
                { header: "Importe", width: 70, sortable: false, dataIndex: "IMPORTE" },
                { header: "Importe Cancelado", width: 70, sortable: false, dataIndex: "IMPORTE_CANCELADO" },
                { header: "Fecha Cancelado", width: 80, sortable: true, dataIndex: "FECHA_CANCELADO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Estado", width: 100, sortable: false, dataIndex: "ESTADO" },
                { header: "Fecha <br>Registro", width: 80, sortable: true, dataIndex: "FECHA_REG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN_USR" }
        ];


    }
});