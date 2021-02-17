Ext.define("App.View.IngresosPorSocios.FormIngreso", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos del Ingreso a cuenta',
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
    CargarComponentes: function () {
        var me = this;
        me.txt_nro_ingreso = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Ingreso",
            name: "ID_INGRESO",
            readOnly: true

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: false
        });

        me.store_tipo = Ext.create('App.Store.IngresosPorSocios.TiposIngresos');

        me.cbx_tipos = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Ingresos",
            name: "ID_TIPO_INGRESO",
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

        me.store_socio = Ext.create('App.Store.Socios.Socios');

        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Nro Movil",
            name: "ID_SOCIO_MOVIL",
            displayField: 'NRO_MOVIL',
            valueField: 'ID_SOCIO_MOVIL',
            store: me.store_socio,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        });
        me.txt_nor_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Movil",
            name: "NRO_MOVIL",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true,
        });
        me.txt_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Socio",
            name: "SOCIO",
            colspan: 2,
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true,
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            //maxLength: 500,
        });
        me.txt_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Total",
            name: "IMPORTE",
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });
        me.items = [
           me.txt_nro_ingreso, me.date_fecha,
           me.cbx_tipos,
           me.txt_caja, me.txt_moneda,
           me.cbx_socio, me.txt_nor_movil,
           me.txt_socio,
           me.txt_importe,
           me.txt_observacion
        ];
    },
    CargarComponentesConsulta: function () {
        var me = this;
       
        me.txt_nro_recibo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Ingreso",
            name: "ID_INGRESO"

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });
        me.txt_concepto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Concepto",
            name: "TIPO_INGRESO",
            width: 480,
            colspan: 2
        });

        me.txt_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Caja",
            name: "CAJA",

        });
        me.txt_moneda = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Moneda",
            name: "MONEDA",

        });
        me.txt_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Socio",
            name: "SOCIO",

        });
        me.txt_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Movil",
            name: "MOVIL",

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
            me.txt_nro_recibo, me.date_fecha,
            me.txt_concepto,
            me.txt_caja, me.txt_moneda,
            me.txt_socio, me.txt_movil,
            me.txt_total,
            me.txt_observacion

        ];
    },
    cargarEventos: function () {
        var me = this;
        me.cbx_tipos.on('select', function (cbx, record) {
            me.txt_caja.setValue(record[0].get('CAJA'));
            me.txt_moneda.setValue(record[0].get('MONEDA'));
            me.txt_importe.setValue(record[0].get('IMPORTE'));


        });
        me.cbx_socio.on('select', function (cbx, rec) {
            me.txt_socio.setValue(rec[0].get('NOMBRE_SOCIO'));
            me.txt_nor_movil.setValue(rec[0].get('NRO_MOVIL'));
        });
        //me.cbx_caja.on('select', function (cbx, record) {
        //    var importeTotal = me.num_importe.getValue();
        //    me.num_saldo.setValue(record[0].get('SALDO'));
        //    if (!Funciones.isEmpty(importeTotal)) {
        //        me.num_nuevoSaldo.setValue(record[0].get('SALDO') + importeTotal);
        //    }
        //    else {
        //        me.num_nuevoSaldo.setValue(record[0].get('SALDO'));
        //    }

        //});
        //me.num_importe.on('change', function (num, newvalue, oldvalue) {
        //    var saldo = me.num_saldo.getValue();
        //    var nuevoSaldo = saldo + newvalue;
        //    //if (nuevoSaldo < 0) {
        //    //    Ext.Msg.alert("Error", "No El Saldo no es Suficiente para Transferir Saldo Actual : " + saldo + " Importe Total : " + newvalue, function () {
        //    //        me.num_nuevoSaldo.reset(saldo);
        //    //        num.reset();
        //    //    });
        //    //}
        //    //else {
        //        //me.num_nuevoSaldoDestino.setValue(saldoDestino + newvalue);
        //        me.num_nuevoSaldo.setValue(saldo + newvalue);
        //    //}
        //});
    },
    ImprimirRecibo: function (id) {

        var ruta = fn.ObtenerUrlReportPDF("ReporteIngreso", "ID_INGRESO=" + id);
        window.open(ruta);
    }
});
