Ext.define('App.View.Choferes.ImageField', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.imagefield',
    name: 'IMAGE',
    idFile: '_imageFile',
    width: 150,
    layout: 'anchor',
    initComponent: function () {
        var me = this;
        me.fileImagen = Ext.create('Ext.form.field.File', {
            id: me.idFile,
            hidden: true,
            name: me.name,
            anchor: '100%',
            buttonText: '...'
        });

        me.previewImage = Ext.create('Ext.Img', {
            id: me.idFile + '-preview',
            src: '/Content/images/no_photo.jpg',
            margin: '5 5 5 5',
            width: '100%'
        });

        me.items = [me.previewImage, me.fileImagen]

        me.fileImagen.on('change', function (fileInput, value) {
            me.changeImage();
        });

        me.callParent();
    },
    changeImage: function () {
        var me = this;
        var reader = new FileReader();
        var fileInput = document.getElementById(me.idFile + "-button-fileInputEl");
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = function (evt) {
            //var img = document.getElementById(me.previewImage.getId());
            //simg.src = evt.target.result;
            me.changeImagen(evt.target.result);
        }
    },
    changeImagen: function (src) {
        this.previewImage.setSrc(src);
    },
    modificar: function (modificar) {
        this.fileImagen.setVisible(modificar);
    }

});

