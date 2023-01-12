Ext.define("App.View.DiasNoTrabajados.GridDetalles", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Buscar Movil/id',
    tamBusqueda: 70,
    title: 'Deudas de Socios Por Dias no trabajados Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.DiasNoTrabajados.Detalles");
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO_DEUDA"), 'DEUDA');
            }
        };
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Nro Deuda", width: 100, sortable: false, dataIndex: "ID_DETALLE" },
                { header: "Dia No Trabajado", width: 150, sortable: false, dataIndex: "FECHA_NO_TRABAJADO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Cantidad<br>Vueltas", width: 100, sortable: false, dataIndex: "CANT_RECORRIDO" },
                
                { header: "Caja", width: 100, sortable: false, dataIndex: "CAJA" },
                { header: "Movil", width: 50, sortable: false, dataIndex: "MOVIL" },
                { header: "Socio", width: 150, sortable: false, dataIndex: "SOCIO" },
                { header: "Importe", width: 70, sortable: false, dataIndex: "IMPORTE" },
                { header: "Importe <br>Cancelado", width: 100, sortable: false, dataIndex: "IMPORTE_CANCELADO" },
                { header: "Fecha <br>Cancelado", width: 100, sortable: true, dataIndex: "FECHA_CANCELADO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Observacion", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Observacion <br>Anulacion", width: 200, sortable: false, dataIndex: "OBSERVACION_ANULACION" },
                { header: "Estado Pago", width: 100, sortable: false, dataIndex: "ESTADO_DEUDA" },
                { header: "Estado", width: 100, sortable: false, dataIndex: "ESTADO" },
                { header: "Fecha <br>Registro", width: 80, sortable: true, dataIndex: "FECHA_REG", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                 { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN_USR" }
        ];


    }
});