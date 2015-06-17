Ext.define("App.View.RetirosSocio.FormRetiro", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos del Retiro',
    Eventos : true,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        if (me.Eventos) {
            me.cargarEventos();
        }
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            name: "ID_RETIRO"

        });
        me.txt_id_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            name: "ID_SOCIO"

        });
        me.store_socio = Ext.create('App.Store.Socios.SoloSocios');
        //me.store_socio.setExtraParams({ codigo: 'COn MOVIL' });
        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Buscar Socio",
            name: "ID_SOCIO_1",
            displayField: 'SOCIO',
            store: me.store_socio,
            colspan: 2,
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
            //textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        });
        if (me.Eventos) {
            me.cbx_socio.on('select', function (cbx, rec) {
                //console.dir(rec[0]);
                me.txt_id_socio.setValue(rec[0].get('ID_SOCIO'));
                me.num_saldo.setValue(rec[0].get('SALDO'));
            });
        }
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
            name: "RETIRO",
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
            me.cbx_socio,
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
        var res = me.num_saldo.getValue() - me.num_ingreso.getValue();
        if (res < 0) {
            Ext.Msg.alert("Error", "No Puede Retirar mas de lo que tiene", function () {
                me.txt_nuevo_saldo.reset();
                me.num_ingreso.reset();
            });
            

        }
        else { 
            me.txt_nuevo_saldo.setValue(res);
        }
    },
    ocultarSaldos: function (value) {
        var me = this;
        me.num_saldo.setVisible(value);
        me.txt_nuevo_saldo.setVisible(value);
        me.cbx_socio.setVisible(value);
    }
});
