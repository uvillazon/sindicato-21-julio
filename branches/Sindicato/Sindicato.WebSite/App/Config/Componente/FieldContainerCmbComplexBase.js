Ext.define("App.Config.Componente.FieldContainerCmbComplexBase", {
    extend: "Ext.form.FieldContainer",
    alias: 'widget.FieldContainerCmbComplexBase',
    layout: {
        type: 'table',
        columns: 2
    },
    colspan: 2,
    margin: '0 0 0 10',
    componente: null,
    readOnlyDetalle: true,
    textComponente: ' Componente',
    cargarEventos: true,
    mask: null,
    store: null,
    allowBlank: true,
    readOnly: false,
    cmpArray: null,
    hiddenCmp: false,
    cmpCombo: false,
    textoTpl: null,
    initComponent: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: me.nameIdComponente,
            hidden: true,
            allowBlank: me.allowBlank,
            readOnly: me.readOnly
        });
        me.txt_componente = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: me.textComponente,
            name: me.nameComponente,
            displayField: me.nameComponente,
            allowBlank: me.allowBlank,
            readOnly: me.readOnly,
            hidden: me.hiddenCmp,
            store: me.store,
            textoTpl: me.textoTpl,

        });
        me.txt_componente.on('select', me.loadRecordCombo, me);
        me.hiddenCmp ? me.fieldLabel = me.textComponente : null;
        me.txt_detalleComponente = Ext.create("App.Config.Componente.TextFieldBase", {
            name: me.nameDetalleComponente,
            readOnly: me.readOnlyDetalle,
            maxLength: 500,
            width: 200,
            allowBlank: me.allowBlank,
            readOnly: me.readOnly == true ? true : true
        });

        //me.CargarVentana();
        me.items = [me.txt_id, me.txt_componente, me.txt_detalleComponente]
        //        
        //if (me.cargarEventos) {
     
        //}

        me.callParent(arguments);
    },
    loadRecordCombo: function (cmb, record) {
        var me = this;
        var els = this.query('.field');

        Ext.each(els, function (o) {
            try {
                o.setValue(record[0].get(o.getName()));
            }
            catch (e) {
                console.log(e);
            }

        });
        if (me.cmpArray != null) {
            for (i = 0 ; i < me.cmpArray.length ; i++) {
                me.cmpArray[i].setValue(record[0].get(me.cmpArray[i].getName()));
            }
        }
    },
    reset: function () {
        var me = this;
        me.txt_id.reset();
        me.txt_componente.reset();
        me.txt_detalleComponente.reset();
    },
    setReadOnly: function (readOnly) {
        var me = this;
        me.txt_id.setReadOnly(readOnly);
        me.txt_componente.setReadOnly(readOnly);
        readOnly ? me.txt_detalleComponente.setReadOnly(readOnly) : me.txt_detalleComponente.setReadOnly(true);

    },
    getArray: function (cmpArray) {
        var me = this;
        var i = 0;
        var resultado = [];
        var els = this.query('.field');
        Ext.each(els, function (o) {
            resultado[i] = o;
            i++;
        });
        if (cmpArray != null) {
            for (j = 0 ; j < cmpArray.length ; j++) {
                resultado[i] = cmpArray[j];
                i++;
            }
        }
        return resultado;
    },
    setAllowBlack: function (allowblack) {
        var me = this;
        me.txt_id.allowBlank = allowblack;
        me.txt_componente.allowBlank = allowblack;
        me.txt_detalleComponente.allowBlank = allowblack;
    }

});
