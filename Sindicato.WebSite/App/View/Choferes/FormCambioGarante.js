Ext.define("App.View.Choferes.FormCambioGarante", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario Cambio de Garante",
    cargarStores: true,
    columns: 1,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        //me.cargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.id_chofer = Ext.widget('hiddenfield', {
            name: 'ID_CHOFER',
        });
        me.id_socio = Ext.widget('hiddenfield', {
            name: 'ID_SOCIO',
        });
        me.txt_chofer = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Chofer",
            name: "NOMBRE_CHOFER",
            width: 480,
            readOnly: true
        });
        me.txt_garante = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Garante Actual",
            name: "NOMBRE_SOCIO",
            width: 480,
            readOnly: true
        });
        me.store_socio = Ext.create('App.Store.Socios.Socios');
        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Nuevo Garante",
            name: "NOMBRE_SOCIO",
            colspan: 3,
            width: 480,
            displayField: 'NOMBRE_SOCIO',
            store: me.store_socio,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "nro Movil : {NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        });
        me.cbx_socio.on('select', function (cbx, rec) {
            if (me.record.get('ID_SOCIO') == rec[0].get('ID_SOCIO')) {
                Ext.Msg.alert("Error", "Seleccione Otro Socio.");
                cbx.clearValue();
                //me.id_socio.clearValue();
            }
            else{
                me.id_socio.setValue(rec[0].get('ID_SOCIO'));
            }
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            width: 480,
            maxLength: 500,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "Fecha Cambio",
            name: "FECHA_INI",
            width: 240,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.items = [
            me.id_chofer,
            me.id_socio,
            me.txt_chofer,
            me.txt_garante,
            me.cbx_socio,
            me.txt_observacion,
            me.dat_fecha
        ];

    },
    CargarDatos: function (record) {
        var me = this;
        me.getForm().reset();
        me.getForm().loadRecord(record);
        me.record = record;
    }
});
