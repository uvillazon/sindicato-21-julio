Ext.define("App.View.Ventas.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "formAgregarSocio") {
            me.title = "Agregar Socios";
            me.CargarFormAgregarSocio();

        }
        this.callParent(arguments);
    },
    CargarFormAgregarSocio: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_DEUDA",
            hidden: true,
        });
        me.store_detalle = Ext.create('App.Store.Socios.ObligacionesHoja');
        me.cbx_detalle = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Detalle",
            name: "OBLIGACION",
            displayField: 'OBLIGACION',
            store: me.store_detalle,
            colspan: 2,
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "Caja :{CAJA} - Detalle {OBLIGACION} -  importe {IMPORTE_DEFECTO}" }
        });
        
        me.items = [
           me.txt_id,
           me.txt_id_obligacion,
           me.cbx_detalle,
           me.num_importe,
        ];
    }
});
