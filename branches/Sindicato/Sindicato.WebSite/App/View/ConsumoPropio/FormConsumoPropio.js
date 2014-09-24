Ext.define("App.View.ConsumoPropio.FormConsumoPropio", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
    },
    
    CargarComponentes: function () {
        var me = this;
        me.txt_nro_cmp = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "C\u00F3digo",
            readOnly : true,
            name: "CODIGO"

        });
        
        me.txt_registrar = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre",
            name: "NOMBRE"

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

        me.num_consumolts = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Consumo (Lts)",
            name: "CONSUMOLTS",
            allowDecimals: true,
            maxValue: 999999999
        });
        me.txt_importe = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Consumon (Imp)",
            name: "CONSUMOIMP",
            readOnly : true
        });

        me.items = [
            me.txt_nro_cmp,
            me.txt_registrar,
            me.cbx_combustible,
            me.num_consumolts,
            me.txt_importe
        ];
       
      

    },
    cargarEventos : function(){
        var me = this;

        me.num_consumolts.on('change',function(num,newvalue,oldvalue){
           // este valor debe obtenerse de la base de datos costo en bs por litro de combustible
            var imp_x_lts = 3.5; 
            var total = imp_x_lts * newvalue;
            me.txt_importe.setValue(total);
        });
    }
});
