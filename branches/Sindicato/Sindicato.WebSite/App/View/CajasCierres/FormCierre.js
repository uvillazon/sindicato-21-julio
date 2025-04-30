Ext.define("App.View.CajasCierres.FormCierre", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos Cierre de Caja Parcial',
    modoConsulta: false,
    initComponent: function () {
        var me = this;

        me.CargarComponentesForm();
        me.CargarEventos();
        this.callParent(arguments);
    },
    CargarEventos: function () {
        var me = this;
        me.date_fecha_fin.on('select', function (dat, value) {
            me.gridDetalle.getStore().setExtraParams({ FECHA_DESDE: me.date_fecha_ini.getValue(), FECHA_HASTA: value, ID_CAJA: me.cbx_caja.getValue() });
            me.gridDetalle.getStore().load();
        });
        me.gridDetalle.getStore().on('load', function (str, records) {
            var ingresos = str.sum('IMPORTE');
            me.txt_total.setValue(ingresos);
        });
        me.cbx_caja.on('select', function (cbx, rec) {
            console.log(rec);
            me.ObtenerUltimoRegistro(rec[0].get('ID_CAJA'))
        });
        me.btnReporte.on('click', function () {
            var fechaini = me.date_fecha_ini.getValue(); // Date object
            var fechaFormateada = Ext.Date.format(fechaini, 'Y-m-d'); // '2025-04-01'
            var fechafin = me.date_fecha_fin.getValue(); // Date object
            var fechaFormateadaFin = Ext.Date.format(fechafin, 'Y-m-d'); // '2025-04-01'
            me.generarReporte("ReporteCierreParcialGenerado", 'FECHA_INI=' + fechaFormateada + '&FECHA_FIN=' + fechaFormateadaFin + '&ID_CAJA=' + me.cbx_caja.getValue());

        });

        me.btReporteCooperativa.on('click', function () {
            var fechaini = me.date_fecha_ini.getValue(); // Date object
            var fechaFormateada = Ext.Date.format(fechaini, 'Y-m-d'); // '2025-04-01'
            var fechafin = me.date_fecha_fin.getValue(); // Date object
            var fechaFormateadaFin = Ext.Date.format(fechafin, 'Y-m-d'); // '2025-04-01'
            me.generarReporte("ReportePrestamosParcial", 'FECHA_INI=' + fechaFormateada + '&FECHA_FIN=' + fechaFormateadaFin + '&ID_CIERRE=' + me.txt_id_cierre_anterior.getValue() + '&ID_CAJA=' + me.cbx_caja.getValue());

        });
    },
    generarReporte: function (reporte, params) {
        fn.VerImpresion(reporte, params);
    },
    CargarComponentesForm: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            name: "ID_CIERRE"

        });

        me.txt_id_cierre_anterior = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            name: "ID_CIERRE_AMTERIOR"

        });
        me.store_caja = Ext.create('App.Store.Cajas.Cajas');
        me.store_caja.setExtraParams(me.paramsStore);
        me.cbx_caja = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Caja",
            name: "ID_CAJA",
            displayField: 'NOMBRE',
            valueField: 'ID_CAJA',
            store: me.store_caja,
            colspan: 2,
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE} - {DESCRIPCION}" },
        
        });

        me.date_fecha_ini = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Ini",
            maximo: 'Sin Maximo',
            name: "FECHA_INI",
            //format: 'm-d-Y',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.date_fecha_fin = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Fin",
            opcion: 'sin fecha',
            //format: 'm-d-Y',
            //maximo: 'Sin Maximo',
            name: "FECHA_FIN",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            maxLength: 500,
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            //width: 480,
            name: "ESTADO",
            readOnly: true,
            //colspan: 2,
            value: 'ACTIVO'

        });
        me.txt_saldoInicial = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo Inicial",
            //width: 480,
            name: "SALDO_INICIAL",
            value : 0,
            readOnly: true,

        });
        me.txt_total = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo Final",
            //width: 480,
            name: "SALDO_FINAL",
            readOnly: true,

        });
        me.btnReporte = Ext.create('Ext.button.Button', {
            text: 'Generar<br> Reporte',
            itemId: 'report',
            scale: 'large',
            iconCls: 'report',
            margin: '0 10 0 10',
            flex: 1
        });
        me.btReporteCooperativa = Ext.create('Ext.button.Button', {
            text: 'Reporte <br> Cooperativa',
            itemId: 'btnposte',
            scale: 'large',
            iconCls: 'report',
            margin: '0 10 0 10',
            flex: 1
        });
        me.fieldSet = Ext.create('Ext.form.FieldSet', {
           
            title: 'Reportes',
            colspan : 2,
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [me.btnReporte, me.btReporteCooperativa]
        });

        me.gridDetalle = Ext.create("App.View.CajasCierres.GridDetalles", { colspan: 2, width: 550, cargarStore: false, height: 400, storeGenerar: true });
        me.items = [
            me.txt_id, me.txt_id_cierre_anterior, 
            me.cbx_caja,
            me.date_fecha_ini, me.date_fecha_fin,
            me.txt_observacion,
            me.txt_saldoInicial, me.txt_total,
            me.fieldSet,
            me.gridDetalle
        ];
    },
    
    ObtenerUltimoRegistro: function (ID_CAJA) {
        var me = this;
        Ext.Ajax.request({
            url: Constantes.HOST + 'Cierres/ObtenerUltimoRegistroCajasCierre?ID_CAJA='+ID_CAJA,
            success: function (response) {
                var str = Ext.JSON.decode(response.responseText);
                me.date_fecha_ini.setValue(str.value);
                me.date_fecha_ini.setReadOnly(str.disabled);
                me.txt_saldoInicial.setValue(str.saldo);
                me.txt_id_cierre_anterior.setValue(str.ID_CIERRE_ANTERIOR);
            }
        });
    },
    isValid: function () {
        var me = this;
        if (me.getForm().isValid()) {
            if (me.gridDetalle.getStore().count() > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },
    convertirJson: function () {
        var me = this;
        var modified = me.gridDetalle.getStore().data; //step 1
        var recordsToSend = [];
        if (!Ext.isEmpty(modified)) {
            console.dir(modified);
            Ext.each(modified.items, function (record) { //step 2
                recordsToSend.push(Ext.apply(record.data));
            });
            recordsToSend = Ext.JSON.encode(recordsToSend);
            return recordsToSend;
        }
        else {
            return false;
        }

    },
});
