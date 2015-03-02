Ext.define("App.View.FondoEmergencia.DetalleFondoEmergencia", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        me.CargarForm();
        this.callParent(arguments);
    },
    CargarForm: function (me) {

        var me = this;
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre Completo",
            name: "NOMBRE_CHOFER",
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
            name: "SALDO_FONDO_EMERGENCIA",
            width: 240,
            readOnly: true
        });

        me.grid = Ext.create("App.View.FondoEmergencia.Grids", { opcion: "GridKardex", height: 350, width: 480 ,colspan : 2});
        me.items = [
            me.txt_nombre, 
            me.txt_fondoEmergencia, me.txt_fondoActual,
            me.grid
        ];
    },
  
});
