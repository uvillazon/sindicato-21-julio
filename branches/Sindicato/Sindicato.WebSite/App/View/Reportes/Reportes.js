Ext.define("App.View.Reportes.Reportes", {
    extend: "App.Config.Abstract.Window",
    title: "",
    botones: true,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "ReportesIngresos") {
            me.textGuardar = "Reporte Totales";
            me.showBtn3 = false;
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
        me.formReporte = Ext.create("App.Config.Abstract.Form", { botones: false, title: "Generar Reporte", columns: 1 });
        me.store_tipo_reporte = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipo_reporte.setExtraParam('ID_LISTA', Lista.Buscar('REPORTES'));

        me.cbx_reporte = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Reporte",
            name: "REPORTE",
            width: 240,
            store: me.store_tipo_reporte,
            selectOnFocus: true
        });

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
        me.formReporte.add([me.cbx_reporte ,me.date_fecha_inicial, me.date_fecha_final]);
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
        
        if (me.opcion == "ReportesIngresos") {
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
