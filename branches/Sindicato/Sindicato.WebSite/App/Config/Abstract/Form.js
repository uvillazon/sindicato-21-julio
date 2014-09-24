Ext.define("App.Config.Abstract.Form", {
    extend: "Ext.form.Panel",
    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: {
            valign: 'top'
        }
    },
    autoScroll: true,
    iconCls: 'application_form_add',
    columns: 2,
    bodyPadding: 10,
    defaultType: 'textfield',
    botones: true,
    textLimpiar: 'Limpiar',
    textGuardar: 'Guardar',
    fieldDefaults: {
        margin: '2',
        align: 'left',
        labelWidth: 110,
    },
    icono: true,
    record: null,
    mostrarEncabezado: false,
    tituloEncabezado: 'redtertetert',
    cssEncabezado: 'resaltarRojo',
    bloquearFormulario: true,
    dockButtons: false,
    initComponent: function () {
        var me = this;
        me.iconCls = (me.icono) ? 'application_form_add' : '';
        //me.encabezado = Ext.create('Ext.form.Label', {
        //    text: me.tituloEncabezado,
        //    cls: me.cssEncabezado,
        //    colspan: me.columns
        //});
        //me.add(me.encabezado);
        if (me.botones) {
            me.btn_limpiar = Ext.create('Ext.Button', {
                text: me.textLimpiar,
                width: 120,
                textAlign: 'center',
                iconCls: 'cross',
                margin: 10,
                scope: this,
                handler: me.LimpiarFormulario

            });
            me.btn_guardar = Ext.create('Ext.Button', {
                text: me.textGuardar,
                width: 120,
                textAlign: 'center',
                iconCls: 'disk',
                margin: 10,

            });
            me.buttons = [me.btn_guardar, me.btn_limpiar];
        }
        this.layout.columns = this.columns;
        if (me.dockButtons) {
            me.dockedItems = [{
                xtype: 'toolbar',
                itemId: 'docked',
                dock: 'top',
                items: [
                    { xtype: 'button', itemId: 'docked_modificar', text: 'Modificar', iconCls: Constantes.ICONO_EDITAR },
                    { xtype: 'button', itemId: 'docked_comprobante', text: 'Comprobante', iconCls: Constantes.ICONO_IMPRIMIR },
                    { xtype: 'button', itemId: 'docked_eliminar', text: 'Eliminar', iconCls: Constantes.ICONO_BAJA }
                ]
            }];
        }
        this.callParent();
        //me.addDocked(me.encabezado, 'top');
    },
    BloquearFormulario: function (array) {
        var me = this;
        if (me.botones) {
            me.btn_guardar.hide();
            me.btn_limpiar.hide();
        }
        me.bloquearFormulario ? Funciones.BloquearFormulario(me, array) : me.getForm().reset();
    },
    BloquearFormularioReadOnly: function (array) {
        var me = this;
        if (me.botones) {
            me.btn_guardar.hide();
            me.btn_limpiar.hide();
        }
        Funciones.BloquearFormularioReadOnly(me, array);
    },
    DesbloquearFormulario: function (array, readOnly) {
        var me = this;
        if (me.botones) {
            me.btn_guardar.show();
            me.btn_limpiar.show();
        }
        me.bloquearFormulario ? Funciones.DesbloquearFormulario(me, array, readOnly) : me.getForm().reset();
    },
    LimpiarFormulario: function () {
        var me = this;
        me.getForm().reset();

    },
    CargarDatos: function (record, bloquear) {
        var me = this;
        me.record = record;
        me.getForm().reset();
        if(bloquear) 
           me.BloquearFormulario();
        me.getForm().loadRecord(record);
    },
    loadFormulario: function (controlador, accion, params) {
        var me = this;
        me.getForm().load({
            url: Constantes.HOST + '' + controlador + '/' + accion + '',
            params: params,
            failure: function (form, action) {
                console.log("No existe ningun dato")
            }
        });
    }
});