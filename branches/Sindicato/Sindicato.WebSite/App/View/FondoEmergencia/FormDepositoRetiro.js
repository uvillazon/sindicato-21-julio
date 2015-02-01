Ext.define("App.View.FondoEmergencia.FormDepositoRetiro", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    opcion : '',
    initComponent: function () {
        var me = this;
        me.CargarForm();
        this.callParent(arguments);
    },
    CargarForm: function () {
        var me = this;
        me.id_chofer = Ext.widget('hiddenfield', {
            name: 'ID_CHOFER',
        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre Completo",
            name: "NOMBRE_COMPLETO",
            width: 480,
            colspan  : 2,
            maxLength: 500,
            readOnly : true
        });
        me.txt_fondoEmergencia = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Fondo Emergencia",
            name: "FONDO_EMERGENCIA",
            width: 240,
            readOnly: true
        });
        me.txt_fondoActual = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Fondo Emergencia Actual",
            name: "FONDO_ACTUAL",
            width: 240,
            readOnly: true
        });
        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            //opcion: "sin fecha",
            fieldLabel: "Fecha",
            name: "FECHA",
            width: 240,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.num_nro_recibo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Recibo",
            name: "NRO_RECIBO",
            width: 240,
            maxLength: 15,
            allowNegative: false,
            allowDecimals: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.num_nro_recibo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Recibo",
            name: "NRO_RECIBO",
            width: 240,
            maxLength: 15,
            allowNegative: false,
            allowDecimals: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.txt_observacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 720,
            colspan: 3,
            maxLength: 500,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.gridKardex = Ext.create("App.View.FondoEmergencia.Grids", { opcion: "GridKardex", height: 350, width: 480 ,colspan : 2});
        me.items = [
            me.txt_nombre, 
            me.txt_fondoEmergencia, me.txt_fondoActual,
            me.gridKardex
        ];
    },
  
});
