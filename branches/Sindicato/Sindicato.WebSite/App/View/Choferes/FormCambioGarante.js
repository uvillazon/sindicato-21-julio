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
        me.txt_chofer = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Chofer",
            name: "CHOFER",
            width: 480,
            readOnly: true
        });
        me.txt_garante = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Garante Actual",
            name: "GARANTE_ACTUAL",
            width: 480,
            readOnly: true
        });
        me.store_socio = Ext.create('App.Store.Socios.SoloSocios');
        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Nuevo Garante",
            name: "ID_SOCIO",
            colspan: 3,
            width: 480,
            displayField: 'SOCIO',
            store: me.store_socio,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
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
    }
});
