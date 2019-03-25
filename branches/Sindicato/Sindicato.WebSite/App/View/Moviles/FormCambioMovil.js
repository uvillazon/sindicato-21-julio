Ext.define("App.View.Moviles.FormCambioMovil", {
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
        me.txt_movil_ant = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Movil Anterior",
            name: "MOVIL_ANTERIOR",
            maxLength: 30,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly : true
        });

        me.txt_movil_nuevo= Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Movil Nuevo",
            name: "NRO_MOVIL",
            maxLength: 30,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.dat_fecha_alta = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA_REG",
            width: 240,
            colspan : 2,
            readOnly : true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
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
        me.txt_movil_ant,
        me.txt_movil_nuevo,
        me.dat_fecha_alta,
        me.txt_observacion
        ];

    },
    cargarDatos: function (record) {
        var me = this;
        me.txt_id.setValue(record.get('ID_MOVIL'));
        me.txt_movil_ant.setValue(record.get('NRO_MOVIL'));

    }
});
