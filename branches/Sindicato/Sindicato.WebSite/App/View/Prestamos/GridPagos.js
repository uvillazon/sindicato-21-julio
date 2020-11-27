Ext.define("App.View.Prestamos.GridPagos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    busqueda: true,
    imprimir: true,
    excel: true,
    cargarStore: false,
    textBusqueda: 'Buscar Prestamo',
    tamBusqueda: 70,
    title: 'Pagos Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_VerDetalle', 'Imprimir', 'report', me.ImprimirReporte, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Eliminar', 'Anular', Constantes.ICONO_BAJA, me.Eliminar, me.toolbar, this, null, true);
        me.fbarmenu = me.toolbar,
        me.fbarmenuArray = ["btn_VerDetalle", "btn_Eliminar"];
        me.store = Ext.create("App.Store.Prestamos.Pagos");
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO"), 'VENTAS');
            }
        };
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Fecha<br>Pago", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Tipo", width: 80, sortable: false, dataIndex: "TIPO" },
                { header: "Importe", width: 100, sortable: false, dataIndex: "IMPORTE" },
                { header: "Socio", width: 200, sortable: false, dataIndex: "SOCIO" },
                { header: "Caja", width: 100, sortable: false, dataIndex: "CAJA" },
                { header: "Observaciones", width: 200, sortable: false, dataIndex: "OBSERVACION" },
                { header: "Estado", width: 80, sortable: false, dataIndex: "ESTADO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN_USR" }
        ];


    },
    ImprimirReporte: function () {
        var me = this;
        fn.VerImpresion("ReportePagoPrestamo", "ID_PAGO=" + me.record.get('ID_PAGO'));
    },
    Eliminar: function () {
        var me = this;
        if (me.record.get('ESTADO') == "NUEVO" && me.record.get('TIPO') == "PAGO") {
            Funciones.AjaxRequestGrid("Prestamos", "EliminarPago", me, "Esta seguro de Anular el Pago?", { ID_PAGO: me.record.get('ID_PAGO') }, me, null, null);
        }
        else {
            Ext.Msg.alert("Error", "Solo puede anular los pagos en estado NUEVO y Tipo PAGO");
        }
    }
});