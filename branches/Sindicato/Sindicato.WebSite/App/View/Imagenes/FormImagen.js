Ext.define("App.View.Imagenes.FormImagen", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    tipo : '',
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormImagen") {
            me.columns = 1,
            me.title = 'Formulario de Imagenes ' + me.tipo,
            me.CargarFormImagen();
        }
        else {
            alert("Seleccione alguna Opciones");
        }
        this.callParent(arguments);
    },
    CargarFormImagen: function () {
        var me = this;
        me.txt_desc = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: 'Descripción',
            name: 'DESCRIPCION',
            width: 480,
        });
        this.items = [me.txt_desc, {
            xtype: 'filefield',
            emptyText: 'Seleccione una Imagen o Archivo',
            fieldLabel: 'Archivo',
            name: 'URLIMAGEN',
            buttonText: 'Buscar Archivo.',
            buttonConfig: {
                iconCls: 'image_add'
            }

        }];
    },
    MostrarWindowImagen: function (tabla, id ,store) {
        var me = this;
        me.tabla = tabla;
        me.idTabla = id;
        me.storeImagen = store;
        if (me.winArchivo == null) {
            me.winArchivo = Ext.create("App.Config.Abstract.Window", { botones: true });
            me.winArchivo.add(me);
            me.winArchivo.btn_guardar.on('click', me.GuardarImagen, this);
            me.winArchivo.show();

        }
        else {
            me.winArchivo.show();

        }

    },
    GuardarImagen: function () {
        var me = this;
        Funciones.AjaxRequestWin("Imagenes", "GuardarImagen", me.winArchivo, me, me.storeImagen, 'Esta seguro de Guardar la Imagen?', { TABLA : me.tabla , ID_TABLA : me.idTabla }, me.winArchivo);
    }
});
