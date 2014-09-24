Ext.define("App.View.Choferes.Forms.FormFondoAsalariado", {
    config: {
        defaultWidth: 300,
        parent: ''
    },

    constructor: function (config) {

        this.initConfig(config);
        this.initComponent();
        return this;
    },

    initComponent: function () {

        var me = this.parent;
        var defaultWidth = this.defaultWidth;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_FAMILIAR",
            hidden: true
        });
        me.txt_id_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_SOCIO",
            hidden: true
        });
        me.txt_id_chofer = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_CHOFER",
            hidden: true
        });

        me.store_tipo_transaccion = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipo_transaccion.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_TRANSACCION'));
        me.cbx_tipo_transaccion = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo Transacción.",
            name: "TIPO_TRANSACCION",
            width: defaultWidth,
            store: me.store_tipo_doc,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.txt_recibo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Recibo",
            name: "RECIBO",
            width: defaultWidth,
            maxLength: 200,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.num_saldo_disp = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo Actual",
            name: "SALDO_DISPONIBLE",
            width: defaultWidth,
            maxLength: 15,
            allowNegative: false,
            allowBlank: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowDecimals: false
        });

        me.num_monto = Ext.create("App.Config.Componente.NumberFieldBase", {
            name: "MONTO_TRANSACCION",
            fieldLabel: "Monto Transacción",
            width: defaultWidth,
            maxLength: 15,
            allowNegative: false,
            allowBlank: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowDecimals: false
        });

        me.num_saldo_actual = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo Actual",
            name: "SAÑDO_ACTUAL",
            width: defaultWidth,
            maxLength: 15,
            allowNegative: false,
            allowBlank: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowDecimals: false
        });

        me.dat_fecha_transaccion = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "Fecha Transacción",
            name: "FECHA_TRANSACCION",
            width: defaultWidth,
            afterLabelTextTpl: Constantes.REQUERIDO,
            value: new Date(),
            allowBlank: false
        });
      
        me.txt_detalle = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Detalle",
            name: "DETALLE",
            width: defaultWidth,
            maxLength: 250
        });

        me.items = [
                me.txt_id,
                me.txt_id_socio,
                me.cbx_tipo_transaccion,
                me.txt_id_chofer,
                me.txt_recibo,
                me.num_saldo_disp,
                me.num_monto,
                me.num_saldo_actual,
                me.txt_descripcion,
                me.dat_fecha_transaccion,
                me.txt_detalle
            ];
    }
});