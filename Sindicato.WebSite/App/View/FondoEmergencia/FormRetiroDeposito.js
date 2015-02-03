Ext.define("App.View.FondoEmergencia.FormRetiroDeposito", {
    extend: "App.Config.Abstract.Form",
    title: "Formulario Cambio de Garante",
    cargarStores: true,
    columns: 2,
    accion : 'Deposito',
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
        me.id_comprobante = Ext.widget('hiddenfield', {
            name: 'ID_COMPROBANTE',
        });
        me.txt_chofer = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Chofer",
            name: "CHOFER",
            width: 480,
            colspan : 2,
            readOnly: true
        });
        me.txt_fondo_emergencia = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Fondo Emergencia",
            name: "FONDO_EMERGENCIA",
            readOnly: true
        });
        me.txt_fondo_emergencia_actual = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Fondo Emergencia Actual",
            name: "FONDO_EMERGENCIA_ACTUAL",
            readOnly: true
        });
        me.num_nro_recibo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Recibo",
            name: "NRO_RECIBO",
            maxLength: 12,
            colspan : 2,
            allowNegative: false,
            allowDecimals: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.num_monto = Ext.create("App.Config.Componente.NumberFieldBase", {
            name: "MONTO",
            fieldLabel: me.accion == "Retiro" ? "Monto a Retirar"  : "Monto a Depositar",
            maxLength: 12,
            allowNegative: false,
            allowDecimals: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            width: 240,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
      
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            width: 480,
            maxLength: 500,
            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        
        me.items = [
            me.id_chofer,
            me.id_comprobante,
            me.txt_chofer,
            me.txt_fondo_emergencia,
            me.txt_fondo_emergencia_actual,
            me.num_nro_recibo,
            me.num_monto,
            me.dat_fecha,
            me.txt_observacion,
        ];

    },
    CargarDatos: function (record) {
        var me = this;
        me.getForm().reset();
        me.getForm().loadRecord(record);
    }
});
