Ext.define("App.View.Choferes.Forms.FormFamiliar", {
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
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombres",
            name: "NOMBRE",
            width: defaultWidth,
            maxLength: 200,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_apellido_paterno = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Ap.Paterno",
            name: "APELLIDO_PATERNO",
            width: defaultWidth,
            maxLength: 200,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_apellido_materno = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Ap.Materno",
            name: "APELLIDO_MATERNO",
            width: defaultWidth,
            maxLength: 200,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
       
        me.dat_fecha_nac = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "Fecha Nacimiento",
            name: "FECHA_NAC",
            width: defaultWidth,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.store_parentesco = Ext.create('App.Store.Listas.StoreLista');
        me.store_parentesco.setExtraParam('ID_LISTA', Lista.Buscar('PARENTESCO'));
        me.cbx_parentesco = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Parentesco",
            name: "PARENTESCO",
            width: defaultWidth,
            store: me.store_parentesco,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        //        me.txt_observacion = Ext.create("App.Config.Componente.TextFieldBase", {
        //            fieldLabel: "Observaciones",
        //            name: "OBSERVACION",
        //            width: 480,
        //            colspan: 2,
        //            maxLength: 500
        //        });}

        me.num_ci = Ext.create("App.Config.Componente.NumberFieldBase", {
            name: "CI",
            width: 90,
            maxLength: 15,
            allowNegative: false,
            allowBlank: false,
            allowDecimals: false
        });
        me.store_expedido = Ext.create('App.Store.Listas.StoreLista');
        me.store_expedido.setExtraParam('ID_LISTA', Lista.Buscar('EXPEDIDO_CI'));
        me.cbx_expedido = Ext.create("App.Config.Componente.ComboBase", {
            name: "EXPEDIDO",
            width: 90,
            store: me.store_expedido,
            allowBlank: false,
            selectOnFocus: true
        });

        me.txt_ci = Ext.create('Ext.form.FieldContainer', {
            fieldLabel: 'CI',
            layout: 'hbox',
            allowBlank: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            items: [me.num_ci, me.cbx_expedido]
        });

        me.txt_direccion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Dirección",
            name: "DIRECCION",
            width: defaultWidth,
            maxLength: 200,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.txt_telefonos = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Teléfonos",
            name: "TELEFONO",
            width: defaultWidth,
            maxLength: 200,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.items = [
                me.txt_id,
                me.txt_id_socio,
                me.txt_id_chofer,
                me.dat_fecha_nac,
                me.cbx_parentesco,
                me.txt_nombre,
                me.txt_apellido_paterno,
                me.txt_apellido_materno,
                me.txt_ci,
                me.txt_direccion,
                me.txt_telefonos
        //me.txt_observacion
            ];
    }
});