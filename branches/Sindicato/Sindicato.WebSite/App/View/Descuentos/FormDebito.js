Ext.define("App.View.Descuentos.FormDebito", {
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
        me.hid_id = Ext.widget('hiddenfield', {
            name: 'ID_DESCUENTO',
        });
        me.hid_accion = Ext.widget('hiddenfield', {
            name: 'ACCION',
            value : 'DEBITADO'
        });
        
        me.txt_descuento = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Descuento",
            readOnly: true,
            width: 480,
            colspan : 2,
            name: "DESCUENTO"

        });
        me.txt_periodo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Periodo",
            readOnly: true,
            //width: 480,
            //colspan: 2,
            name: "PERIODO"

        });
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total Bs",
            readOnly: true,
            //width: 480,
            //colspan: 2,
            name: "TOTAL"

        });
        me.store_cuenta = Ext.create('App.Store.Cajas.Cajas');
        me.cbx_cuenta = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Cuenta",
            name: "ID_CAJA",
            displayField: 'NOMBRE',
            colspan: 2,
            width : 480,
            valueField: 'ID_CAJA',
            store: me.store_cuenta,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE} - {DESCRIPCION}" }
        });
        me.num_saldo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo Caja",
            name: "SALDO",
            readOnly: true,
            allowDecimals: true,
            maxValue: 999999999
        });

        me.txt_nuevo_saldo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nuevo Saldo",
            name: "NUEVO_SALDO",
            allowBlank: false,
            readOnly: true
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            width: 480,
            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.items = [
            me.hid_id,me.hid_accion,
            me.txt_descuento,
            me.txt_periodo , me.txt_total,
            me.cbx_cuenta,
            me.num_saldo, me.txt_nuevo_saldo,
            me.txt_observacion
        ];



    },
    cargarEventos: function () {
        var me = this;
        me.cbx_cuenta.on('select', function (cmb, record) {
            me.num_saldo.setValue(record[0].get('SALDO'));
            var total = me.txt_total.getValue();
            var nuevosaldo = record[0].get('SALDO') - total;
            if (nuevosaldo > 0) {
                me.txt_nuevo_saldo.setValue(nuevosaldo);
            } else {
                Ext.Msg.alert("Error", "No cuenta con saldo Suficiente. Saldo Disponible : " + record[0].get('SALDO'), function () {
                    me.txt_nuevo_saldo.reset();
                });
               
            }
        });
        
    }
});
