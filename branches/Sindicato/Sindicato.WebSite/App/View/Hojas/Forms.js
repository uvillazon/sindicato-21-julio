Ext.define("App.View.Hojas.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "formVentaConsulta") {
            me.title = "Datos Venta";
            me.CargarFormVentanaConsulta();

        }
        else if (me.opcion == "formReimpresion") {
            me.title = "ReImpresion de Hojas";
            me.CargarFormReimpresion();
        }
        this.callParent(arguments);
    },
    CargarFormReimpresion: function () {
        var me = this;

        me.num_nro_inicio = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Hoja Inicio",
            name: "NRO_INICIO",
            //value: 25,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.num_nro_fin = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Hoja Final",
            name: "NRO_FIN",
            //value: 25,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            width: 480,
            maxLength: 500,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.items = [
            me.num_nro_inicio, me.num_nro_fin,
            me.txt_observacion
        ];
    },
    CargarFormVentanaConsulta: function () {
        var me = this;
        me.hid_id = Ext.widget('hiddenfield', {
            name: 'ID_VENTA',
        });
        me.txt_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Socio",
            name: "SOCIO",
            width: 480,
            colspan: 2
        });
        me.txt_nro_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Movil",
            name: "NRO_MOVIL",
            //width: 480,
            //colspan: 2
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total BS",
            name: "TOTAL"

        });
        me.txt_descuento = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Descuento BS",
            name: "DESCUENTO"

        });
        me.txt_cantidad_hojas = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cantidad Hojas",
            name: "TOTAL_HOJAS"

        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            maxLength: 500,
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            //width: 480,
            //colspan: 2
        });
        me.items = [
            me.hid_id,
            me.date_fecha, me.txt_nro_movil,
            me.txt_socio,
            me.txt_total, me.txt_descuento,
            me.txt_cantidad_hojas , me.txt_estado,
            me.txt_observacion
        ];

    },
});
