Ext.define("App.View.Choferes.Forms.FormImagen", {
    config: {
        parent: ''
    },

    constructor: function (config) {

        this.initConfig(config);
        this.initComponent();
        return this;
    },

    initComponent: function () {
        var me = this.parent;
        me.scope = me.scope == null ? this : me.scope;
        var changingImage = Ext.create('Ext.Img', {
            //            width : 240,
            //            height : 100,
            colspan: 2,
            src: 'http://localhost/extjs/extjs/docs/images/Ext.Img/Ext.Img.png'
            //            renderTo: Ext.getBody()
        });
        var buttonCrear = Funciones.CrearMenu('btn_Crear_imagen', 'Crear Socio', 'image_add', me.EventosForm, null, me.scope);
        var buttonVer = Funciones.CrearMenu('btn_Ver_imagen', 'Ver Imagen', 'image_link', me.EventosForm, null, me.scope);

        me.items = [
        changingImage,
        buttonCrear,
        buttonVer
        ];
    }
});