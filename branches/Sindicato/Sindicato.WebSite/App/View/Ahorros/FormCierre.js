Ext.define("App.View.Ahorros.FormCierre", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos Cierre Para el pago de Ahorros a Socios',
    modoConsulta: false,
    initComponent: function () {
        var me = this;
        if (me.modoConsulta) {
            me.CargarComponentes();
        }
        else {
            me.CargarComponentesForm();
            me.CargarEventos();
        }
        this.callParent(arguments);
    },
    CargarEventos: function () {
        var me = this;
        me.date_fecha.on('select', function (dat, value) {
            me.gridDetalle.getStore().setExtraParams({ FECHA_DESDE: me.date_fecha_ini.getValue(), FECHA_HASTA: value, ID_PARADA: Constantes.Usuario.ID_PARADA });
            me.gridDetalle.getStore().load();
        });
        me.gridDetalle.getStore().on('load', function (str,records) {
            var ingresos = str.sum('INGRESO');
            var egresos = str.sum('EGRESO');
            me.txt_total.setValue(ingresos - egresos);
        });
    },
    CargarComponentesForm: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            name: "ID_CIERRE"

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Mes (MM-YYYY)",
            name: "MES",
            format: 'm-Y',
            submitFormat: 'd/m/Y',
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
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
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total",
            //width: 480,
            name: "IMPORTE_TOTAL",
            readOnly: true,

        });
        me.gridDetalle = Ext.create("App.View.Ahorros.GridDetalles", { colspan: 2, width: 480, cargarStore: false, height: 400,storeGenerar: true });
        me.items = [
            me.txt_id,
            me.date_fecha,
            me.txt_observacion,
            me.txt_estado, me.txt_total,
            me.gridDetalle
        ];
    },
    CargarComponentes: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            name: "ID_CIERRE"

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Mes (MM-YYYY)",
            name: "MES",
            format: 'm-Y',
            submitFormat: 'd/m/Y',
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
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
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total",
            //width: 480,
            name: "IMPORTE_TOTAL",
            readOnly: true,

        });
        me.gridDetalle = Ext.create("App.View.Ahorros.GridDetalles", {colspan : 2 , width : 480 , cargarStore : false , height : 400});
        me.items = [
            me.txt_id,
            me.date_fecha,
            me.txt_observacion,
            me.txt_estado, me.txt_total,
            me.gridDetalle
        ];



    },
    //ObtenerUltimoRegistro: function () {
    //    var me = this;
    //    Ext.Ajax.request({
    //        url: Constantes.HOST + 'CierresParada/ObtenerUltimoRegistro',
    //        success: function (response) {
    //            var str = Ext.JSON.decode(response.responseText);
    //            me.date_fecha_ini.setValue(str.value);
    //            me.date_fecha_ini.setReadOnly(str.disabled);
    //        }
    //    });
    //},
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
