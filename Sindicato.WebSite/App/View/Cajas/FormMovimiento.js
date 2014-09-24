Ext.define("App.View.Cajas.FormMovimiento", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
    },
    CargarStore : function(){
        var me = this;
        me.store_registrar.load();
        me.store_cuenta.load();
    },
    CargarComponentes: function () {
        var me = this;
        me.txt_nro_cmp = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Comprobante",
            readOnly : true,
            name: "NRO_COMP",

        });
         me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.store_registrar = Ext.create('App.Store.Listas.StoreLista');
        me.store_registrar.setExtraParam('ID_LISTA', Lista.Buscar('MOVIMIENTO'));
        me.cbx_registrar= Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Registrar",
            name: "REGISTRAR",
            displayField: 'VALOR',
//            valueField: 'CODIGO',
            store: me.store_registrar,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.store_cuenta = Ext.create('App.Store.Cajas.Cajas').load();
        me.cbx_cuenta = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Cuenta",
            name: "ID_CAJA",
            displayField: 'NOMBRE',
            valueField : 'ID_CAJA',
            store: me.store_cuenta,
            readOnly: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl : function () { return "{NOMBRE} - {DESCRIPCION}" }
        });
        me.num_saldo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo",
            name: "SALDO",
            readOnly : true,
            hidden : true,
            allowDecimals: true,
            maxValue: 999999999,
        });

        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe",
            name: "IMPORTE",
            allowDecimals: true,
            maxValue: 999999999,
        });
        me.txt_nuevo_saldo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nuevo Saldo",
            name: "NUEVO_SALDO",
            readOnly : true
        });
         me.txt_concepto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Concepto",
            name: "CONCEPTO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.items = [
            me.txt_nro_cmp,
            me.date_fecha,
            me.cbx_registrar,
            me.cbx_cuenta,
            me.num_saldo,
            me.num_importe,
            me.txt_nuevo_saldo,
            me.txt_concepto
        ];
       
      

    },
    cargarEventos : function() {
        var me = this;
        me.cbx_cuenta.on('select',function(cmb,record){
            me.num_saldo.setValue(record[0].get('SALDO'));
        });

        me.num_importe.on('change',function(num,newvalue,oldvalue){
             var sum 
             if (me.cbx_registrar.getValue() == 'OTROS INGRESOS') {
              sum = me.num_saldo.getValue() + newvalue;
             } else {
                sum = me.num_saldo.getValue() - newvalue;
             }
           
            me.txt_nuevo_saldo.setValue(sum);
        });
    },
     cargarCaja: function(id_caja) {
      var me = this;  
      me.cbx_cuenta.setValue(id_caja);
      var found = me.cbx_cuenta.store.find('ID_CAJA', id_caja,0,true,false);
      if (found >= 0) {
        var record =  me.cbx_cuenta.store.getAt(found);   
        me.num_saldo.setValue(record.get('SALDO'));
      }
 
    }
});
