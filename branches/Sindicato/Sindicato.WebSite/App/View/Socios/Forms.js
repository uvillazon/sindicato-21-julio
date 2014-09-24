Ext.define("App.View.Socios.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    icono : '',
    EventosForm : null,
    scope : null,
    val : 0,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormImagen") {
            me.CargarFormImagen();

        }
        else if (me.opcion == 'formFamiliar') {
            me.title = "Datos Familiares";
            me.CargarFormFamiliar();
        }
        else if (me.opcion == 'formResumen') {
            me.title = "Resumen";
            me.CargarFormResumen();
        }
        else if (me.opcion == "FormMovil"){
//            me.title = "E"
            me.CargarFormMovil();
        }
        else if(me.opcion == "FormSocio"){
            me.CargarFormSocio();
        }
        else if (me.opcion == "FormReporte"){
            me.CargarFormReporte();
        }
        
        this.callParent(arguments);
    },
    CargarFormImagen: function () {
        var me = this;
        me.scope = me.scope == null ? this : me.scope;
        me.changingImage = Ext.create('Ext.Img', {
            colspan : 2,
            src : Constantes.URLIMAGEN + 'id=' + me.val + '&tamano=300&TABLA=SD_SOCIOS'

        });
        me.items = [
        me.changingImage 
        ];
    },
    CargarFormReporte : function(){
        var me = this;
        me.dat_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
//            opcion: "sin fecha",
            fieldLabel: "Fecha",
            name: "fecha",
            width: 240,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.items = [me.dat_fecha];
    },
    ComponentesSocio : function(me){

        var me = me == null ? this : me;
        me.txt_id_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_SOCIO",
            hidden: true
        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombres",
            name: "NOMBRE",
            width: 480,
            colspan: 2,
            maxLength: 200,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_apellido_paterno = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Ap. Paterno",
            name: "APELLIDO_PATERNO",
            width: 240,
            maxLength: 200,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_apellido_materno = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Ap. Materno",
            name: "APELLIDO_MATERNO",
            width: 240,
            maxLength: 200,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.num_nro_licencia = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Lic.",
            name: "NRO_LICENCIA",
            width: 240,
            maxLength: 15,
            allowNegative: false,
            allowDecimals: false
        });
        me.store_categoria_lic = Ext.create('App.Store.Listas.StoreLista');
        me.store_categoria_lic.setExtraParam('ID_LISTA', Lista.Buscar('CATEGORIA_LIC'));
        me.cbx_categoria_lic = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Categoria Lic.",
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
            //            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_domicilio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Direccion Dom.",
            name: "DOMICILIO",
            width: 480,
            maxLength: 500,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            width: 480,
            maxLength: 500,
            colspan: 2,
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

        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            width: 240,
            maxLength: 20,
            readOnly : true
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
            fieldLabel: "Fecha Retiro",
            name: "FECHA_BAJA",
            width: 240,
            readOnly : true
