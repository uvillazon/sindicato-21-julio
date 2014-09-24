Ext.define("App.View.Cajas.FormCaja", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
    },
    CargarStore: function () {
        var me = this;
        me.store_moneda.load();
    },
    CargarComponentes: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            fieldLabel: "Id",
            readOnly: true,
            name: "ID_CAJA"

        });
        me.txt_nro_cmp = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "C\u00F3digo",
            //            readOnly : true,
            name: "CODIGO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false

        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre",
            name: "NOMBRE",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.num_nro_cuenta = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Cuenta",
            name: "NRO_CUENTA",
            allowBlank: false

        });


        me.store_moneda = Ext.create('App.Store.Listas.StoreLista');
        me.store_moneda.setExtraParam('ID_LISTA', Lista.Buscar('MONEDA'));
        me.cbx_moneda = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Moneda",
            name: "MONEDA",
            displayField: 'VALOR',
            //            valueField: 'CODIGO',
            store: me.store_moneda,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.num_saldo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo",
            name: "SALDO",
            allowDecimals: true,
            maxValue: 999999999
        });

        me.txt_descp = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Descripci\u00F3n",
            width: '90%',
            name: "DESCRIPCION"

        });
        me.items = [
            me.txt_id,
            me.txt_nro_cmp,
            me.txt_nombre,
            me.num_nro_cuenta,
            me.cbx_moneda,
            me.num_saldo,
            me.txt_descp
        ];



    }, mostrarSaldos: function (value) {
        var me = this;
        me.num_saldo.setVisible(value);
    },
    cargarEventos: function () {
        var me = this;

    }, habilitarFormulario: function (habilitar) {
        var me = this;
        if (habilitar) {
            Funciones.DesbloquearFormulario(me, null, true);
        } else {
            Funciones.BloquearFormulario(me, new Array('docked_modificar', 'docked_eliminar', 'docked_comprobante'));
        }
    }
});
