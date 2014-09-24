Ext.define("App.View.Ventas.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "formSubTotales") {
            me.title = "SUBTOTALES";
            me.columns = 4,
            me.CargarFormSubTotales();

        }
        else if (me.opcion == 'formResumen') {
            me.title = "Resumen";
            me.CargarFormResumen();
        }
        else if(me.opcion == "formVentaCredito"){
//            me.columns = 1;
             me.title = "Registro Ventas a Credito";
            me.CargarFormVentaCredito();
            me.EventosFormVentaCredito();
        }
        else if (me.opcion == "formEditarVentaCredito"){
//            me.columns = 1;
             me.title = "Registro Ventas a Credito";
            me.CargarFormEditarVentaCredito();
//            me.EventosFormVentaCredito();
        }
        else if (me.opcion == "formConsumo"){
             me.title = "Registro Consumo";
            me.CargarFormConsumo();
            me.EventosFormVentaCredito();
        }
        else if (me.opcion == "formEditarVentaConsumo"){
             me.title = "Registro Consumo";
            me.CargarFormEditarVentaConsumo();
        }
        else {
            Ext.Msg.alert("Error","No existe la funcion");
        }
        this.callParent(arguments);
    },
    CargarFormSubTotales: function () {
        var me = this;
        var label01 = Ext.create("Ext.form.Label", {
            text: 'TOTAL VENTAS',
            cls : 'resaltarAzulRight',
            
        });
        var label02 = Ext.create("Ext.form.Label", {
            text: 'EFECTIVO',
            cls : 'resaltarAzul',
        });
        var label03 = Ext.create("Ext.form.Label", {
            text: 'CREDITO',
            cls : 'resaltarAzul',
        });
         var label04 = Ext.create("Ext.form.Label", {
            text: 'CONSUMO',
            cls : 'resaltarAzul',
        });

        me.txt_diesel01 = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "DIESEL",
            name: "TOTAL_VENTAS_DIESEL",
//            width: 200,
            colspan: 1,
            emptyText: ''
        });
        me.txt_diesel_efectivo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "DIESEL_EFECTIVO",
//            width: 70,
            colspan: 1,
            emptyText: ''
        });
        me.txt_diesel_credito = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "DIESEL_CREDITO",
//            width: 150,
            colspan: 1,
            emptyText: ''
        });
        me.txt_diesel_consumo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "DIESEL_CONSUMO",
//            width: 150,
            colspan: 1,
            emptyText: ''
        });
        me.txt_gasolina01 = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "GASOLINA",
            name: "TOTAL_VENTAS_GASOLINA",
//            width: 200,
            emptyText: '',
            colspan: 1
        });
        me.txt_gasolina_efectivo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "GASOLINA_EFECTIVO",
//            width: 150,
            colspan: 1,
            emptyText: ''
        });
        me.txt_gasolina_credito = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "GASOLINA_CREDITO",
//            width: 150,
            colspan: 1,
            emptyText: ''
        });
        me.txt_gasolina_consumo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "GASOLINA_CONSUMO",
//            width: 150,
            colspan: 1,
            emptyText: ''
        });
        me.txt_total01 = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "TOTAL - Bs",
            name: "TOTAL_VENTA",
            colspan: 1,
            emptyText: ''
        });
        me.txt_total_efectivo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "TOTAL_EFECTIVO",
            colspan: 1,
            emptyText: ''
        });
        me.txt_total_credito = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "TOTAL_CREDITO",
            colspan: 1,
            emptyText: ''
        });
        me.txt_total_consumo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "TOTAL_CONSUMO",
            colspan: 1,
            emptyText: ''
        });

        var label1 = Ext.create("Ext.form.Label", {
            text: 'TOTAL LITROS',
            cls : 'resaltarAzulRight',
            
        });
        var label2 = Ext.create("Ext.form.Label", {
            text: 'P. VENTA - BS',
            cls : 'resaltarAzul',
        });
        var label3 = Ext.create("Ext.form.Label", {
            text: 'P. COSTO - BS',
            cls : 'resaltarAzul',
            colspan: 2,
        });
        me.txt_diesel = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "DIESEL",
            name: "SUB_DIESEL",
//            width: 200,
            colspan: 1,
            emptyText: ''
        });
        me.txt_diesel_bs = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "SUB_DIESEL_BS",
