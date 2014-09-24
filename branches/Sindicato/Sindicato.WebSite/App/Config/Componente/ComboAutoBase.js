Ext.define("App.Config.Componente.ComboAutoBase", {
    extend: "Ext.form.ComboBox",
    alias: ['widget.comboboxAuto', 'widget.comboAuto'],
    fieldLabel: 'Buscar ',
    name: 'NAME',
    typeAhead: false,
    emptyText: 'Buscar...',
    disabledCls: 'DisabledClase',
    readOnlyCls: 'DisabledClaseReadOnly',
    //store: me.store_empresa,
    displayField: 'DISPLAY',
    //valueField: 'VALUE',
    hideTrigger: false,
    pageSize: 10,
    matchFieldWidth: false,
    forceSelection: true,
    editable: true,
    queryParam: 'Contiene',
    minChars: 1,
    width: 240,
    labelWidth: 110,
    textoResultado: 'Buscando',
    textoVacio: 'No Existe Resultados',
    textoTpl: null,
    titulo: '',
    datos : null,
    initComponent: function () {
        var me = this;
        me.ConvertirCampoRequerido();
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
        me.on('assertValue', function () {
            var me = this;
            if (!me.forceSelection) {
                me.collapse();
            } else {
                me.callParent();
            }
        });
        me.on('select', function (cmb,record) {
            var me = this;
            me.datos = record;
        });
        //me.on('expand', function () {
        //    this.clearValue();
        //});
        me.callParent(arguments); //y
    },
    setDisabled: function (disabled) {
        if (disabled) {
            this.forceSelection = false;
        }
        else { this.forceSelection = true; }
        return this[disabled ? 'disable' : 'enable']();
    },
    setReadOnly: function (readOnly) {
        var me = this,
            old = me.readOnly;
        if (readOnly) {
            this.forceSelection = false;
        }
        me.callParent(arguments);
        if (readOnly != old) {
            me.updateLayout();
        }
    },
    select: function (r, /* private */ assert) {
        var me = this,
            picker = me.picker,
            doSelect = true,
            fireSelect;
        //se carga el record en una variable datos
        me.datos = r;
        //alert(r[0].get('ID_POSTE'));
        if (r && r.isModel && assert === true && picker) {
            fireSelect = !picker.getSelectionModel().isSelected(r);
        }

        me.setValue(r, true);
        // Select needs to be fired after setValue, so that when we call getValue
        // in select it returns the correct value
        if (fireSelect) {
            me.fireEvent('select', me, r);
        }
    },
    ConvertirCampoRequerido: function () {
        var me = this;
        if (me.allowBlank == false) {
            if (Ext.typeOf(me.afterLabelTextTpl) == 'undefined') { me.afterLabelTextTpl = Constantes.REQUERIDO }
            //else { me.afterLabelTextTpl = Constantes.REQUERIDO  }
        }
    }
});
