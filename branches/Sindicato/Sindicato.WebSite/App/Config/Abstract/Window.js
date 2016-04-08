Ext.define("App.Config.Abstract.Window", {
    extend: "Ext.Window",
    layout: 'fit',
    maxWidth: Constantes.MAXANCHO,
    maxHeight: Constantes.MAXALTO - 20,
    //minWidth: 300,
    //minHeight: 300,
    resizable: false,
    //itemCls: Ext.baseCSSPrefix + 'window-item2',
    draggable: true,
    modal: true,
    closable: false,
    autoScroll: true,
    //maximizable : true,
    //iconCls: 'application_form_add',
    botones: true,
    y: 20,
    constrain: true,
    botones: false,
    mostrarBotonCerrar: false,
    btn3: null,
    gridLoads: null,
    buttons: null,
    textGuardar: 'Guardar',
    textCerrar: 'Cerrar',
    destruirWin: true,
    initComponent: function () {
        var me = this;
        if (!me.botones) {
            if (this.buttons == null) {
                this.btn_cerrar = Ext.create('Ext.Button', {
                    text: me.textCerrar,
                    minHeight: 27,
                    minWidth: 80,
                    itemId: 'btn_cerrar',
                    textAlign: 'center',
                    //margin: 10,
                    iconCls: 'cross',
                    scope: this,
                    hidden: me.mostrarBotonCerrar,
                    handler: me.CerrarVentana
                });
                this.buttons = [this.btn_cerrar];
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
                scope: this,
                handler: me.CerrarVentana
                //handler: function () {
                //    this.up('window').hide();


                //}

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
            this.buttons = [this.btn_guardar, this.btn3, this.btn_cerrar];
        }
        //       var me = this;
        //        me.on('minimize', me.minimizar,this);
        //me.on('afterrender', function (x, s) {
        //    //alert(me.getWidth() + "  " + me.maxWidth);
        //    //alert(me.getHeight() + "  " + me.maxHeight);
        //    //if (me.getWidth() > me.maxWidth) {
        //    //    alert("entro");
        //    //    me.height = me.maxHeight + 1;
        //    //}
        //    //if( me.getHeight() > me.maxHeight){
        //    //    //alert("entro231");
        //    //    //me.height = 200;
        //    //    me.setHeight(220);
        //    //    me.setWidth(220);
        //    //    me.updateLayout({
        //    //        isRoot: false
        //    //    });
        //    //}
        //    me.setSize(200, 200);
        //    //alert(me.getWidth());
        //});
        this.callParent(arguments);
        //me.on('afterrender', function (x, s) {
        //alert(me.getWidth() + "  " + me.maxWidth);
        //alert(me.getHeight() + "  " + me.maxHeight);
        //if (me.getWidth() > me.maxWidth) {
        //    alert("entro");
        //    me.height = me.maxHeight + 1;
        //}
        //if( me.getHeight() > me.maxHeight){
        //    //alert("entro231");
        //    //me.height = 200;
        //    me.setHeight(220);
        //    me.setWidth(220);
        //    me.updateLayout({
        //        isRoot: false
        //    });
        //}
        //me.setSize(200, 200);
        //me.maxWidth = me.getWidth() - 1;
        //me.maxHeight = me.getHeight() - 1;
        //alert(me.getWidth() + '  -  ' + me.getHeight() + 'MAX ' + me.maxWidth + '  -  ' + me.maxHeight);
        //me.maxWidth = me.getWidth() - 1;
        //});

    },
    CerrarVentana: function () {
        var me = this;
        !me.destruirWin ? me.hide() : me.close();
        //me.hide();
        if (me.gridLoads != null) {
            for (i = 0 ; i < me.gridLoads.length ; i++) {
                me.gridLoads[i].getStore().load();
            }
        }
        //this.up('window').hide();
    }
});