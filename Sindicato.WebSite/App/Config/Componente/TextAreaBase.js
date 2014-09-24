Ext.define("App.Config.Componente.TextAreaBase", {
    extend: "Ext.form.TextArea",
    alias: 'widget.TextArea',
    disabledCls: 'DisabledClase',
    readOnlyCls: 'DisabledClaseReadOnly',
    emptyText: 'Introduzca...',
    width: 500,
    height : 50,
//    vtype : 'uppercase',
    //rowspan: 3,
    maxLength: 300,
    enforceMaxLength: true,
    colspan: 2,
    columns: 1,
    selectOnFocus: true,
    mensaje: '',
    titulo: '',
    initComponent: function () {
        var me = this;
        if (me.titulo != '') {
            me.on('render', function (obj) {
                obj.tip = Ext.create('Ext.tip.ToolTip', {
                    target: me.getEl(),
                    title: me.titulo,
                    html: me.mensaje
                });
            });
        }

        me.on('blur', function (obj) {
            var text = Ext.util.Format.uppercase(obj.getValue());
            me.setValue(text);
        });
        //        

        me.callParent(arguments);
    }

});
