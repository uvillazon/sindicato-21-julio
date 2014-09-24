Ext.define("App.Config.Componente.FieldContainerBase", {
    extend: "Ext.form.FieldContainer",
    alias: 'widget.FieldContainerBase',
    columns : 2,
    btn_titulo: '',
    btn_iconCls: '',
    margin: '0 0 0 0',
    btn_id  : null,
    btn_tooltip: 'Buscar',
    botton : false,
    componente: null,
    cmpArray : null,
    initComponent: function () {
        var me = this;
        me.layout = {
            type: 'table',
            columns: me.columns
        };
        if (me.cmpArray == null) {
            me.btn = Ext.create('Ext.Button', {
                iconCls: me.btn_iconCls,
                tooltip: me.btn_tooltip,
                text: me.btn_titulo,
                itemId: me.btn_id,
            });
            me.items = [me.componente, me.btn]
        }
        else {

            //for (i = 0 ; i < me.cmpArray.length ; i++) {
            
            if (me.botton) {
                me.btn = Ext.create('Ext.Button', {
                    iconCls: me.btn_iconCls,
                    tooltip: me.btn_tooltip,
                    text: me.btn_titulo,
                    itemId: me.btn_id,
                });
                me.cmpArray[me.cmpArray.length + 1] = me.btn;
                me.items = me.cmpArray;
            }
            else {
                me.items = me.cmpArray;
            }
                //me.cmpArray[i].setValue(record[0].get(me.cmpArray[i].getName()));
            //}
        }
        //        

        me.callParent(arguments);
    },
    reset: function () {
        var me = this;
        for (j = 0 ; j < me.cmpArray.length ; j++) {
            try {
                me.cmpArray[j].reset();
            } catch (e) {
                console.log(e);
            }
        }
    }

});
