Ext.define("App.View.Obligaciones.FormObligacion", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos Obligacion',
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
            name: 'ID_BLIGACION',
        });
        me.txt_periodo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Perido",
            name: "PERIODO"

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
            me.txt_periodo, me.date_fecha,
            me.txt_concepto,
            me.txt_caja,
            me.txt_observacion,
            me.txt_total
        ];
    },
    CargarComponentes: function () {
        var me = this;
        me.hid_id = Ext.widget('hiddenfield', {
            name: 'ID_OBLIGACION',
        });
        me.hid_id_socio = Ext.widget('hiddenfield', {
            name: 'ID_SOCIO',
        });
        me.hid_id_cierre = Ext.widget('hiddenfield', {
            name: 'ID_CIERRE',
        });
        me.store_periodo = Ext.create('App.Store.Cierres.Cierres');
        me.store_periodo.setExtraParams({ ESTADO: 'ACTIVO' });
        me.cbx_periodo = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Periodo",
            name: "PERIODO",
            displayField: 'CODIGO',
            valueField: 'ID_CIERRE',
            store: me.store_periodo,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
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
        me.store_socio = Ext.create('App.Store.Socios.SoloSocios');
        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Buscar Socio",
            name: "SOCIO",
            displayField: 'SOCIO',
            valueField: 'ID_SOCIO',
            store: me.store_socio,
            colspan: 2,
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
            //textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
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
            me.hid_id, me.hid_id_cierre, me.hid_id_socio,
            me.cbx_periodo, me.date_fecha,
            me.txt_concepto,
            me.cbx_socio,
            me.num_saldo, me.num_nuevoSaldo,
            me.txt_observacion,
            me.num_importe
        ];



    },
    cargarModoEdicion: function () {
        var me = this;
        me.cbx_periodo.setReadOnly(true);
        me.cbx_socio.setReadOnly(true);

    },
    cargarEventos: function () {
        var me = this;
        me.cbx_periodo.on('select', function (cbx, record) {
            me.hid_id_cierre.setValue(record[0].get('ID_CIERRE'));
        });
        me.cbx_socio.on('select', function (cbx, record) {
            me.hid_id_socio.setValue(record[0].get('ID_SOCIO'));
        });
        //me.

    },
});
