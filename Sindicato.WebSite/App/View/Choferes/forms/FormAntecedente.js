Ext.define("App.View.Choferes.Forms.FormAntecedente", {
    config: {
        defaultWidth: 300,
        parent: ''
    },

    constructor: function (config) {

        this.initConfig(config);
        this.initComponent();
        return this;
    },

    initComponent: function () {

        var me = this.parent;
        var defaultWidth = this.defaultWidth;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_FAMILIAR",
            hidden: true
        });
        me.txt_id_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_SOCIO",
            hidden: true
        });
        me.txt_id_chofer = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_CHOFER",
            hidden: true
        });

        me.dat_fecha_presentacion = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "Fecha Presentacón",
            name: "FECHA_PRESENTACION",
            width: defaultWidth,
            afterLabelTextTpl: Constantes.REQUERIDO,
            value: new Date(),
            allowBlank: false
        });

        me.store_tipo_doc = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipo_doc.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_DOC'));
        me.cbx_tipo_doc = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo Doc.",
            name: "TIPO_DOC",
            width: defaultWidth,
            store: me.store_tipo_doc,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.txt_descripcion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Descripción",
            name: "DESCRIPCION",
            width: defaultWidth,
            maxLength: 250
        });

        me.file_doc = Ext.create('Ext.form.field.File', {
            name: 'documento',
            fieldLabel: "Subir",
            allowBlank: false,
            buttonText: 'Seleccionar...'
        });


        me.items = [
                me.txt_id,
                me.txt_id_socio,
                me.txt_id_chofer,
                me.dat_fecha_presentacion,
                me.cbx_tipo_doc,
                me.txt_descripcion,
                me.file_doc
            ];
    }
});