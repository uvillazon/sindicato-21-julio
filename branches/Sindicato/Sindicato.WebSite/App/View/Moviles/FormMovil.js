Ext.define("App.View.Moviles.FormMovil", {
    extend: "App.Config.Abstract.Form",
    title: "Datos del Movil",
    cargarStores: true,
    initComponent: function () {
        var me = this;

        me.CargarComponentes();

        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_MOVIL",
            hidden: true,
        });
        me.txt_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Movil",
            name: "NRO_MOVIL",
            maxLength: 30,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.dat_fecha_alta = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "Fecha Alta",
            name: "FECHA_ALTA",
            width: 240,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_descripcion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Descripcion",
            name: "DESCRIPCION",
            width: 480,
            colspan: 2,
            //maxLength: 500,
        });

        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            //maxLength: 500,
        });


        me.items = [
        me.txt_id,
        me.txt_movil,
        me.dat_fecha_alta,
        me.txt_descripcion,
        me.txt_observacion
        ];

    }
});
