Ext.define("App.View.Reportes.Reportes", {
    extend: "App.Config.Abstract.Window",
    title: "",
    botones: true,
    columns: 2,
    rutaReporte: '',
    condicion : '',
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
                me.cbx_caja.setDisabled(true);
                me.cbx_caja.reset();
                me.cbx_moneda.setDisabled(true);
                me.cbx_moneda.reset();
            }
            else if (cbx.getValue() == "REPORTE ESTADO RESULTADO POR CAJA") {
                me.cbx_socio.setDisabled(true);
                me.cbx_socio.reset();
                me.cbx_caja.setDisabled(false);
                me.cbx_caja.reset();
                me.cbx_moneda.setDisabled(true);
                me.cbx_moneda.reset();
            }
            else if (cbx.getValue() == "REPORTE ESTADO RESULTADO A DETALLE POR CAJA") {
                me.cbx_socio.setDisabled(true);
                me.cbx_socio.reset();
                me.cbx_caja.setDisabled(false);
                me.cbx_caja.reset();
                me.cbx_moneda.setDisabled(true);
                me.cbx_moneda.reset();
            }
            else if (cbx.getValue() == "REPORTE ESTADO RESULTADO POR MONEDA") {
                me.cbx_socio.setDisabled(true);
                me.cbx_socio.reset();
                me.cbx_caja.setDisabled(true);
                me.cbx_caja.reset();
                me.cbx_moneda.setDisabled(false);
                me.cbx_moneda.reset();
            }
            else {
                me.cbx_socio.setDisabled(true);
                me.cbx_socio.reset();
                me.cbx_caja.setDisabled(true);
                me.cbx_caja.reset();
                me.cbx_moneda.setDisabled(true);
                me.cbx_moneda.reset();
            }

        });
    },
    CargarReportes: function () {
        var me = this;
        me.formReporte = Ext.create("App.Config.Abstract.Form", { botones: false, title: "Generar Reporte", columns: 2 });
        me.store_tipo_reporte = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipo_reporte.setExtraParam('ID_LISTA', Lista.Buscar('REPORTES'));
        me.store_tipo_reporte.setExtraParam('ESTADO', 'A');
        me.store_tipo_reporte.load();
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
            colspan: 2,
            //colspan: 2,
            textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        });
        me.store_moneda = Ext.create('App.Store.Listas.StoreLista');
        me.store_moneda.setExtraParam('ID_LISTA', Lista.Buscar('MONEDA'));
        me.cbx_moneda = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Moneda",
            name: "MONEDA",
            displayField: 'VALOR',
            store: me.store_moneda,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.store_caja = Ext.create('App.Store.Cajas.Cajas');
        me.cbx_caja = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Caja",
            name: "ID_CAJA",
            displayField: 'NOMBRE',
            valueField: 'ID_CAJA',
            store: me.store_caja,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            //width: 480,
            //colspan: 2,
            textoTpl: function () { return "{CODIGO} : {NOMBRE} - {DESCRIPCION} - {MONEDA}" }
        });

        me.formReporte.add([me.cbx_reporte, me.date_fecha_inicial, me.date_fecha_final, me.cbx_socio, me.cbx_caja, me.cbx_moneda]);
        me.items = me.formReporte;
        me.cargarEventos();

    },
    cargarEventos: function () {
        var me = this;
        me.condicion = "";
        me.cbx_reporte.on('select', function (cbx, record) {
            me.condicion = "";
            switch (cbx.getValue()) {
                case "REPORTE DETALLE DE HOJAS":
                    me.rutaReporte = "ReporteDetalleHoja";
                    break;
                case "REPORTE MATRIZ POR AHORRO":
                    me.rutaReporte = "ReporteMatrizHojas";
                    break;
                case "REPORTE MATRIZ POR AHORRO CANCELADOS":
                    me.rutaReporte = "ReporteMatrizHojasCancelado";
                    break;
                case "REPORTE MATRIZ POR AHORRO/DEBE":
                    me.rutaReporte = "ReporteMatrizHojasDebe";
                    break;
                case "REPORTE MATRIZ POR AHORRO":
                    me.rutaReporte = "ReporteMatrizHojas";
                    break;
                case "REPORTE INGRESOS TOTALES":
                    me.rutaReporte = "ReporteIngresosTotales";
                    break;
                case "REPORTE SOCIOS ACTIVOS":
                    me.rutaReporte = "ReporteSociosMovilesActivos";
                    break;
                case "REPORTE INGRESOS DETALLE GLOBAL":
                    me.rutaReporte = "ReporteIngresosDetalle";
                    break;
                case "REPORTE INGRESOS DETALLE":
                    me.rutaReporte = "ReporteIngresosDetalle";
                    me.condicion = "REPORTE1";
                    break;
                case "REPORTE INGRESOS DETALLE PRESTAMOS":
                    me.rutaReporte = "ReporteIngresosDetalle";
                    me.condicion = "REPORTE_PRESTAMOS";
                    break;
                case "REPORTE INGRESOS DETALLE PANTER":
                    me.rutaReporte = "ReporteIngresosDetalle";
                    me.condicion = "REPORTE_PANTER";
                    break;
                case "REPORTE INGRESOS DETALLE PRO CEDE":
                    me.rutaReporte = "ReporteIngresosDetalle";
                    me.condicion = "REPORTE_PRO_CEDE";
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
                case "REPORTE AHORROS Y RETIROS POR SOCIO":
                    me.rutaReporte = "ReporteAhorrosCobros";
                    break;
                case "REPORTE ESTADO RESULTADO POR CAJA":
                    me.rutaReporte = "ReporteEstadoResultadoPorCaja";
                    break;
                case "REPORTE ESTADO RESULTADO A DETALLE POR CAJA":
                    me.rutaReporte = "ReporteEstadoResultadoDetallePorCaja";
                    break;
                case "REPORTE ESTADO RESULTADO POR MONEDA":
                    me.rutaReporte = "ReporteEstadoResultadoPorMoneda";
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
                else if (me.rutaReporte == "ReporteEstadoResultadoPorCaja" || me.rutaReporte == "ReporteEstadoResultadoDetallePorCaja") {
                    me.generarReporte(me.rutaReporte, 'FECHA_INI=' + me.date_fecha_inicial.getRawValue() + '&FECHA_FIN=' + me.date_fecha_final.getRawValue() + '&ID_CAJA=' + me.cbx_caja.getValue());

                }
                else if (me.rutaReporte == "ReporteEstadoResultadoPorMoneda") {
                    me.generarReporte(me.rutaReporte, 'FECHA_INI=' + me.date_fecha_inicial.getRawValue() + '&FECHA_FIN=' + me.date_fecha_final.getRawValue() + '&MONEDA=' + me.cbx_moneda.getValue());

                }
                else {
                    me.generarReporte(me.rutaReporte, 'FECHA_INI=' + me.date_fecha_inicial.getRawValue() + '&FECHA_FIN=' + me.date_fecha_final.getRawValue()+'&CONDICION='+me.condicion);
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
