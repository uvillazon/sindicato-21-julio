Ext.define("App.View.Ventas.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "formSubTotales") {
            me.title = "Subtotales";
            me.CargarFormSubTotales();

        }
        else if (me.opcion == 'formResumen') {
            me.title = "Resumen";
            me.CargarFormResumen();
        }
        this.callParent(arguments);
    },
    CargarFormSubTotales: function () {
        var me = this;

        me.txt_diesel = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Subtotal Diesel",
            name: "COD_POSTE",
            width: 200,
            colspan: 1,
            emptyText: ''
        });
        me.txt_diesel_bs = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "COD_POSTE",
            width: 70,
            colspan: 1,
            emptyText: ''
        });
        me.txt_gasolina = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Subtotal Gasolina",
            name: "AREA_UBIC",
            width: 200,
            emptyText: '',
            colspan: 1
        });
        me.txt_gasolina_bs = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "",
            name: "AREA_UBIC",
            width: 70,
            colspan: 1,
            emptyText: ''
        });
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Total",
            name: "UBICACION",
            width: 200,
            colspan: 2,
            emptyText: ''
        });

        me.items = [
        me.txt_diesel,
        me.txt_diesel_bs,
        me.txt_gasolina,
         me.txt_gasolina_bs,
        me.txt_total
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
