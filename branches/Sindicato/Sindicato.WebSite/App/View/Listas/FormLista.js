Ext.define("App.View.Listas.FormLista", {
    extend: "App.Config.Abstract.Form",
    title: "Datos del Tipo de Lista",
    opcion: '',
    initComponent: function () {
        var me = this;
        //if(me.opcion == ''){
        //    me.CargarStore();
        //    me.CargarComponentes();
        //}
        //else{
        me.CargarComponentes();
        //}
        this.callParent(arguments);
    },
    CargarStore: function () {
        var me = this;
        me.store_subestaciones = Ext.create("App.Subestaciones.Store.Subestaciones", { pageSize: 3000 }).load();

    },
    CargarComponentes: function () {
        var me = this;
        
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_LISTA",
            hidden: true,
        });
        me.txt_lista = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre de Lista",
            name: "LISTA",
            width : 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            colspan : 2
        });
        me.txt_descripcion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Descripcion",
            name: "DESCRIPCION",
            width: 480,
            maxLength: 50,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            colspan : 2
        });
        me.num_tam_limite = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Tamano Maximo",
            name: "TAM_LIMITE",
            width: 240,
            maxLength: 5,
            minValue:1,
            allowNegative: false,
            allowDecimals: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.txt_tipo_valor = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo de Lista",
            name: "TIPO_VALOR",
            width: 240,
            maxLength: 10,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store : ["CADENA","NUMERICO"]
        });
        me.txt_mayus_minus = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Mayus o Minus",
            name: "MAYUS_MINUS",
            width: 240,
            maxLength: 5,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: ["MAYUS", "MINUS"]
        });
        me.txt_estado = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            width: 240,
            maxLength: 15,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            value :"A",
            store : ["A", "I"]
        });
        me.items = [
        me.num_id_lista,
        me.txt_lista,
        me.txt_descripcion,
        me.num_tam_limite,
        me.txt_tipo_valor,
        me.txt_mayus_minus,
        me.txt_estado,
        ];

        
    }
});
