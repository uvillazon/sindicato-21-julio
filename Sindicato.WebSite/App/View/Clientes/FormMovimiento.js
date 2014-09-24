Ext.define("App.View.Clientes.FormMovimiento", {
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
            fieldLabel: "Nro Comprobante",
            readOnly : true,
            name: "NRO_COMP",

        });
         me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
       
        me.store_cliente = Ext.create('App.Store.Clientes.Clientes').load();
        me.cbx_cliente = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Cliente",
            name: "ID_CLIENTE",
            displayField: 'EMPRESA',
            valueField : 'ID_CLIENTE',
            store: me.store_cliente,
            readOnly: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.num_saldo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo",
            name: "SALDO",
            readOnly : true,
            allowDecimals: true,
            maxValue: 999999999
        });
        me.txt_concepto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Concepto",
            name: "CONCEPTO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe",
            name: "IMPORTE_BS",
            allowDecimals: true,
            maxValue: 999999999
        });

         me.store_cuenta = Ext.create('App.Store.Cajas.Cajas').load();
        me.cbx_cuenta = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Destino Fondos",
            name: "ID_CAJA",
            displayField: 'NOMBRE',
            valueField : 'ID_CAJA',
            store: me.store_cuenta,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl : function () { return "{NOMBRE} - {DESCRIPCION}" }
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            maxLength: 400,
            width: 240,
//            afterLabelTextTpl: Constantes.REQUERIDO,
//            allowBlank: false,

        });
       
         
        me.items = [
            me.txt_nro_cmp,
            me.date_fecha,
            me.cbx_cliente,
            me.num_saldo,
            me.txt_concepto,
            me.num_importe,
            me.cbx_cuenta,
            me.txt_observacion
        ];
       
      

    },
    cargarEventos : function(){
        var me = this;
        me.cbx_cliente.on('select',function(cmb,record){
            me.num_saldo.setValue(record[0].get('SALDO'));
        });
    },
    cargarCliente: function(id_cliente) {
      var me = this;  
      me.cbx_cliente.setValue(id_cliente);
      var found = me.cbx_cliente.store.find('ID_CLIENTE', id_cliente,0,true,false);
      if (found >= 0) {
        var record =  me.cbx_cliente.store.getAt(found);   
        me.num_saldo.setValue(record.get('SALDO'));
      }
 
    }
});
