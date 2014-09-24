Ext.define("App.View.Ingresos.FormIngreso", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
    },
    CargarStore: function () {
        var me = this;
        me.store_cuenta.load();
    },
    CargarComponentes: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            fieldLabel: "Id",
            readOnly: true,
            name: "ID_INGRESO"

        });
        me.txt_nro_cmp = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Comprobante",
            readOnly: true,
            name: "NRO_COMP"

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_registrar = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Registrar",
            name: "REGISTRAR",
            value: 'OTROS INGRESOS',
            readOnly: true

        });
        me.store_cuenta = Ext.create('App.Store.Cajas.Cajas').load();
        me.cbx_cuenta = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Cuenta",
            name: "ID_CAJA",
            displayField: 'NOMBRE',
            valueField: 'ID_CAJA',
            store: me.store_cuenta,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE} - {DESCRIPCION}" }
        });
        me.num_saldo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo",
            name: "SALDO",
            readOnly: true,
            allowDecimals: true,
            maxValue: 999999999
        });

        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe",
            name: "IMPORTE",
            allowDecimals: true,
            maxValue: 999999999
        });
        me.txt_nuevo_saldo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nuevo Saldo",
            name: "NUEVO_SALDO",
            readOnly: true
        });
        me.txt_concepto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Concepto",
            name: "CONCEPTO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.items = [
            me.txt_id,
            me.txt_nro_cmp,
            me.date_fecha,
            me.txt_registrar,
            me.cbx_cuenta,
            me.num_saldo,
            me.num_importe,
            me.txt_nuevo_saldo,
            me.txt_concepto
        ];



    },
    cargarEventos: function () {
        var me = this;
        me.cbx_cuenta.on('select', function (cmb, record) {
            me.num_saldo.setValue(record[0].get('SALDO'));
        });
        me.num_importe.on('change', function (num, newvalue, oldvalue) {
            me.actualizarNuevoSaldo(true);
        });
    },

    actualizarNuevoSaldo: function (isNew) {
        var me = this;
        var res = me.num_saldo.getValue() + me.num_importe.getValue();

        me.txt_nuevo_saldo.setValue(res);
    },
    ocultarSaldos: function (value) {
        var me = this;
        me.num_saldo.setVisible(value);
        me.txt_nuevo_saldo.setVisible(value);
    }
});
