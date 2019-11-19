Ext.define("App.View.Sgaf.View.Principal", {
    extend: "Ext.panel.Panel",
    width: '100%',
    height: 680,
    frame: true,
    layout: 'border',
    defaults: {
        split: true
    },
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.Sgaf.View.GridImportarFactura', {
            region: 'center',
            width: '100%',

        });
   
        me.items = [me.grid];
   
    }


});