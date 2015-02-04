Ext.define("App.View.Choferes.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    icono: '',
    EventosForm: null,
    scope: null,
    val: 0,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormImagen") {
            me.CargarFormImagen();
        }
        else if (me.opcion == 'formResumen') {
            me.title = "Resumen";
            me.CargarFormResumen();
        }
        else if (me.opcion == 'formFamiliar') {
            me.title = "Familiar";
            me.CargarFormFamiliar();
        }
        else if (me.opcion == 'formDocumento') {
            me.title = "Documento";
            me.CargarFormDocumento();
        }
        else if (me.opcion == 'formAntecedente') {
            me.title = "Antecedente";
            me.CargarFormAntecedente();
        }
        else if (me.opcion == 'formFondoAsalariado') {
            me.title = "Fondo Asalariado";
            me.CargarFormFondoAsalariado();
        }
        else if (me.opcion == "FormChofer") {
            me.CargarFormCofer();
        }
        else if (me.opcion == "FormImagen") {
            me.CargarFormImagen();

        }
        this.callParent(arguments);
    },
    CargarFormImagen: function () {
        var me = this;
        me.scope = me.scope == null ? this : me.scope;
        me.changingImage = Ext.create('Ext.Img', {
            colspan: 2,
            src: Constantes.URLIMAGEN + 'id=' + me.val + '&tamano=300&TABLA=SD_CHOFERES'

        });
        me.items = [
        me.changingImage
        ];
    },
    CargarImagen: function (id) {
        var me = this;
        var originalSrc = Constantes.URLIMAGEN + 'id=' + id + '&tamano=200';
        //        alert(originalSrc);
        me.changingImage.setSrc(originalSrc);
    },
    //    CargarFormImagen: function () {
    //        Ext.create('App.View.Choferes.Forms.FormImagen', { parent: this });
    //    },
    //    EventosForm : function(btn)
    //    {
    //        var me = this;
    //        switch (btn.getItemId()) {
    //            case "btn_Crear_imagen":
    //                me.BotonesSocio(false);
    //                break;
    //            default:
    //                Ext.Msg.alert("Aviso", "No Existe el botton");
    //        }
    //    },
    CargarFormResumen: function () {
        Ext.create('App.View.Choferes.Forms.FormResumen', { parent: this });
    },
    CargarFormFamiliar: function () {
        Ext.create('App.View.Choferes.Forms.FormFamiliar', { parent: this });
    },
    CargarFormDocumento: function () {
        Ext.create('App.View.Choferes.Forms.FormDocumento', { parent: this });
    },
    CargarFormAntecedente: function () {
        Ext.create('App.View.Choferes.Forms.FormAntecedente', { parent: this });
    },
    CargarFormFondoAsalariado: function () {
        Ext.create('App.View.Choferes.Forms.FormFondoAsalariado', { parent: this });
    },
    CargarFormImagen: function () {
        var me = this;
        me.scope = me.scope == null ? this : me.scope;
        me.changingImage = Ext.create('Ext.Img', {
            colspan: 2,
            src: Constantes.URLIMAGEN + 'id=' + me.val + '&tamano=300&TABLA=SD_SOCIOS'

        });
        me.items = [
        me.changingImage
        ];
    },
    ComponentesChofer: function (me) {
        var me = me == null ? this : me;
        me.num_nro_chofer = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Chofer",
            name: "NRO_CHOFER",
            width: 240,
            colspan: 3,
            maxLength: 7,
            allowNegative: false,
            allowDecimals: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre",
            name: "NOMBRE",
            width: 240,
            maxLength: 200,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_apellido_paterno = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Apellido Paterno",
            name: "APELLIDO_PATERNO",
            width: 240,
            maxLength: 200,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_apellido_materno = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Apellido Materno",
            name: "APELLIDO_MATERNO",
            width: 240,
            maxLength: 200,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.num_nro_licencia = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Licencia",
            name: "NRO_LICENCIA",
            width: 240,
            maxLength: 15,
            allowNegative: false,
            allowDecimals: false
        });
        me.store_categoria_lic = Ext.create('App.Store.Listas.StoreLista');
        me.store_categoria_lic.setExtraParam('ID_LISTA', Lista.Buscar('CATEGORIA_LIC'));
        me.cbx_categoria_lic = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Categoria Licencia",
            name: "CATEGORIA_LIC",
            width: 240,
            store: me.store_categoria_lic,
            selectOnFocus: true
        });
        me.num_ci = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Carnet Identidad",
            name: "CI",
            width: 240,
            maxLength: 15,
            allowNegative: false,
            allowDecimals: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.store_expedido = Ext.create('App.Store.Listas.StoreLista');
        me.store_expedido.setExtraParam('ID_LISTA', Lista.Buscar('EXPEDIDO_CI'));
        me.cbx_expedido = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Expedido",
            name: "EXPEDIDO",
            width: 240,
            store: me.store_expedido,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.dat_fecha_nac = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "Fecha Nacimiento",
            name: "FECHA_NAC",
            width: 240,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.dat_fecha_ingreso = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "Fecha Ingreso",
            name: "FECHA_INGRESO",
            width: 240,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.dat_fecha_baja = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "Fecha Baja",
            name: "FECHA_BAJA",
            width: 240
            // colspan : 2,
        });
        me.txt_domicilio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Domicilio",
            name: "DOMICILIO",
            width: 480,
            colspan: 2,
            maxLength: 500,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan: 3,
            maxLength: 500,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.store_estado_civil = Ext.create('App.Store.Listas.StoreLista');
        me.store_estado_civil.setExtraParam('ID_LISTA', Lista.Buscar('ESTADO_CIVIL'));

        me.cbx_estado_civil = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Estado Civil",
            name: "ESTADO_CIVIL",
            width: 240,
            store: me.store_estado_civil,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.store_socio = Ext.create('App.Store.Socios.Socios');

        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Socio",
            name: "NOMBRE_SOCIO",
            displayField: 'NOMBRE',
            valueField: 'ID_SOCIO',
            store: me.store_socio,
            colspan: 2,
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO}" }
        });
        me.cbx_socio.on('select', function (cbx, rec) {
            
            me.id_socio.setValue(rec[0].get('ID_SOCIO'));
        });
        me.txt_telefono = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Telefonos",
            name: "TELEFONO",
            width: 240,
            maxLength: 50
        });
        me.txt_celular = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Celular",
            name: "CELULAR",
            width: 240,
            colspan: 2,
            maxLength: 50
        });
        me.dat_fecha_reg = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "FECHA_REG",
            name: "FECHA_REG",
            width: 240
        });
        me.txt_id_usr = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_USR",
            hidden: true
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            width: 240,
            value: 'ALTA',
            readOnly : true,
            maxLength: 20
        });
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_CHOFER",
            hidden: true
        });
        me.id_socio = Ext.widget('hiddenfield', {
            name: 'ID_SOCIO',
        });
    },
    CargarFormCofer: function () {
        var me = this;
        me.ComponentesChofer();
        me.items = [
          me.txt_id,
          me.id_socio,
        me.txt_id_usr,
        me.num_id,
        me.num_nro_chofer,
        me.txt_nombre,
        me.txt_apellido_paterno,
        me.txt_apellido_materno,
        me.num_nro_licencia,
        me.cbx_categoria_lic,
        me.num_ci,
        me.cbx_expedido,
        me.dat_fecha_nac,
        me.dat_fecha_ingreso,
        me.dat_fecha_baja,
        me.txt_domicilio,
         me.cbx_socio,
        me.cbx_estado_civil,

        me.txt_estado,
        me.txt_telefono,
        me.txt_celular,
        me.txt_observacion,

        ];
    }

});
