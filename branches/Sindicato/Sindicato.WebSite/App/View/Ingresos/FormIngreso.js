Ext.define("App.View.Ingresos.FormIngreso", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos del Ingreso a cuenta',
    Eventos: true,
    modoConsulta: false,
    paramsStore : {},
    initComponent: function () {
        var me = this;
        if (!me.modoConsulta) {
            me.CargarComponentes();
            if (me.Eventos) {
                me.cargarEventos();
            }
        }
        else {
            me.CargarComponentesConsulta();
        }
        this.callParent(arguments);
    },
    CargarComponentesConsulta: function () {
        var me = this;
        me.hid_id = Ext.widget('hiddenfield', {
            name: 'ID_INGRESO',
        });
        me.txt_nro_recibo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Recibo",
            name: "NRO_RECIBO"

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });
        me.txt_concepto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Concepto",
            name: "CONCEPTO",
            width: 480,
            colspan: 2
        });

        me.txt_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Caja",
            name: "CAJA",
            width: 480,
            colspan: 2

        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            //maxLength: 500,
        });
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total BS",
            name: "IMPORTE",
            width: 480,
            colspan: 2

        });
        me.items = [
            me.hid_id,
            me.txt_nro_recibo, me.date_fecha,
            me.txt_concepto,
            me.txt_caja,
            me.txt_observacion,
            me.txt_total
        ];
    },
    CargarComponentes: function () {
        var me = this;
        me.hid_id = Ext.widget('hiddenfield', {
            name: 'ID_INGRESO',
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
        me.txt_concepto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Concepto",
            name: "CONCEPTO",
            width: 480,
            colspan: 2,
            maxLength: 140,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.store_caja = Ext.create('App.Store.Cajas.Cajas');
        me.store_caja.setExtraParams(me.paramsStore);
        me.cbx_caja = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Caja",
            name: "ID_CAJA",
            displayField: 'NOMBRE',
            colspan: 2,
            width: 480,
            valueField: 'ID_CAJA',
            store: me.store_caja,
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
        me.num_nuevoSaldo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nuevo Saldo",
            name: "NUEVO_SALDO",
            readOnly: true,
            allowDecimals: true,
            maxValue: 999999999,
            allowBlank: false
        });

        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            maxLength: 500,
        });
        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe",
            name: "IMPORTE",
            colspan: 2,
            width: 480,
            allowDecimals: true,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.items = [
            me.hid_id,
            me.txt_nro_recibo, me.date_fecha,
            me.txt_concepto,
            me.cbx_caja,
            me.num_saldo, me.num_nuevoSaldo,
            me.txt_observacion,
            me.num_importe
        ];



    },
    cargarEventos: function () {
        var me = this;
        me.cbx_caja.on('select', function (cbx, record) {
            var importeTotal = me.num_importe.getValue();
            me.num_saldo.setValue(record[0].get('SALDO'));
            if (!Funciones.isEmpty(importeTotal)) {
                me.num_nuevoSaldo.setValue(record[0].get('SALDO') + importeTotal);
            }
            else {
                me.num_nuevoSaldo.setValue(record[0].get('SALDO'));
            }

        });
        me.num_importe.on('change', function (num, newvalue, oldvalue) {
            var saldo = me.num_saldo.getValue();
            var nuevoSaldo = saldo + newvalue;
            //if (nuevoSaldo < 0) {
            //    Ext.Msg.alert("Error", "No El Saldo no es Suficiente para Transferir Saldo Actual : " + saldo + " Importe Total : " + newvalue, function () {
            //        me.num_nuevoSaldo.reset(saldo);
            //        num.reset();
            //    });
            //}
            //else {
                //me.num_nuevoSaldoDestino.setValue(saldoDestino + newvalue);
                me.num_nuevoSaldo.setValue(saldo + newvalue);
            //}
        });
    },
});
