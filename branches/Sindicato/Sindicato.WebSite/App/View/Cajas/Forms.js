Ext.define("App.View.Cajas.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormTransferencias") {
            me.title = "Datos Transferencia";
            me.CargarFormTransferencias();
            me.EventosFormTransferencias();

        }
        else { 
            Ext.Msg.alert("Aviso","No Existe Opcions")
        }
        this.callParent(arguments);
    },
    EventosFormTransferencias : function(){
        var me = this;
        me.cbx_cuenta_origen.on('select', function (cmb, record) {
            me.num_saldo_origen.setValue(record[0].get('SALDO'));
            if(me.cbx_cuenta_destino.getValue() == cmb.getValue()){
               Ext.Msg.alert("Error","No puede Seleccionar la misma CAJA");
               me.cbx_cuenta_origen.reset();
            }
        });
        me.cbx_cuenta_destino.on('select', function (cmb, record) {
            me.num_saldo_destino.setValue(record[0].get('SALDO'));
             if(me.cbx_cuenta_origen.getValue() == cmb.getValue()){
               Ext.Msg.alert("Error","No puede Seleccionar la misma CAJA");
               me.cbx_cuenta_destino.reset();
            }
        });
        
//        me.num_importe.on('change', function (num, newvalue, oldvalue) {
//            me.actualizarNuevoSaldo(true);
//        });
    },
    CargarFormTransferencias: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            fieldLabel: "Id",
            readOnly: true,
            name: "ID_TRANSFERENCIA"

        });
        me.txt_nro_cmp = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro Comprobante",
            readOnly: true,
//            colspan : 2,
            name: "NRO_COMP"

        });
        me.store_cuenta = Ext.create('App.Store.Cajas.Cajas').load();
        me.cbx_cuenta_origen = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Cuenta Origen",
            name: "ID_CAJA_ORIGEN",
            displayField: 'NOMBRE',
            valueField: 'ID_CAJA',
            store: me.store_cuenta,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE}" }
        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.num_saldo_origen = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo",
            name: "SALDO_ORIGEN",
            readOnly: true,
            allowDecimals: true,
            maxValue: 999999999
        });
        me.cbx_cuenta_destino = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Cuenta Destino",
            name: "ID_CAJA_DESTINO",
            displayField: 'NOMBRE',
            valueField: 'ID_CAJA',
            store: me.store_cuenta,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE}" }
        });
        me.num_saldo_destino = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo destino",
            name: "SALDO_DESTINO",
            readOnly: true,
            allowDecimals: true,
            maxValue: 999999999
        });
        me.num_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe",
            name: "IMPORTE_BS",
            allowDecimals: true,
            maxValue: 999999999,
            colspan : 2
        });
        me.txt_concepto = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Registrar",
            name: "CONCEPTO",
            value: 'TRANSFERENCIA DE FONDOS',
//            readOnly: true,
//            width: 240,
//            height : 50,

        });
        me.items = [
            me.txt_id,
            me.txt_nro_cmp,
            me.date_fecha,
            me.cbx_cuenta_origen,
            me.num_saldo_origen,
            me.cbx_cuenta_destino,
            me.num_saldo_destino,
            me.num_importe,
            me.txt_concepto


        ];
    },
    mostrarSaldos: function (value) {
        var me = this;
        me.num_saldo_origen.setVisible(value);
        me.num_saldo_destino.setVisible(value);
    },
    habilitarFormulario : function(habilitar, crear){
        var me = this;
        var fields = new Array('NRO_COMP', 'SALDO_ORIGEN', 'SALDO_DESTINO');
        if (!crear)
            fields.push('FECHA','ID_CAJA_DESTINO','ID_CAJA_ORIGEN');

        Funciones.BloquearFormulario(me, new Array('docked_modificar', 'docked_eliminar', 'docked_comprobante'));

        if (habilitar) {
            Funciones.DesbloquearFormulario(me, fields, true);
        }
    },
    CargarStore: function () {
        var me = this;
        me.store_cuenta.load();
    },

});
