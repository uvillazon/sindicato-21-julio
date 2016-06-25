Ext.define("App.View.Reportes.Reportes", {
    extend: "App.Config.Abstract.Window",
    title: "",
    botones: true,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "ReportesIngresos") {
            me.textGuardar = "Reporte Totales";
            me.showBtn3 = true;
            me.CargarReporteIngresosTotales();


        }
        else if (me.opcion == "ReportesSocios") {
            me.textGuardar = "Reporte Socios";
            me.CargarReporteSocios();
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
        if (me.btn3 != null) {
            me.btn3.on('click', me.GuardarReporteDetalleHojas, this);
        }
    },
    
    CargarReporteIngresosTotales: function () {
        var me = this;
        me.formReporte = Ext.create("App.Config.Abstract.Form", { botones: false, title: "Generar Reporte Ingresos Totales", columns: 1 });

        me.date_fecha_inicial = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Desde",
            name: "FECHA_INI",
            format: 'm-d-Y'
        });
        me.date_fecha_final = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Hasta",
            name: "FECHA_FIN",
            format: 'm-d-Y'
        });
        me.formReporte.add([me.date_fecha_inicial, me.date_fecha_final]);
        me.items = me.formReporte;

    },
    CargarReporteSocios: function () {
        var me = this;
        me.formReporte = Ext.create("App.Config.Abstract.Form", { botones: false, title: "Generar Reporte Socios Moviles", columns: 1 });

        me.date_fecha_inicial = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Desde",
            name: "FECHA_INI",
            format: 'm-d-Y'
        });
        me.date_fecha_final = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Hasta",
            name: "FECHA_FIN",
            format: 'm-d-Y'
        });
        me.formReporte.add([me.date_fecha_inicial, me.date_fecha_final]);
        me.items = me.formReporte;

    },
    GuardarReporteDetalleHojas: function () {
        var me = this;
        if (me.formReporte.isValid()) {
            window.open(Constantes.HOST + 'ReportesPDF/ReporteDetalleHoja?tipo=pdf&FECHA_INI=' + me.date_fecha_inicial.getRawValue() + '&FECHA_FIN=' + me.date_fecha_final.getRawValue());
            me.hide();
        }
        else {
            Ext.Msg.alert("Error", "Falta Completar informcion...");
        }
    },
    GuardarReporte: function () {
        var me = this;
        if (me.opcion == "ReporteAutoridad") {
            if (me.formReporte.isValid()) {
                window.open(Constantes.HOST + 'Reportes/ReporteDetalleCierreAhorro?ANIO=' + me.cbx_anio.getValue() + '&MES=' + me.cbx_mes.getValue() + '&ID_COMBUSTIBLE=' + me.cbx_combustible.getValue());
                me.hide();
            }
            else {
                Ext.Msg.alert("Error", "Falta Completar informcion...");
            }
        }
        else if (me.opcion == "ReporteEstadoResultado") {
            if (me.formReporte.isValid()) {
                window.open(Constantes.HOST + 'ReportesPDF/ReporteEstadoResultado?ANIO=' + me.cbx_anio.getValue() + '&MES=' + me.cbx_mes.getValue());
                me.hide();
            }
            else {
                Ext.Msg.alert("Error", "Falta Completar informcion...");
            }
        }
        else if (me.opcion == "ReporteUtilidadVentaBruta") {
            if (me.formReporte.isValid()) {
                window.open(Constantes.HOST + 'Reportes/ReporteUtilidadVentaBruta?ANIO=' + me.cbx_anio.getValue() + '&MES=' + me.cbx_mes.getValue());
                me.hide();
            }
            else {
                Ext.Msg.alert("Error", "Falta Completar informcion...");
            }
        }
        else if (me.opcion == "ReporteUtilidadVentaEstimada") {
            if (me.formReporte.isValid()) {
                window.open(Constantes.HOST + 'Reportes/ReporteUtilidadVentaEstimada?ANIO=' + me.cbx_anio.getValue() + '&MES=' + me.cbx_mes.getValue());
                me.hide();
            }
            else {
                Ext.Msg.alert("Error", "Falta Completar informcion...");
            }
        }
        else if (me.opcion == "ReporteUtilidadBrutaReal") {
            if (me.formReporte.isValid()) {
                window.open(Constantes.HOST + 'Reportes/ReporteUtilidadBrutaReal?ANIO=' + me.cbx_anio.getValue() + '&MES=' + me.cbx_mes.getValue());
                me.hide();
            }
            else {
                Ext.Msg.alert("Error", "Falta Completar informcion...");
            }
        }
        else if (me.opcion == "ReportesIngresos") {
            if (me.formReporte.isValid()) {
                window.open(Constantes.HOST + 'ReportesPDF/ReporteIngresosTotales?tipo=pdf&FECHA_INI=' + me.date_fecha_inicial.getRawValue() + '&FECHA_FIN=' + me.date_fecha_final.getRawValue());
                me.hide();
            }
            else {
                Ext.Msg.alert("Error", "Falta Completar informcion...");
            }
        }
        else if (me.opcion == "ReportesSocios") {
            if (me.formReporte.isValid()) {
                window.open(Constantes.HOST + 'ReportesPDF/ReporteSociosMovilesActivos?tipo=pdf&FECHA_INI=' + me.date_fecha_inicial.getRawValue() + '&FECHA_FIN=' + me.date_fecha_final.getRawValue());
                me.hide();
            }
            else {
                Ext.Msg.alert("Error", "Falta Completar informcion...");
            }
        }
        else {
            alert(me.opcion);
        }

    },
});
