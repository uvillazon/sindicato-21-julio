Ext.define("App.View.Refuerzos.FormRefuerzo", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos del Refuerzo',
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

        me.txt_nro_recibo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Recibo",
            name: "ID_VENTA",
            readOnly: true

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });
        me.txt_codigo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Codigo",
            name: "CODIGO",
            width: 240,
            colspan: 1

        });

        me.txt_placa = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Placa",
            name: "PLACA",
            width: 240,
            colspan: 1

        });

        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre",
            name: "NOMBRE",
            width: 480,
            colspan: 2
        });

        me.txt_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Caja",
            name: "CAJA",
            width: 480,
            colspan: 2

        });
        me.txt_cantidad = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cantidad Hojas",
            name: "CANTIDAD",
            width: 240,
            colspan: 1

        });
        me.txt_costo_unitario = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Costo Unitario",
            name: "COSTO_UNITARIO",
            width: 240,
            colspan: 1

        });
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total BS",
            name: "TOTAL",
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
        me.items = [
            me.txt_nro_recibo, me.date_fecha,
            me.txt_codigo,me.txt_placa,
            me.txt_nombre,
            me.txt_caja,
            me.txt_cantidad, me.txt_costo_unitario,
            me.txt_total,
            me.txt_observacion

        ];
    },
    CargarComponentes: function () {
        var me = this;

        me.txt_nro_recibo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Recibo",
            readOnly: true,
            name: "ID_VENTA"

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.store_codigo = Ext.create('App.Store.Listas.StoreLista');
        me.store_codigo.setExtraParam('ID_LISTA', Lista.Buscar('CODIGO_REFUERZOS'));

        me.cbx_codigo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Codigo",
            name: "CODIGO",
            width: 240,
            colspan: 1,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: me.store_codigo,
            selectOnFocus: true
        });
        me.txt_placa = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Placa",
            name: "PLACA",
            width: 240,
            colspan: 1,
            maxLength: 140,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre",
            name: "NOMBRE",
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
            valueField: 'ID_CAJA',
            width: 480,
            colspan: 2,
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
        me.num_cantidad = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Cantidad",
            name: "CANTIDAD",
            colspan: 1,
            width: 240,
            allowDecimals: false,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.num_costo_unitario = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Costo Unitario",
            name: "COSTO_UNITARIO",
            colspan: 1,
            width: 240,
            allowDecimals: false,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe",
            name: "TOTAL",
            colspan: 2,
            width: 480,
            allowDecimals: true,
            readOnly: true,
            maxValue: 999999999,
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

        me.items = [
            me.txt_nro_recibo, me.date_fecha,
            me.cbx_codigo,me.txt_placa,
            me.txt_nombre,
            me.cbx_caja,
            me.num_saldo, me.num_nuevoSaldo,
            me.num_cantidad, me.num_costo_unitario,
            me.num_importe,
            me.txt_observacion,

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
            me.num_nuevoSaldo.setValue(saldo + newvalue);
            //}
        });
        me.num_cantidad.on('change', function (num, newvalue, oldvalue) {
            var costo_unitario = Ext.isEmpty(me.num_costo_unitario.getValue()) ? 1 : me.num_costo_unitario.getValue();

            var total = costo_unitario * newvalue;
            me.num_importe.setValue(total);

            //}
        });

        me.num_costo_unitario.on('change', function (num, newvalue, oldvalue) {
            var cantidad = Ext.isEmpty(me.num_cantidad.getValue()) ? 1 : me.num_cantidad.getValue();

            var total = cantidad * newvalue;
            me.num_importe.setValue(total);
            //}
        });
    },
});
