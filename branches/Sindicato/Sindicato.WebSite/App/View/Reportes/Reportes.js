Ext.define("App.View.Reportes.Reportes", {
    extend: "App.Config.Abstract.Window",
    title: "",
    botones: true,
    columns: 2,
    rutaReporte: '',
    initComponent: function () {
        var me = this;
        if (me.opcion == "ReportesIngresos") {
            me.textGuardar = "Reporte Totales";
            me.columns = 2;
            me.CargarReportes();
            me.CargarEventos();


        }

        else {
            Ext.Msg.alert("Aviso", "No Existe Opcion");
        }
        //        else if (me.opcion == 'formResumen') {
        //            me.title = "Resumen";
        //            me.CargarFormResumen();
        //        }
        this.callParent(arguments);
        me.btn_guardar.on('click', me.GuardarReporte, this);

    },
    CargarEventos: function () {
        var me = this;
        me.cbx_reporte.on('select', function (cbx, record) {
            if (cbx.getValue() == "REPORTE COMPRA DE HOJAS POR SOCIO") {
                me.cbx_socio.setDisabled(false);
                me.cbx_socio.reset();
            }
            else {
                me.cbx_socio.setDisabled(true);
                me.cbx_socio.reset();
            }

        });
    },
    CargarReportes: function () {
        var me = this;
        me.formReporte = Ext.create("App.Config.Abstract.Form", { botones: false, title: "Generar Reporte", columns: 2 });
        me.store_tipo_reporte = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipo_reporte.setExtraParam('ID_LISTA', Lista.Buscar('REPORTES'));

        me.cbx_reporte = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Reporte",
            name: "REPORTE",
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            colspan: 2,
            store: me.store_tipo_reporte,
            selectOnFocus: true
        });

        me.date_fecha_inicial = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Desde",
            name: "FECHA_INI",
            format: 'm-d-Y',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.date_fecha_final = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Hasta",
            name: "FECHA_FIN",
            format: 'm-d-Y',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });

        me.store_socio = Ext.create('App.Store.Socios.Socios');

        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Nro Movil",
            name: "ID_SOCIO_MOVIL",
            displayField: 'NRO_MOVIL',
            store: me.store_socio,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            width: 480,
            colspan : 2,
            //colspan: 2,
            textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        });

        me.formReporte.add([me.cbx_reporte, me.date_fecha_inicial, me.date_fecha_final, me.cbx_socio]);
        me.items = me.formReporte;
        me.cargarEventos();

    },
    cargarEventos: function () {
        var me = this;
        me.cbx_reporte.on('select', function (cbx, record) {
            switch (cbx.getValue()) {
                case "REPORTE DETALLE DE HOJAS":
                    me.rutaReporte = "ReporteDetalleHoja";
                    break;
                case "REPORTE INGRESOS TOTALES":
                    me.rutaReporte = "ReporteIngresosTotales";
                    break;
                case "REPORTE SOCIOS ACTIVOS":
                    me.rutaReporte = "ReporteSociosMovilesActivos";
                    break;
                case "REPORTE INGRESOS DETALLE":
                    me.rutaReporte = "ReporteIngresosDetalle";
                    break;
                case "REPORTE INGRESOS DETALLE POR CAJA":
                    me.rutaReporte = "ReporteIngresosDetallePorCaja";
                    break;
                case "REPORTE EGRESOS":
                    me.rutaReporte = "ReporteEgresosDetalle";
                    break;
                case "REPORTE DETALLE VENTAS DE HOJAS":
                    me.rutaReporte = "ReporteDiarioHoja";
                    break;
                case "REPORTE DETALLE REGULARIZADAS":
                    me.rutaReporte = "ReporteDiarioRegularizadas";
                    break;
                case "REPORTES DETALLE DE PRESTAMOS Y PAGOS":
                    me.rutaReporte = "ReportePrestamosPagosDetalle";
                    break;
                case "REPORTE TOTAL DE PRESTAMOS":
                    me.rutaReporte = "ReportePrestamosTotales";
                    break;
                case "REPORTE DEUDORES COPERATIVA":
                    me.rutaReporte = "ReporteDeudoresCoperativa";
                    break;
                case "REPORTE DEUDORES COPERATIVA CUOTA":
                    me.rutaReporte = "ReporteDeudoresCoperativaCouta";
                    break;
                case "REPORTE DEUDORES POR HOJA":
                    me.rutaReporte = "ReporteDeudoresHoja";
                    break;
                case "REPORTE COMPRA DE HOJAS POR SOCIO":
                    me.rutaReporte = "ReporteDetalleHojasPorSocio";
                    break;
                default:
                    me.rutaReporte = "";
            }
        });
    },
    GuardarReporte: function () {
        var me = this;
        if (me.rutaReporte != "") {
            if (me.formReporte.isValid()) {
                if (me.rutaReporte == "ReporteDetalleHojasPorSocio") {
                    me.generarReporte(me.rutaReporte, 'FECHA_INI=' + me.date_fecha_inicial.getRawValue() + '&FECHA_FIN=' + me.date_fecha_final.getRawValue() + '&ID_SOCIO_MOVIL=' + me.cbx_socio.getValue());

                }
                else {
                    me.generarReporte(me.rutaReporte, 'FECHA_INI=' + me.date_fecha_inicial.getRawValue() + '&FECHA_FIN=' + me.date_fecha_final.getRawValue());
                }
                    //window.open(Constantes.HOST + 'ReportesPDF/ReporteIngresosTotales?tipo=pdf&FECHA_INI=' + me.date_fecha_inicial.getRawValue() + '&FECHA_FIN=' + me.date_fecha_final.getRawValue());
                //me.hide();
            }
            else {
                Ext.Msg.alert("Error", "Falta Completar informcion...");
            }
        }
        else {
            Ext.Msg.alert("Error", "No esta definido el reporte consule TI.");
        }

    },
    generarReporte: function (reporte, params) {
        fn.VerImpresion(reporte, params);
    }
})
