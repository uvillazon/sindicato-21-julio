Ext.define("App.View.Choferes.Forms.FormDocumento", {
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

        me.txt_detalle_foto = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Detalle",
            labelAlign: 'top',
            name: "DETALLE",
            width: defaultWidth,
            maxLength: 250
        });

        me.file_foto = Ext.create('Ext.form.field.File', {
            name: 'photo',
            fieldLabel: "Subir",
            labelAlign: 'top',
            allowBlank: false,
            anchor: '100%',
            buttonText: 'Seleccionar...'
        });

        me.fieldSet_foto = Ext.create('Ext.form.FieldSet', {
            checkboxToggle:true,
            title: 'Fotografía',
            collapsed: true,
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [me.txt_detalle_foto, me.file_foto]
        });

        me.txt_detalle_ci = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Detalle",
            labelAlign: 'top',
            name: "DETALLE",
            width: defaultWidth,
            maxLength: 250
        });

        me.file_ci = Ext.create('Ext.form.field.File', {
            name: 'ci',
            fieldLabel: "Subir",
            labelAlign: 'top',
            allowBlank: false,
            anchor: '100%',
            buttonText: 'Seleccionar...'
        });

        me.fieldSet_ci = Ext.create('Ext.form.FieldSet', {
            checkboxToggle: true,
            title: 'CI',
            collapsed: true,
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [me.txt_detalle_ci, me.file_ci]
        });

        me.txt_detalle_antecedente = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Detalle",
            labelAlign: 'top',
            name: "DETALLE",
            width: defaultWidth,
            maxLength: 250
        });

        me.file_antecedente = Ext.create('Ext.form.field.File', {
            name: 'antecedente',
            fieldLabel: "Subir",
            labelAlign: 'top',
            allowBlank: false,
            anchor: '100%',
            buttonText: 'Seleccionar...'
        });

        me.fieldSet_antecedente = Ext.create('Ext.form.FieldSet', {
            checkboxToggle: true,
            title: 'Antecedentes',
            collapsed: true,
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [me.txt_detalle_antecedente, me.file_antecedente]
        });

        me.txt_detalle_garantia = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Detalle",
            labelAlign: 'top',
            name: "DETALLE",
            width: defaultWidth,
            maxLength: 250
        });

        me.file_garantia = Ext.create('Ext.form.field.File', {
            name: 'garantia',
            fieldLabel: "Subir",
            labelAlign: 'top',
            allowBlank: false,
            anchor: '100%',
            buttonText: 'Seleccionar...'
        });

        me.fieldSet_garantia = Ext.create('Ext.form.FieldSet', {
            checkboxToggle: true,
            title: 'Garantía',
            collapsed: true,
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [me.txt_detalle_garantia, me.file_garantia]
        });

       

        me.items = [
                me.txt_id,
                me.txt_id_socio,
                me.txt_id_chofer,
                me.dat_fecha_presentacion,
                me.fieldSet_foto,
                me.fieldSet_ci,
                me.fieldSet_antecedente,
                me.fieldSet_garantia
        //me.txt_observacion
            ];
    }
});