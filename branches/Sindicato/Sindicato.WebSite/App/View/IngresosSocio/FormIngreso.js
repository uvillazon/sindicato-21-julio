Ext.define("App.View.IngresosSocio.FormIngreso", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            name: "ID_INGRESO"

        });
        me.txt_id_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            name: "ID_SOCIO"

        });
        me.txt_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Socio",
            name: "NOMBRE_SOCIO",
            width: 480,
            colspan: 2,
            readOnly: true
        });
        me.txt_nro_recibo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Recibo",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            name: "NRO_RECIBO"

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.num_saldo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo",
            name: "SALDO",
            readOnly: true,
            allowDecimals: true,
            maxValue: 999999999
        });

        me.num_ingreso = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe",
            name: "INGRESO",
            colspan: 2,
            allowDecimals: true,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_nuevo_saldo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nuevo Saldo",
            name: "NUEVO_SALDO",
            readOnly: true
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            maxLength: 500,
        });
        me.items = [
            me.txt_id, me.txt_id_socio,
            me.txt_nro_recibo, me.date_fecha,
            me.txt_socio,
            me.num_ingreso,
            me.num_saldo, me.txt_nuevo_saldo,
            me.txt_observacion
        ];



    },
    cargarEventos: function () {
        var me = this;
        me.num_ingreso.on('change', function (num, newvalue, oldvalue) {
            me.actualizarNuevoSaldo(true);
        });
    },

    actualizarNuevoSaldo: function (isNew) {
        var me = this;
        var res = me.num_saldo.getValue() + me.num_ingreso.getValue();
        me.txt_nuevo_saldo.setValue(res);
    },
    ocultarSaldos: function (value) {
        var me = this;
        me.num_saldo.setVisible(value);
        me.txt_nuevo_saldo.setVisible(value);
    }
});
