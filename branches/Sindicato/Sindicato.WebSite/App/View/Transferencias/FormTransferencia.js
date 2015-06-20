Ext.define("App.View.Transferencias.FormTransferencia", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos del Ingreso',
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
            name: 'ID_TRANSFERENCIA',
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

        me.txt_caja_origen = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Caja Origen",
            name: "CAJA_ORIGEN"

        });
        me.txt_caja_destino = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Caja Destino",
            name: "CAJA_DESTINO"

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
            me.txt_caja_origen, me.txt_caja_destino,
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
        me.store_cajaOrigen = Ext.create('App.Store.Cajas.Cajas');
        me.cbx_caja_origen = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Caja Origen",
            name: "ID_CAJA_ORIGEN",
            displayField: 'NOMBRE',
            colspan: 2,
            width: 480,
            valueField: 'ID_CAJA',
            store: me.store_cajaOrigen,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE} - {DESCRIPCION}" }
        });
        me.num_saldoOrigen = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo Origen",
            name: "SALDO_ORIGEN",
            readOnly: true,
            allowDecimals: true,
            maxValue: 999999999
        });
        me.num_nuevoSaldoOrigen = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nuevo Saldo Origen",
            name: "NUEVO_SALDO_ORIGEN",
            readOnly: true,
            allowDecimals: true,
            maxValue: 999999999,
            allowBlank: false
        });
        me.store_cajaDestino = Ext.create('App.Store.Cajas.Cajas');
        me.cbx_caja_destino = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Caja Destino",
            name: "ID_CAJA_DESTINO",
            displayField: 'NOMBRE',
            colspan: 2,
            width: 480,
            valueField: 'ID_CAJA',
            store: me.store_cajaDestino,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE} - {DESCRIPCION}" }
        });
        me.num_saldoDestino = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo Destino",
            name: "SALDO_DESTINO",
            readOnly: true,
            allowDecimals: true,
            maxValue: 999999999
        });
        me.num_nuevoSaldoDestino = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nuevo Saldo Destino",
            name: "NUEVO_SALDO_DESTINO",
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
            me.cbx_caja_origen,
            me.num_saldoOrigen, me.num_nuevoSaldoOrigen,
            me.cbx_caja_destino,
            me.num_saldoDestino, me.num_nuevoSaldoDestino,
            me.txt_observacion,
            me.num_importe
        ];



    },
    cargarEventos: function () {
        var me = this;
        me.cbx_caja_origen.on('select', function (cbx, record) {
            var idCajaDestino = me.cbx_caja_destino.getValue();
            var importeTotal = me.num_importe.getValue();
            if (record[0].get('ID_CAJA') === idCajaDestino) {
                Ext.Msg.alert("Error", "No puede Seleccionar la misma Caja Destino", function () {
                    cbx.reset();
                    me.num_saldoOrigen.reset();
                    me.num_nuevoSaldoOrigen.reset();
                });
            }
            else {
                me.num_saldoOrigen.setValue(record[0].get('SALDO'));
                if (!Funciones.isEmpty(importeTotal)) {
                    if (importeTotal > record[0].get('SALDO')) {
                        Ext.Msg.alert("Error", "No El Saldo no es Suficiente para Transferir Saldo Actual : " + record[0].get('SALDO') + " Importe Total : " + importeTotal, function () {
                            cbx.reset();
                            me.num_saldoOrigen.reset();
                            me.num_nuevoSaldoOrigen.reset();
                        });
                    }
                    else {
                        me.num_nuevoSaldoOrigen.setValue(record[0].get('SALDO') - importeTotal);
                    }
                }
                else {
                    me.num_nuevoSaldoOrigen.setValue(record[0].get('SALDO'));
                }
            }
        });
        me.cbx_caja_destino.on('select', function (cbx, record) {
            var idCajaOrigen = me.cbx_caja_origen.getValue();
            var importeTotal = me.num_importe.getValue();
            if (record[0].get('ID_CAJA') === idCajaOrigen) {
                Ext.Msg.alert("Error", "No puede Seleccionar la misma Caja Origen", function () {
                    cbx.reset();
                    me.num_saldoDestino.reset();
                    me.num_nuevoSaldoDestino.reset();
                });
            }
            else {
                me.num_saldoDestino.setValue(record[0].get('SALDO'));
                if (!Funciones.isEmpty(importeTotal)) {
                    me.num_nuevoSaldoDestino.setValue(record[0].get('SALDO') + importeTotal);
                }
                else {
                    me.num_nuevoSaldoDestino.setValue(record[0].get('SALDO'));
                }
            }
        });
        me.num_importe.on('change', function (num, newvalue, oldvalue) {
            var saldoOrigen = me.num_saldoOrigen.getValue();
            var saldoDestino = me.num_saldoDestino.getValue();

            var nuevoSaldoOrigen = saldoOrigen - newvalue;
            if (nuevoSaldoOrigen < 0) {
                Ext.Msg.alert("Error", "No El Saldo no es Suficiente para Transferir Saldo Actual : " + saldoOrigen + " Importe Total : " + newvalue, function () {
                    me.num_nuevoSaldoOrigen.setValue(saldoOrigen);
                    me.num_nuevoSaldoDestino.setValue(saldoDestino);
                    num.reset();
                });
            }
            else {
                me.num_nuevoSaldoDestino.setValue(saldoDestino + newvalue);
                me.num_nuevoSaldoOrigen.setValue(saldoOrigen - newvalue);
            }
        });
    },
});
