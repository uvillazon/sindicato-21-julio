Ext.define("App.Config.Componente.FieldContainerComplexBase", {
    extend: "Ext.form.FieldContainer",
    alias: 'widget.FieldContainerBase',
    layout: {
        type: 'table',
        columns: 3
    },
    colspan: 2,
    margin: '0 0 0 10',
    btn_titulo: '',
    btn_iconCls: 'zoom',
    btn_tooltip: 'Buscar',
    componente: null,
    readOnlyDetalle: true,
    textComponente: ' Componente',
    controlador: null,
    accion: null,
    param: '',
    params: {},
    mask: null,
    win: null,
    grid: null,
    cargarEventos: true,
    allowBlank: true,
    readOnly: false,
    cmpArray: null,
    hiddenCmp: false,
    hiddenBtn: false,
    cmpCombo: false,
    textoTpl: null,
    widtdetalle : 200,
    initComponent: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: me.nameIdComponente,
            hidden: true,
            allowBlank: me.allowBlank,
            readOnly: me.readOnly
        });
        if (me.cmpCombo) {
            me.txt_componente = Ext.create("App.Config.Componente.ComboAutoBase", {
                fieldLabel: me.textComponente,
                name: me.nameComponente,
                displayField: me.nameComponente,
                allowBlank: me.allowBlank,
                readOnly: me.readOnly,
                hidden: me.hiddenCmp,
                store: me.grid.getStore(),
                textoTpl: me.textoTpl,

            });
        }
        else {
            me.txt_componente = Ext.create("App.Config.Componente.TextFieldBase", {
                fieldLabel: me.textComponente,
                name: me.nameComponente,
                allowBlank: me.allowBlank,
                readOnly: me.readOnly,
                hidden: me.hiddenCmp
            });
        }
        me.hiddenCmp ? me.fieldLabel = me.textComponente : null;
        me.txt_detalleComponente = Ext.create("App.Config.Componente.TextFieldBase", {
            name: me.nameDetalleComponente,
            readOnly: me.readOnlyDetalle,
            maxLength: 500,
            width: me.widthdetalle,
            allowBlank: me.allowBlank,
            readOnly: me.readOnly == true ? true : true
        });
        me.btn = Ext.create('Ext.Button', {
            iconCls: me.btn_iconCls,
            itemId: me.btnId,
            tooltip: me.btn_tooltip,
            text: me.btn_titulo,
            hidden: me.hiddenBtn
            //scope: me.scope,
            //handler: me.handler
        });
        //me.CargarVentana();
        me.items = [me.txt_id, me.txt_componente, me.btn, me.txt_detalleComponente]
        //        
        if (me.cargarEventos) {
            if (me.cmpCombo) {
                me.txt_componente.on('select', me.CargarDatosComponenteCombo, this);
            }
            else {
                me.txt_componente.on('specialkey', me.CargarDatosComponente, this);
            }
            me.btn.on('click', me.AbrirVentana, this);
            if (me.grid != null) {
                me.grid.on('celldblclick', me.CargarRecord, this);
            }
        }

        me.callParent(arguments);
    },
    CargarRecord: function (grd, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        var els = this.query('.field');
        Ext.each(els, function (o) {
            try {
                o.setValue(record.get(o.getName()));
            }
            catch (e) {
                console.log(e)
            }

        });
        if (me.cmpArray != null) {
            for (i = 0 ; i < me.cmpArray.length ; i++) {
                me.cmpArray[i].setValue(record.get(me.cmpArray[i].getName()));
            }
        }
        me.win.hide();
    },
    loadRecord: function (record) {
        var me = this;
        var els = this.query('.field');
        Ext.Object.each(record, function (key, value, myself) {
            Ext.each(els, function (o) {
                if (o.getName() == key) {
                    o.setValue(value);
                }

            });

        });
        if (me.cmpArray != null) {
            for (i = 0 ; i < me.cmpArray.length ; i++) {
                me.cmpArray[i].setValue(record.get(me.cmpArray[i].getName()));
            }
        }
    },
    AbrirVentana: function () {
        this.CargarVentana();
        this.win.show();
    },
    CargarVentana: function () {
        var me = this;
        if (me.win == null) {
            me.win = Ext.create("App.Config.Abstract.Window");
            me.win.add(me.grid);

        }
    },
    CargarDatosComponente: function (f, e) {
        var me = this;
        if (e.getKey() == e.ENTER) {
            me.CargarVentana();
            me.params[me.param] = f.getValue();
            Funciones.AjaxRequestComponente(me.controlador, me.accion, me.mask, me, me.params, me.win, me.cmpArray);
        }
    },
    CargarDatosComponenteCombo: function (cmb, record) {
        var me = this;
        me.params[me.param] = cmb.getValue();
        Funciones.AjaxRequestComponente(me.controlador, me.accion, me.mask, me, me.params, me.win, me.cmpArray);
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
