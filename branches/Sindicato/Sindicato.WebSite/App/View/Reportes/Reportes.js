Ext.define("App.View.Reportes.Reportes", {
    extend: "App.Config.Abstract.Window",
    title: "",
    botones: true,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "ReportesIngresos") {
            me.textGuardar = "Generar Reporte Ingresos Totales";
            me.CargarReporteIngresosTotales();

        }
        else if (me.opcion == "ReporteEstadoResultado") {
            me.textGuardar = "Generar Estado Resultado";
            me.CargarReporteEstadoResultado();
        }
        else if (me.opcion == "ReporteUtilidadVentaBruta") {
            me.textGuardar = "Utilidad de Venta Bruta";
            me.CargarReporteUtilidadVentaBruta();
        }
        else if (me.opcion == "ReporteUtilidadVentaEstimada") {
            me.textGuardar = "Utilidad de Venta Estimada";
            me.CargarReporteUtilidadVentaBruta();
        }
        else if (me.opcion == "ReporteUtilidadBrutaReal") {
            me.textGuardar = "Utilidad Bruta Real";
            me.CargarReporteUtilidadVentaBruta();
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
    CargarReporteAutoridad: function () {
        var me = this;
        me.formReporte = Ext.create("App.Config.Abstract.Form", { botones: false, title: "Generar Reporte Autoridad", columns: 1 });

        me.store_mes = Ext.create('App.Store.Listas.StoreLista');
        me.store_mes.setExtraParam('ID_LISTA', Lista.Buscar('MES'));
        me.cbx_mes = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Mes",
            name: "MES",
            displayField: 'VALOR',
            valueField: 'CODIGO',
            store: me.store_mes,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.store_anio = Ext.create('App.Store.Listas.StoreLista');
        me.store_anio.setExtraParam('ID_LISTA', Lista.Buscar('ANIO'));
        me.cbx_anio = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "A\u00f1o",
            name: "ANIO",
            displayField: 'VALOR',
            valueField: 'CODIGO',
            store: me.store_anio,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.store_combustible = Ext.create('App.Store.Combustibles.Combustibles').load();
        me.cbx_combustible = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Combustible",
            name: "ID_COMBUSTIBLE",
            displayField: 'NOMBRE',
            valueField: 'ID_COMBUSTIBLE',
            store: me.store_combustible,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE} - {DESCRIPCION}" }
        });
        me.formReporte.add([me.cbx_mes, me.cbx_anio, me.cbx_combustible]);
        me.items = me.formReporte;

    },
    CargarReporteEstadoResultado: function () {
        var me = this;
        me.formReporte = Ext.create("App.Config.Abstract.Form", { botones: false, title: "Generar Estado de Resultado", columns: 1 });

        me.store_mes = Ext.create('App.Store.Listas.StoreLista');
        me.store_mes.setExtraParam('ID_LISTA', Lista.Buscar('MES'));
        me.cbx_mes = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Mes",
            name: "MES",
            displayField: 'VALOR',
            valueField: 'CODIGO',
            store: me.store_mes,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.store_anio = Ext.create('App.Store.Listas.StoreLista');
        me.store_anio.setExtraParam('ID_LISTA', Lista.Buscar('ANIO'));
        me.cbx_anio = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "A\u00f1o",
            name: "ANIO",
            displayField: 'VALOR',
            valueField: 'CODIGO',
            store: me.store_anio,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        var fecha_actual = new Date();
        me.store_mes.on('load', function () {

            var meses = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
            me.cbx_mes.setValue(meses[fecha_actual.getMonth()].toString());
        });

        me.store_anio.on('load', function () {
            me.cbx_anio.setValue(fecha_actual.getFullYear().toString());
        });
        me.formReporte.add([me.cbx_mes, me.cbx_anio]);
        me.items = me.formReporte;
    },
    CargarReporteUtilidadVentaBruta: function () {
        var me = this;
        me.formReporte = Ext.create("App.Config.Abstract.Form", { botones: false, title: "Generar Utilidad Venta ", columns: 1 });

        me.store_mes = Ext.create('App.Store.Listas.StoreLista');
        me.store_mes.setExtraParam('ID_LISTA', Lista.Buscar('MES'));
        me.cbx_mes = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Mes",
            name: "MES",
            displayField: 'VALOR',
            valueField: 'CODIGO',
            store: me.store_mes,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.store_anio = Ext.create('App.Store.Listas.StoreLista');
        me.store_anio.setExtraParam('ID_LISTA', Lista.Buscar('ANIO'));
        me.cbx_anio = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "A\u00f1o",
            name: "ANIO",
            displayField: 'VALOR',
            valueField: 'CODIGO',
            store: me.store_anio,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        var fecha_actual = new Date();
        me.store_mes.on('load', function () {

            var meses = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
            me.cbx_mes.setValue(meses[fecha_actual.getMonth()].toString());
        });

        me.store_anio.on('load', function () {
            me.cbx_anio.setValue(fecha_actual.getFullYear().toString());
        });
        me.formReporte.add([me.cbx_mes, me.cbx_anio]);
        me.items = me.formReporte;
    },
    CargarReporteIngresosTotales : function(){
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
    GuardarReporte: function () {
        var me = this;
        if (me.opcion == "ReporteAutoridad") {
            if (me.formReporte.isValid()) {
                window.open(Constantes.HOST + 'Reportes/ReporteAutoridad?ANIO=' + me.cbx_anio.getValue() + '&MES=' + me.cbx_mes.getValue() + '&ID_COMBUSTIBLE=' + me.cbx_combustible.getValue());
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
        else {
            alert(me.opcion);
        }

    },
});