//            width: 70,
            colspan: 1,
            emptyText: ''
        });
        me.txt_diesel_bs_costo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "SUB_DIESEL_BS_COSTO",
//            width: 150,
            colspan: 2,
            emptyText: ''
        });
        me.txt_gasolina = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "GASOLINA",
            name: "SUB_GASOLINA",
//            width: 200,
            emptyText: '',
            colspan: 1
        });
        me.txt_gasolina_bs = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "SUB_GASOLINA_BS",
//            width: 150,
            colspan: 1,
            emptyText: ''
        });
        me.txt_gasolina_bs_costo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "SUB_GASOLINA_BS_COSTO",
//            width: 150,
            colspan: 2,
            emptyText: ''
        });
        me.txt_total = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "TOTAL",
            name: "TOTAL",
            colspan: 1,
            emptyText: ''
        });
        me.txt_total_Bs = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "TOTAL_BS",
            colspan: 1,
            emptyText: ''
        });
        me.txt_total_Bs_costo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "",
            name: "TOTAL_BS_COSTO",
            colspan: 2,
            emptyText: ''
        });

        me.txt_utilidad = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "UTILIDAD BRUTA SOBRE VENTAS",
            name: "TOTAL_BS_COSTO",
            colspan: 4,
            emptyText: '',
            width : 510,
            labelAlign: 'right',
            labelWidth: 375,
        });

        me.items = [
        label01,
        label02,
        label03,
        label04,
        me.txt_diesel01,
        me.txt_diesel_efectivo,
        me.txt_diesel_credito,
        me.txt_diesel_consumo,
        me.txt_gasolina01,
        me.txt_gasolina_efectivo,
        me.txt_gasolina_credito,
        me.txt_gasolina_consumo,
        me.txt_total01,
        me.txt_total_efectivo,
        me.txt_total_credito,
        me.txt_total_consumo,
        label1,
        label2,
        label3,
        me.txt_diesel,
        me.txt_diesel_bs,
        me.txt_diesel_bs_costo,
        me.txt_gasolina,
        me.txt_gasolina_bs,
        me.txt_gasolina_bs_costo,
        me.txt_total,
        me.txt_total_Bs,
        me.txt_total_Bs_costo,
        me.txt_utilidad
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
    },
    CargarFormVentaCredito : function(){
        var me = this;
        me.store_cliente = Ext.create('App.Store.Clientes.Clientes');
        me.cbx_cliente = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Cliente",
            name: "ID_CLIENTE",
            valueField : 'ID_CLIENTE',
            displayField: 'EMPRESA',
            maxLength: 50,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{CODIGO} - {EMPRESA} NIT : {NIT}" },
            store: me.store_cliente,
        });
        me.store_combustible = Ext.create('App.Store.Combustibles.Combustibles').load();
        me.cbx_combustible = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Combustible",
            name: "ID_COMBUSTIBLE",
            displayField: 'NOMBRE',
            valueField : 'ID_COMBUSTIBLE',
            store: me.store_combustible,
            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl : function () { return "{NOMBRE} - {DESCRIPCION}" }
        });
         me.num_litros = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Litros",
            name: "IMPORTE_LTS",
            allowDecimals: true,
            readOnly : true,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Total",
            name: "IMPORTE_BS",
//            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_precio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Precio Litro ",
            name: "PRECIO",
            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999,
        });
        me.items = [
            me.cbx_cliente,
            me.cbx_combustible,
            me.num_precio,
            me.num_litros,
            me.num_importe

        ];
    },
    CargarFormEditarVentaCredito : function(){
        var me = this;
         me.txt_id_venta = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_VENTA",
            hidden: true,
        });
         me.txt_id_combustible = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_COMBUSTIBLE",
            hidden: true,
        });
         me.txt_id_cliente = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_CLIENTE",
            hidden: true,
        });
        me.txt_cliente = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cliente",
            name: "CLIENTE",
            readOnly : true,
            maxValue: 999999999,
        });
        me.txt_combustible = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Combustible",
            name: "COMBUSTIBLE",
            readOnly : true,
            maxValue: 999999999,
        });
        me.num_litros = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Litros",
            name: "IMPORTE_LTS",
            allowDecimals: true,
            readOnly : true,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Total",
            name: "IMPORTE_BS",
            allowDecimals: true,