//            colspan: 2
        });
        me.txt_telefono = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Telefonos",
            name: "TELEFONO",
            width: 480,
            colspan: 2,
            maxLength: 50
        });
        me.txt_celular = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Celular",
            name: "CELULAR",
            width: 240,
            maxLength: 50
        });
    },
    CargarFormSocio : function(){
        var me = this;
        me.ComponentesSocio();
        me.items = [
           
            me.txt_id_socio,
            me.num_ci,
            me.cbx_expedido,
            me.txt_nombre,
            me.txt_apellido_paterno,
            me.txt_apellido_materno,
            me.cbx_estado_civil,
            me.num_nro_licencia,
            me.cbx_categoria_lic,

            me.dat_fecha_nac,
            me.txt_estado,
            me.dat_fecha_ingreso,
            me.dat_fecha_baja,
            me.txt_telefono,
            me.txt_celular,
            me.txt_domicilio,

            me.txt_observacion

        ];
        
    },
    CargarImagen : function(id){
        var me = this;
        var originalSrc =   Constantes.URLIMAGEN + 'id=' + id + '&tamano=200&TABLA=SD_CHOFERES';
        me.changingImage.setSrc(originalSrc);
    },
    CargarFormMovil : function (){
        var me = this;
        me.txt_id_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_SOCIO",
            hidden: true
        });
        me.txt_id_socio_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_SOCIO_MOVIL",
            hidden: true
        });
        me.txt_id_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_MOVIL",
            hidden: true
        });
        me.num_nro_movil = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Movil",
            name: "NRO_MOVIL",
            colspan : 2
           
        });
         me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombres Socio",
            name: "NOMBRE",
            width: 480,
            maxLength: 500,
            colspan: 2,
        });
        me.store_tipo = Ext.create('App.Store.Listas.StoreLista');
        me.store_tipo.setExtraParam('ID_LISTA', Lista.Buscar('TIPO_MOVIL'));
        me.cbx_tipo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Tipo Movil.",
            name: "TIPO_MOVIL",
            width: 240,
            store: me.store_tipo,
            allowBlank: false
        });
        me.dat_fecha_ingreso = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "Fecha Ingreso",
            name: "FECHA_ALTA",
            width: 240,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_descripcion = Ext.create("App.Config.Componente.TextAreaBase", {
                fieldLabel: "Descripcion",
                name: "DESCRIPCION",
                width: 480,
                colspan : 2,
                maxLength: 500,
            });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan : 2,
            maxLength: 500,
        });
        me.items = [
            me.txt_id_socio_movil,
            me.txt_id_socio,
            me.txt_id_movil,
            me.num_nro_movil,
            me.txt_nombre,
            me.cbx_tipo,
            me.dat_fecha_ingreso,
            me.txt_descripcion,
            me.txt_observacion
        ];
    },
    CargarFormFamiliar : function(){
        var me = this;
            me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
                name: "ID_FAMILIAR",
                hidden: true,
            });
            me.txt_id_socio = Ext.create("App.Config.Componente.TextFieldBase", {
                name: "ID_SOCIO",
                hidden: true,
            });
            me.txt_id_chofer = Ext.create("App.Config.Componente.TextFieldBase", {
                name: "ID_CHOFER",
                hidden: true,
            });
            me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
                fieldLabel: "Nombres",
                name: "NOMBRE",
                width: 480,
                colspan : 2,
                maxLength: 200,
                afterLabelTextTpl: Constantes.REQUERIDO,
                allowBlank: false,
            });
            me.txt_apellido_paterno = Ext.create("App.Config.Componente.TextFieldBase", {
                fieldLabel: "Ap.Paterno",
                name: "APELLIDO_PATERNO",
                width: 240,
                maxLength: 200,
                afterLabelTextTpl: Constantes.REQUERIDO,
                allowBlank: false,
            });
            me.txt_apellido_materno = Ext.create("App.Config.Componente.TextFieldBase", {
                fieldLabel: "Ap.Materno",
                name: "APELLIDO_MATERNO",
                width: 240,
                maxLength: 200,
                afterLabelTextTpl: Constantes.REQUERIDO,
                allowBlank: false,
            });
            me.num_ci = Ext.create("App.Config.Componente.NumberFieldBase", {
                fieldLabel: "Carnet Identidad",
                name: "CI",
                width: 240,
                maxLength: 15,
                allowNegative: false,
                allowDecimals: false,
            });
            me.store_expedido = Ext.create('App.Store.Listas.StoreLista');
            me.store_expedido.setExtraParam('ID_LISTA', Lista.Buscar('EXPEDIDO_CI'));
            me.cbx_expedido = Ext.create("App.Config.Componente.ComboBase", {
                fieldLabel: "Expedido",
                name: "EXPEDIDO",
                width: 240,
                store : me.store_expedido,
                selectOnFocus: true,
            });
            me.dat_fecha_nac = Ext.create("App.Config.Componente.DateFieldBase", {
                opcion :"sin fecha",
                fieldLabel: "Fecha Nacimiento",
                name: "FECHA_NAC",
                width: 240,
                afterLabelTextTpl: Constantes.REQUERIDO,
                allowBlank: false,
            });
            me.store_parentesco = Ext.create('App.Store.Listas.StoreLista');
            me.store_parentesco.setExtraParam('ID_LISTA', Lista.Buscar('PARENTESCO'));
            me.cbx_parentesco = Ext.create("App.Config.Componente.ComboBase", {
                fieldLabel: "Parentesco",
                name: "PARENTESCO",
                width: 240,
                store : me.store_parentesco,
                selectOnFocus: true,
                afterLabelTextTpl: Constantes.REQUERIDO,
                allowBlank: false,
            });
            me.txt_observacion = Ext.create("App.Config.Componente.TextFieldBase", {
                fieldLabel: "Observaciones",
                name: "OBSERVACION",
                width: 480,
                colspan : 2,
                maxLength: 500,
            });
            
            me.items = [
                me.txt_id,
                me.txt_id_socio,
                me.txt_id_chofer,
                me.txt_nombre,
                me.txt_apellido_paterno,
                me.txt_apellido_materno,
                me.num_ci,
                me.cbx_expedido,
                me.dat_fecha_nac,
                me.cbx_parentesco,
                me.txt_observacion,
            ];
    }
});
