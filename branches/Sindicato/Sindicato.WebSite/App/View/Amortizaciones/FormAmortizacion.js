Ext.define("App.View.Amortizaciones.FormAmortizacion", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos de Amortizacion',
    Eventos: true,
    modoConsulta: false,
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
            name: 'ID_AMORTIZACION',
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

        me.txt_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Socio",
            name: "SOCIO",
            width: 480,
            colspan: 2

        });

        me.txt_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Caja Destino",
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
            me.txt_socio,
            me.txt_caja,
            me.txt_observacion,
            me.txt_total
        ];
    },
    CargarComponentes: function () {
        var me = this;
        me.hid_id = Ext.widget('hiddenfield', {
            name: 'ID_TRANSFERENCIA',
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
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.store_socio = Ext.create('App.Store.Socios.SoloSocios');
        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Buscar Socio",
            name: "ID_SOCIO",
            displayField: 'SOCIO',
            store: me.store_socio,
            colspan: 2,
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
            //textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        });
        me.num_deudaSocio = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Deuda Socio",
            name: "DEUDA",
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
        me.store_caja = Ext.create('App.Store.Cajas.Cajas');
        me.cbx_caja = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Caja Destino",
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
        me.num_saldoCaja = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo Caja",
            name: "SALDO",
            readOnly: true,
            allowDecimals: true,
            maxValue: 999999999
        });
        me.num_nuevoSaldoCaja = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nuevo Saldo Caja",
            name: "NUEVO_SALDO_CAJA",
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
            me.cbx_socio,
            me.num_deudaSocio, me.num_nuevoSaldo,
            me.cbx_caja,
            me.num_saldoCaja, me.num_nuevoSaldoCaja,
            me.txt_observacion,
            me.num_importe
        ];


    },
    cargarEventos: function () {
        var me = this;
        me.cbx_socio.on('select', function (cbx, record) {
            var importeTotal = me.num_importe.getValue();
            me.num_deudaSocio.setValue(record[0].get('DEUDA'));
            if (!Funciones.isEmpty(importeTotal)) {
                if (importeTotal > record[0].get('SALDO')) {
                    Ext.Msg.alert("Error", "El Importe no puede ser mayor a la Deuda. Deuda Actual : " + record[0].get('DEUDA') + " Importe Total : " + importeTotal, function () {
                        cbx.reset();
                        me.num_deudaSocio.reset();
                        me.num_nuevoSaldo.reset();
                    });
                }
                else {
                    me.num_nuevoSaldo.setValue(record[0].get('DEUDA') - importeTotal);
                }
            }
            else {
                me.num_nuevoSaldo.setValue(record[0].get('DEUDA'));
            }
        });
        me.cbx_caja.on('select', function (cbx, record) {
            var importeTotal = me.num_importe.getValue();
            me.num_saldoCaja.setValue(record[0].get('SALDO'));
            if (!Funciones.isEmpty(importeTotal)) {
                me.num_nuevoSaldoCaja.setValue(record[0].get('SALDO') + importeTotal);
            }
            else {
                me.num_nuevoSaldoCaja.setValue(record[0].get('SALDO'));
            }

        });
        me.num_importe.on('change', function (num, newvalue, oldvalue) {
            var saldoOrigen = me.num_deudaSocio.getValue();
            var saldoDestino = me.num_saldoCaja.getValue();

            var nuevoSaldoOrigen = saldoOrigen - newvalue;
            if (nuevoSaldoOrigen < 0) {
                Ext.Msg.alert("Error", "El Importe no puede ser mayor a la Deuda. Deuda Actual : " + saldoOrigen + " Importe Total : " + newvalue, function () {
                    me.num_nuevoSaldo.setValue(saldoOrigen);
                    me.num_nuevoSaldoCaja.setValue(saldoDestino);
                    num.reset();
                });
            }
            else {
                me.num_nuevoSaldoCaja.setValue(saldoDestino + newvalue);
                me.num_nuevoSaldo.setValue(saldoOrigen - newvalue);
            }
        });
    },
});
