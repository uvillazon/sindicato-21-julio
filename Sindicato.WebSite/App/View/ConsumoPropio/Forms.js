Ext.define("App.View.ConsumoPropio.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormCliente") {
            me.CargarFormCliente();

        }
//        else if (me.opcion == 'FormConsumo') {
//            me.title = "Resumen";
//            me.CargarFormResumen();
//        }
        this.callParent(arguments);
    },
    CargarFormCliente: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_CLIENTE",
            hidden : true

        });
        me.txt_codigo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Codigo",
            name: "CODIGO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false

        });
        
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre",
            name: "NOMBRE",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false

        });

        me.txt_responsable = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Responsable",
            name: "RESPONSABLE",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false

        });
        

        

        me.items = [
            me.txt_id,
            me.txt_codigo,
            me.txt_nombre,
            me.txt_responsable
        ];
       
    },
});