//            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_precio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Precio Litro ",
            name: "PRECIO",
            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999,
        });
        me.items = [
            me.txt_id_combustible,
            me.txt_id_cliente,
            me.txt_id_venta,
            me.txt_cliente,
            me.txt_combustible,
            me.num_precio,
            me.num_litros,
            me.num_importe
        ];

    },
    EventosFormVentaCredito : function(){
        var me = this;
        me.cbx_combustible.on('select',function(cmd,record){
            me.combustible = record[0];
            me.num_precio.setValue(me.combustible.get('PRECIO_VENTA'));
        });

//        me.num_litros.on('change',function(num,newvalue,oldvalue){
////            alert(newvalue);
//            if(newvalue != null){
//                if(me.cbx_combustible.getValue() == null){
//                    Ext.Msg.alert("Error","Seleccione Primero un Tipo de Combustible");
//                }
//                else{
//                    var sum = me.combustible.get('PRECIO_VENTA') * newvalue;
//                    me.num_importe.setValue(sum);
//                }
//            }
//        });
        me.num_importe.on('change',function(num,newvalue,oldvalue){
            if(newvalue != null){
                if(me.cbx_combustible.getValue() == null){
                    Ext.Msg.alert("Error","Seleccione Primero un Tipo de Combustible");
                }
                else{
                    var sum = newvalue / me.combustible.get('PRECIO_VENTA') ;
                    me.num_litros.setValue(sum);
                }
            }
        });
    },
    EventosFormEditarVentaCredito : function(){
        var me = this;
//        me.num_litros.on('change',function(num,newvalue,oldvalue){
//            if(newvalue != null){
//                    var sum = me.num_precio.getValue() * newvalue;
//                    me.num_importe.setValue(sum);
//            }
//        });
        me.num_importe.on('change',function(num,newvalue,oldvalue){
            if(newvalue != null){
                    var sum = newvalue / me.num_precio.getValue() ;
                    me.num_litros.setValue(sum);
            }
        });
    },
    CargarFormConsumo : function(){
        var me = this;
        me.store_cliente = Ext.create('App.Store.ConsumoPropio.ClientesConsumo');
        me.cbx_cliente = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Cliente",
            name: "ID_CLIENTE",
            valueField : 'ID_CLIENTE',
            displayField: 'NOMBRE',
            maxLength: 50,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{CODIGO} - {NOMBRE}" },
            store: me.store_cliente,
        });
        me.store_combustible = Ext.create('App.Store.Combustibles.Combustibles').load();
        me.cbx_combustible = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Combustible",
            name: "ID_COMBUSTIBLE",
            displayField: 'NOMBRE',
            valueField : 'ID_COMBUSTIBLE',
            store: me.store_combustible,
            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl : function () { return "{NOMBRE} - {DESCRIPCION}" }
        });
         me.num_litros = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Litros",
            name: "IMPORTE_LTS",
            allowDecimals: true,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Total",
            name: "IMPORTE_BS",
            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999,
        });
        me.num_precio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Precio Litro ",
            name: "PRECIO",
            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999,
        });
        me.items = [
            me.cbx_cliente,
            me.cbx_combustible,
            me.num_precio,
            me.num_litros,
            me.num_importe

        ];
    },
    CargarFormEditarVentaConsumo : function(){
        var me = this;
         me.txt_id_consumo = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_CONSUMO",
            hidden: true,
        });
         me.txt_id_combustible = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_COMBUSIBLE",
            hidden: true,
        });
        me.txt_cliente = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cliente",
            name: "CLIENTE",
            readOnly : true,
            maxValue: 999999999,
        });
        me.txt_combustible = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Combustible",
            name: "COMBUSTIBLE",
            readOnly : true,
            maxValue: 999999999,
        });
        me.num_litros = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Litros",
            name: "IMPORTE_LTS",
            allowDecimals: true,
            maxValue: 999999999,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Total",
            name: "IMPORTE_BS",
            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999,
        });
        me.num_precio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Precio Litro ",
            name: "PRECIO",
            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999,
        });
        me.items = [
            me.txt_id_combustible,
            me.txt_id_consumo,
            me.txt_cliente,
            me.txt_combustible,
            me.num_precio,
            me.num_litros,
            me.num_importe
        ];
    }
});
