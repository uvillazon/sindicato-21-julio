Ext.define("App.Config.Componente.TextFieldBase", {
    extend: "Ext.form.TextField",
    alias: 'widget.TextFieldBase',
    margin: '10 0 10 0',
    disabledCls: 'DisabledClase',
    readOnlyCls: 'DisabledClaseReadOnly',
    //    vtype: "uppercase",
    maxLength: 30,
    emptyText: 'Introduzca...',
    enforceMaxLength: true,
    width: 240,
    labelWidth: 110,
    selectOnFocus: true,
    mensaje: '',
    titulo: '',
    scope: this,
    opc: '',
    initComponent: function () {
        var me = this;
        me.ConvertirCampoRequerido();
        me.width = me.fieldLabel == ''? me.width - me.labelWidth : me.width;
        if (me.titulo != '') {
            me.on('render', function (obj) {
                obj.tip = Ext.create('Ext.tip.ToolTip', {
                    target: me.getEl(),
                    title: me.titulo,
                    html: me.mensaje
                });
            });
        }
        if (me.opc == '') {
            me.on('blur', function (obj) {
                var text = Ext.util.Format.uppercase(obj.getValue());
                me.setValue(text);
            });
        }
        //        

        me.callParent(arguments);
    },
    ConvertirCampoRequerido: function () {
        var me = this;
        if (me.allowBlank == false) {
            if (Ext.typeOf(me.afterLabelTextTpl) == 'undefined') { me.afterLabelTextTpl = Constantes.REQUERIDO }
            //else { me.afterLabelTextTpl = Constantes.REQUERIDO  }
        }
    }

});
