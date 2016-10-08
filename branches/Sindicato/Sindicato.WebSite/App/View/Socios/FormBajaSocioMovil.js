Ext.define("App.View.Socios.FormBajaSocioMovil", {
    extend: "App.Config.Abstract.Form",
    title: "Datos Baja del Socio - Movil",
    cargarStores: true,
    initComponent: function () {
        var me = this;

        me.CargarComponentes();

        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_SOCIO_MOVIL",
            hidden: true,
        });
        me.txt_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Movil",
            name: "NRO_MOVIL",
            maxLength: 30,
            readOnly: true
        });

        me.txt_tipo_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo Movil",
            name: "TIPO_MOVIL",
            readOnly: true
        });

        me.txt_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Socio",
            name: "NOMBRE_SOCIO",
            width: 480,
            readOnly: true,
            colspan: 2
        });

        me.dat_fecha_baja = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "Fecha Baja",
            name: "FECHA_BAJA",
            width: 240,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });


        me.items = [
        me.txt_id,
        me.txt_movil, me.txt_tipo_movil,
        me.txt_socio,
        me.dat_fecha_baja,
        me.txt_observacion
        ];

    }
});