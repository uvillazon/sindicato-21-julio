Ext.define("App.View.Socios.Forms.FormAuto", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    icono : '',
    EventosForm : null,
    scope : null,
    val : 0,
    initComponent: function () {

//        this.initConfig(config);
        this.CargarFormAuto();
        this.callParent(arguments);
//        return this;
    },
    CargarFormAuto: function () {
        var me = this;
//        var defaultWidth = this.defaultWidth;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_AUTO",
            hidden: true,
        });
        me.txt_id_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_MOVIL",
            hidden: true,
        });
        me.store_tipo = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipo.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_AUTO'));
        me.cbx_tipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo",
            name: "TIPO",
            width: 240,
            store : me.store_tipo,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.store_color = Ext.create('App.Store.Listas.StoreLista');
        me.store_color.setExtraParam('ID_LISTA', Lista.Buscar('COLOR'));
        me.cbx_color = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Color",
            name: "COLOR",
            width: 240,
            store : me.store_color,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.store_marca = Ext.create('App.Store.Listas.StoreLista');
        me.store_marca.setExtraParam('ID_LISTA', Lista.Buscar('MARCA_AUTO'));
        me.cbx_marca = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Marca",
            name: "MARCA",
            width: 240,
            store : me.store_marca,
            selectOnFocus: true,
        });
        me.txt_modelo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Modelo",
            name: "MODELO",
            width: 240,
            maxLength: 50,
        });
        me.txt_placa = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Placa",
            name: "PLACA",
            width: 240,
            maxLength: 50,
        });
        me.txt_motor = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Motor",
            name: "MOTOR",
            width: 240,
            maxLength: 50,
        });
        me.txt_chasis = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Chasis",
            name: "CHASIS",
            width: 240,
            maxLength: 50,
        });
        me.txt_descripcion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Descripcion",
            name: "DESCRIPCION",
            width: 480,
            colspan : 2,
            maxLength: 200,
        });
        me.dat_fecha_alta = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion :"sin fecha",
            fieldLabel: "Fecha Alta",
            name: "FECHA_ALTA",
            width: 240,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
      
        me.items = [
        me.txt_id,
        me.txt_id_movil,
        me.cbx_tipo,
        me.cbx_color,
        me.cbx_marca,
        me.txt_modelo,
        me.txt_placa,
        me.txt_motor,
        me.txt_chasis,
       
        me.dat_fecha_alta,
         me.txt_descripcion,
        ];
     }
});