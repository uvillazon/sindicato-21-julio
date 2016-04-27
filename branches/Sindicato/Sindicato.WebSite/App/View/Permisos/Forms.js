Ext.define("App.View.Permisos.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "formAnular") {
            me.title = "Anulacion de Permiso";
            me.CargarFormAnular();

        }
        else if (me.opcion == 'formResumen') {
            me.title = "Resumen";
            me.CargarFormResumen();
        }
        this.callParent(arguments);
    },
    CargarFormAnular: function () {
        var me = this;

        me.txt_nro_permiso = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Permiso",
            name: "ID_PERMISO",
            readOnly: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });

        me.txt_nor_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Movil",
            name: "NRO_MOVIL",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true,
        });
        me.txt_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Socio",
            name: "SOCIO",
            colspan: 2,
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true,
        });

        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION_BAJA",
            width: 480,
            maxLength: 500,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.items = [
            me.txt_nro_permiso, me.txt_nor_movil,
            me.txt_socio,
            me.txt_observacion
        ];
    },
    CargarFormResumen: function () {
        var me = this;
        var label1 = Ext.create("Ext.form.Label", {
            text: 'LITROS',
            cls : 'resaltarAzulRight',

        });
        var label2 = Ext.create("Ext.form.Label", {
            text: 'P-COSTO',
            cls : 'resaltarAzul',
        });
        var label3 = Ext.create("Ext.form.Label", {
            text: 'P-VENTA',
            cls : 'resaltarAzul',
        });
        me.txt_diesel = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Diesel",
            name: "COD_POSTE",
            width: 180,
            colspan: 1,
            emptyText: ''
        });
        me.txt_diesel_costo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "COD_POSTE",
            width: 70,
            colspan: 1,
            emptyText: ''
        });
        me.txt_diesel_venta = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "COD_POSTE",
            width: 70,
            colspan: 1,
            emptyText: ''
        });
        me.txt_gasolina = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Gasolina",
            name: "AREA_UBIC",
            width: 180,
            emptyText: '',
            colspan: 1
        });
        me.txt_gasolina_costo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "AREA_UBIC",
            width: 70,
            colspan: 1,
            emptyText: ''
        });
        me.txt_gasolina_venta = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "AREA_UBIC",
            width: 70,
            colspan: 1,
            emptyText: ''
        });

        me.items = [
        label1,
        label2,
        label3,
        me.txt_diesel,
        me.txt_diesel_costo,
        me.txt_diesel_venta,
        me.txt_gasolina,
        me.txt_gasolina_costo,
        me.txt_gasolina_venta
        ];
    }
});
