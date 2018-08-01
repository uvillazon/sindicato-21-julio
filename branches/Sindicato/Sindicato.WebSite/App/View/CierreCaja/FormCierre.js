Ext.define("App.View.CierreCaja.FormCierre", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos Cierre de Caja',
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
        me.date_fecha_fin.on('select', function (dat, value) {
            me.gridDetalle.getStore().setExtraParams({ FECHA_DESDE: me.date_fecha_ini.getValue(), FECHA_HASTA: value });
            me.gridDetalle.getStore().load();
        });
        me.gridDetalle.getStore().on('load', function (str,records) {
            var ingresos = str.sum('SALDO');
            me.txt_total.setValue(ingresos );
        });
    },
    CargarComponentesForm: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            name: "ID_CIERRE"

        });
        me.date_fecha_ini = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Ini",
            maximo: 'Sin Maximo',
            name: "FECHA_INI",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.date_fecha_fin = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Fin",
            opcion: 'sin fecha',
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
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Total",
            //width: 480,
            name: "LOGIN",
            readOnly: true,

        });
        me.gridDetalle = Ext.create("App.View.CierreCaja.GridDetalles", { colspan: 2, width: 550, cargarStore: false, height: 400,storeGenerar: true });
        me.items = [
            me.txt_id,
            me.date_fecha_ini,me.date_fecha_fin,
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
        me.date_fecha_ini = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Ini",
            maximo: 'Sin Maximo',
            name: "FECHA_INI",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.date_fecha_fin = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Fin",
            opcion: 'sin fecha',
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
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Total",
            //width: 480,
            name: "LOGIN",
            readOnly: true,

        });
        me.gridDetalle = Ext.create("App.View.CierreCaja.GridDetalles", {colspan : 2 , width : 550 , cargarStore : false , height : 500});
        me.items = [
            me.txt_id,
            me.date_fecha_ini, me.date_fecha_fin,
            me.txt_observacion,
            me.txt_estado, me.txt_total,
            me.gridDetalle
        ];



    },
    ObtenerUltimoRegistro: function () {
        var me = this;
        Ext.Ajax.request({
            url: Constantes.HOST + 'Cierres/ObtenerUltimoRegistroCierreCaja',
            success: function (response) {
                var str = Ext.JSON.decode(response.responseText);
                me.date_fecha_ini.setValue(str.value);
                me.date_fecha_ini.setReadOnly(str.disabled);
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
