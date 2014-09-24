Ext.define("App.Config.Componente.ComboBase", {
    extend: "Ext.form.ComboBox",
    alias: 'widget.comboBase',
    queryMode: 'local',
    editable: false, //permite controlar lo de la lista dinamica para busqueda inteligente
    forceSelection: false,
    //autoScroll: true,
    margin: '0 0 0 10',
    emptyText: 'Seleccione...',
    disabledCls: 'DisabledClase',
    readOnlyCls: 'DisabledClaseReadOnly',
    displayField: 'VALOR',
    width: 240,
    selectOnFocus: true,
    labelWidth: 110,
    mensaje: '',
    titulo: '',
    matchFieldWidth: false,
    textoTpl: null,
    initComponent: function () {
        var me = this;
        me.matchFieldWidth = true;
        me.forceSelection = false;
        me.editable = false;
        if (me.textoTpl != null) {
            me.listConfig = {
                loadingText: me.textoResultado,
                emptyText: me.textoVacio,
                getInnerTpl: me.textoTpl
            };
        }
        if (me.titulo != '') {
            me.on('render', function (obj) {
                obj.tip = Ext.create('Ext.tip.ToolTip', {
                    target: me.getEl(),
                    title: me.titulo,
                    html: me.mensaje
                });
            });
        }
        //        me.on('focus', function () {
        //            alert('aa');
        //        });
        me.on('assertValue', function () {
            var me = this;
            if (!me.forceSelection) {
                me.collapse();
            } else {
                me.callParent();
            }
        });
        me.on('expand', function () {
            this.clearValue();
        });
        me.callParent(arguments); //y
    },
    setDisabled: function (disabled) {
        //        alert(disabled);
        if (disabled) {
            this.forceSelection = false;
        }
        //        else {
        //            this.forceSelection = true;
        //        }
        return this[disabled ? 'disable' : 'enable']();
    }
});
