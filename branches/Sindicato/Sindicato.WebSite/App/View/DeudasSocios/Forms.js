Ext.define("App.View.DeudasSocios.Forms", {
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

        me.store_socio = Ext.create('App.Store.Socios.Socios');

        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Nro Movil",
            name: "ID_SOCIO_MOVIL",
            displayField: 'NRO_MOVIL',
            valueField: 'ID_SOCIO_MOVIL',
            store: me.store_socio,
            colspan: 2,
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        });
        me.items = [
                 me.txt_id,
                 me.cbx_socio,
        ];
    }
});
