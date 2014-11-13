Ext.define("App.Config.Abstract.Window", {
    extend: "Ext.Window",
    layout: 'fit',
    //width: 550,
    //height: 390,
    maxWidth: Constantes.MAXANCHO,
    maxHeight: Constantes.MAXALTO,
    resizable: true,
    draggable: true,
    modal: true,
    closable: false,
    autoScroll: true,
    //iconCls: 'application_form_add',
    botones: true,
    y: 20,
    constrain: true,
    botones: false,
    mostrarBotonCerrar: false,
    btn3 : null,
    gridLoads : null,
    buttons: '',
    textGuardar: 'Guardar',
    textCerrar : 'Cerrar',
    initComponent: function () {
        var me = this;
        if (!me.botones) {
            if (this.buttons == '') {
                this.buttons = [{
                    xtype: 'button',
                    text: me.textCerrar,
                    iconCls: 'cross',
                    minHeight: 27,
                     scope : this,
                    minWidth: 80,
                    hidden : me.mostrarBotonCerrar,
                    handler: me.CerrarVentana

                }
                ];
            }
            else {
                this.buttons = this.buttons;
            }
        }
        else {
            this.btn_cerrar = Ext.create('Ext.Button', {
                text: me.textCerrar,
                minHeight: 27,
                minWidth: 80,
                itemId: 'btn_cerrar',
                textAlign: 'center',
                //margin: 10,
                iconCls: 'cross',
                 scope : this,
                hidden: me.mostrarBotonCerrar,
                handler: me.CerrarVentana
            });
            this.btn_guardar = Ext.create('Ext.Button', {
                text: me.textGuardar,
                minHeight: 27,
                minWidth: 80,
                itemId: 'btn_guardar',
                textAlign: 'center',
                iconCls: 'disk',
                //margin: 10,

            });
            if (this.btn3 != null) {
                this.btn3.removeCls("botones");
            }
            this.buttons = [this.btn_guardar, this.btn3,this.btn_cerrar];
        }
        //       var me = this;
        //        me.on('minimize', me.minimizar,this);
        this.callParent(arguments);
    },
    CerrarVentana: function () {
        var me = this;
        me.hide();
        if (me.gridLoads != null) {
            for (i = 0 ; i < me.gridLoads.length ; i++) {
                me.gridLoads[i].getStore().load();
            }
        }
        //this.up('window').hide();
    }
});