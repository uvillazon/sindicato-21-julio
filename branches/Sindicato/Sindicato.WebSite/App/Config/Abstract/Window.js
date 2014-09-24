Ext.define("App.Config.Abstract.Window", {
    extend: "Ext.Window",
    layout: 'fit',
    //width: 550,
    //height: 390,
    maxWidth: Constantes.MAXANCHO,
    maxHeight: Constantes.MAXALTO,
    resizable: true,
    draggable: false,
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
                    minWidth: 80,
                    hidden : me.mostrarBotonCerrar,
                    handler: function () {
                        //this.up('form').getForm().reset();
                        this.up('window').hide();
                        //this.up('window').maximize();
                        //this.maximize();
                        //this.toFront();
                    }

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
                hidden: me.mostrarBotonCerrar,
                handler: function () {
                    this.up('window').hide();


                }

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
    }
});