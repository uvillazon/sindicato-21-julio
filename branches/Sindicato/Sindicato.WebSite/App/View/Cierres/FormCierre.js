Ext.define("App.View.Cierres.FormCierre", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos Periodo',
    Eventos: true,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            name: "ID_CIERRE"

        });
        me.txt_codigo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Periodo",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            name: "CODIGO",
            colspan: 2,
            width: 480

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
            maximo: 'Sin Maximo',
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
            width: 480,
            name: "ESTADO",
            readOnly: true,
            colspan: 2,
            value: 'ACTIVO'

        });
        me.items = [
            me.txt_id,
            me.txt_codigo,
            me.date_fecha_ini, me.date_fecha_fin,
            me.txt_observacion,
            me.txt_estado
        ];



    },
    ObtenerUltimoRegistro: function () {
        var me = this;
        Ext.Ajax.request({
            url: Constantes.HOST + 'Cierres/ObtenerUltimoRegistro',
            success: function (response) {
                var str = Ext.JSON.decode(response.responseText);
                me.date_fecha_ini.setValue(str.value);
                me.date_fecha_ini.setReadOnly(str.disabled);
            }
        });
    }
});
