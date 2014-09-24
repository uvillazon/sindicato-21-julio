Ext.define("App.View.Tanques.FormAjustarTanque", {
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
            fieldLabel: "Nro Ajuste",
            readOnly : true,
            name: "NRO_AJUSTE"

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
        
         me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

         me.num_saldo_actual = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo Actual",
            name: "SALDO",
            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999
        });

         me.num_cantidad = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Cantidad",
            name: "CANTIDAD",
            allowDecimals: false,
            maxValue: 999999999
        });

         me.num_nuevo_saldo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nuevo Saldo",
            name: "NUEVO_SALDO",
            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999
        });

        me.txt_obs = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            width: '90%',
            name: "OBSERVACIONES"

        });

        me.items = [
            me.txt_nro_cmp,
            me.cbx_combustible,
            me.date_fecha,
            me.num_saldo_actual,
            me.num_cantidad,
            me.num_nuevo_saldo,
            me.txt_obs
        ];
       
      

    },
    cargarEventos : function(){
        var me = this;

        me.num_cantidad.on('change', function (num, newvalue, oldvalue) {
           // este valor debe obtenerse de la base de datos costo en bs por litro de combustible
            var total = me.num_saldo_actual.getValue() - newvalue;
            me.num_nuevo_saldo.setValue(total);
        });
    }
});
