Ext.define("App.View.Principal.PrincipalManual", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        var direccion = "http://elfpre02/sisman/manual/Manual-SISMAN.html";
        //me.html = '<iframe name="ManualUsuario"  frame" src="http://www.google.com" frameborder="0" width=100% height="100%" scrolling="yes"></iframe>';
        me.html = '<iframe name="' + direccion + 'frame" src="' + direccion + '" frameborder="0" width=100% height="100%" scrolling="yes"></iframe>'

    },
});
