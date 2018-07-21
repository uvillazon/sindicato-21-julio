Ext.define("App.View.Egresos.FormEgreso", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos del Egreso a cuenta',
    Eventos: true,
    modoConsulta: false,
    paramsStore: {},
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
            name: 'ID_EGRESO',
        });
        me.txt_nro_recibo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Recibo",
            name: "NRO_RECIBO",
            readOnly: true

        });

        me.store_tipo = Ext.create('App.Store.Egresos.TiposEgresos');

        me.cbx_tipos = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Tipo Egresos",
            name: "ID_TIPO",
            displayField: 'NOMBRE',
            valueField: 'ID_TIPO',
            store: me.store_tipo,
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE} - {CAJA}  , Moneda : {MONEDA}" }
        });

        me.txt_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Caja",
            name: "CAJA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true

        });
        me.txt_moneda = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Moneda",
            name: "MONEDA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true

        });


        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });
        me.txt_concepto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Pagado A",
            name: "CONCEPTO",
            width: 480,
            colspan: 2
        });

        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Concepto",
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
            me.cbx_tipos,
             me.txt_caja, me.txt_moneda,
            me.txt_concepto,
            me.txt_observacion,
            me.txt_total
        ];
    },
    CargarComponentes: function () {
        var me = this;
        me.hid_id = Ext.widget('hiddenfield', {
            name: 'ID_EGRESO',
        });

        me.hid_id_caja = Ext.widget('hiddenfield', {
            name: 'ID_CAJA',
        });

        me.txt_nro_recibo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Recibo",
            name: "NRO_RECIBO",
            readOnly: true

        });

        me.store_tipo = Ext.create('App.Store.Egresos.TiposEgresos');

        me.cbx_tipos = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Tipo Egresos",
            name: "ID_TIPO",
            displayField: 'NOMBRE',
            valueField: 'ID_TIPO',
            store: me.store_tipo,
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE} - {CAJA}  , Moneda : {MONEDA}" }
        });

        me.txt_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Caja",
            name: "CAJA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true

        });
        me.txt_moneda = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Moneda",
            name: "MONEDA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true

        });

        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_concepto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Pagado A",
            name: "CONCEPTO",
            width: 480,
            colspan: 2,
            maxLength: 140,
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
        me.num_nuevoSaldo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nuevo Saldo",
            name: "NUEVO_SALDO",
            readOnly: true,
            allowDecimals: true,
            maxValue: 999999999,
            allowBlank: false
        });

        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Concepto",
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
            me.hid_id,me.hid_id_caja,
            me.txt_nro_recibo, me.date_fecha,
            me.cbx_tipos,
            me.txt_caja, me.txt_moneda,
            me.txt_concepto,
            me.num_saldo, me.num_nuevoSaldo,
            me.txt_observacion,
            me.num_importe
        ];



    },
    cargarEventos: function () {
        var me = this;
        //me.cbx_caja.on('select', function (cbx, record) {
        //    var importeTotal = me.num_importe.getValue();
        //    me.num_saldo.setValue(record[0].get('SALDO'));
        //    if (!Funciones.isEmpty(importeTotal)) {
        //        if (importeTotal > record[0].get('SALDO')) {
        //            Ext.Msg.alert("Error", "No El Saldo no es Suficiente. Saldo Actual : " + record[0].get('SALDO') + " Importe Total : " + importeTotal, function () {
        //                cbx.reset();
        //                me.num_saldo.reset();
        //                me.num_nuevoSaldo.reset();
        //            });
        //        }
        //        else {
        //            me.num_nuevoSaldo.setValue(record[0].get('SALDO') - importeTotal);
        //        }
        //    }
        //    else {
        //        me.num_nuevoSaldo.setValue(record[0].get('SALDO'));
        //    }
        //});
        me.cbx_tipos.on('select', function (cbx, record) {
            me.txt_caja.setValue(record[0].get('CAJA'));
            me.hid_id_caja.setValue(record[0].get('ID_CAJA'));
            me.txt_moneda.setValue(record[0].get('MONEDA'));
            me.num_saldo.setValue(record[0].get('SALDO'));
            me.num_importe.setValue(record[0].get('IMPORTE'));
            var importeTotal = me.num_importe.getValue();
            if (!Funciones.isEmpty(importeTotal)) {
                if (importeTotal > record[0].get('SALDO')) {
                    Ext.Msg.alert("Error", "No El Saldo no es Suficiente. Saldo Actual : " + record[0].get('SALDO') + " Importe Total : " + importeTotal, function () {
                        cbx.reset();
                        me.num_saldo.reset();
                        me.num_nuevoSaldo.reset();
                    });
                }
                else {
                    me.num_nuevoSaldo.setValue(record[0].get('SALDO') - importeTotal);
                }
            }
            else {
                me.num_nuevoSaldo.setValue(record[0].get('SALDO'));
            }

        });
        me.num_importe.on('change', function (num, newvalue, oldvalue) {
            var saldo = me.num_saldo.getValue();

            var nuevoSaldo = saldo - newvalue;
            if (nuevoSaldo < 0) {
                Ext.Msg.alert("Error", "No El Saldo no es Suficiente. Saldo Actual : " + saldo + " Importe Total : " + newvalue, function () {
                    me.num_nuevoSaldo.setValue(saldo);
                    num.reset();
                });
            }
            else {
                me.num_nuevoSaldo.setValue(saldo - newvalue);
            }
        });
    },
});
