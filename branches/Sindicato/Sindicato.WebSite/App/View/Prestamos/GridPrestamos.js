Ext.define("App.View.Prestamos.GridPrestamos", {
    extend: "App.Config.Abstract.Grid",
    criterios: true,
    textBusqueda: 'Buscar Prestamo',
    tamBusqueda: 70,
    title: 'Prestamos Registrados',
    equipo: '',
    initComponent: function () {
        var me = this;
        me.CargarGrid();
        this.callParent(arguments);
    },
    CargarGrid: function () {
        var me = this;
        me.store = Ext.create("App.Store.Prestamos.Prestamos");
        me.viewConfig = {
            getRowClass: function (record, rowIndex, rowParams, store) {
                return Constantes.CargarCssEstados(record.get("ESTADO_PRESTAMO"), 'PRESTAMOS');
            }
        };
        me.CargarComponentes();
        me.columns = [
                { xtype: "rownumberer", width: 30, sortable: false },
                { header: "Estado<br>Cierre", width: 60, sortable: false, dataIndex: "ESTADO_CIERRE" },
                { header: "Nro <br>Prestamos", width: 60, sortable: false, dataIndex: "ID_PRESTAMO" },
                { header: "Nro Movil", width: 60, sortable: false, dataIndex: "NRO_MOVIL" },
                { header: "Socio", width: 150, sortable: false, dataIndex: "SOCIO" },
                { header: "Caja", width: 100, sortable: false, dataIndex: "CAJA" },
                { header: "Fecha", width: 80, sortable: true, dataIndex: "FECHA", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Fecha<br>limite Pago", width: 80, sortable: true, dataIndex: "FECHA_LIMITE_PAGO", renderer: Ext.util.Format.dateRenderer('d/m/Y') },
                { header: "Tipo Prestamo", width: 150, sortable: false, dataIndex: "TIPO_PRESTAMO" },
                { header: "Cuota Semanal", width: 80, sortable: false, dataIndex: "COUTA" },
                
                { header: "Importe<br>Prestado", width: 70, sortable: false, dataIndex: "IMPORTE_PRESTAMO" },
                { header: "Importe<br>Interes", width: 70, sortable: false, dataIndex: "IMPORTE_INTERES" },
                { header: "Importe<br>Moras", width: 70, sortable: false, dataIndex: "MORA" },
                { header: "Importe<br>Total", width: 70, sortable: false, dataIndex: "IMPORTE_TOTAL" },
                { header: "Moneda", width: 70, sortable: false, dataIndex: "MONEDA" },
                { header: "Semanas", width: 70, sortable: false, dataIndex: "SEMANAS" },
                { header: "Tipo Interes", width: 100, sortable: false, dataIndex: "TIPO_INTERES" },
                //{ header: "Saldo", width: 70, sortable: false, dataIndex: "SALDO" },
                { header: "Debe", width: 70, sortable: false, dataIndex: "DEBE" },
                { header: "Total <br>Cancelado", width: 80, sortable: false, dataIndex: "TOTAL_CANCELADO" },
                { header: "<strong>CAPITAL<br>CANCELADO</strong>", width: 80, sortable: false, dataIndex: "SALDO_CAPITAL" },
                { header: "<strong>INTERES<br>CANCELADO</strong>", width: 80, sortable: false, dataIndex: "SALDO_INTERES" },
                { header: "Estado", width: 80, sortable: false, dataIndex: "ESTADO_PRESTAMO" },
                { header: "Login", width: 80, sortable: false, dataIndex: "LOGIN_USR" }
        ];


    }
});