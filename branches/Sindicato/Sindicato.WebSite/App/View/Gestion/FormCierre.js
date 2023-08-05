Ext.define("App.View.Gestion.FormCierre", {
    extend: "App.Config.Abstract.Form",
    columns: 3,
    record: '',
    title: 'Datos Cierre de Gestion',
    modoConsulta: false,
    initComponent: function () {
        var me = this;
        if (me.modoConsulta) {
            me.CargarComponentesForm();
            me.txt_codigo.setVisible(false); 
            me.txt_descripcion.setVisible(false);
        }
        else {
            me.CargarComponentesForm();
            me.CargarEventos();
        }
        this.callParent(arguments);
    },
    CargarEventos: function () {
        var me = this;
        
    },
    CargarComponentesForm: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            name: "ID_GESTION"

        });
        me.txt_gestion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Gestion",
            //width: 480,
            name: "CODIGO",
            readOnly: true,
            //colspan: 2,

        });
        me.txt_descripcion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Descripcion",
            width: 480,
            name: "DESCRIPCION",
            readOnly: true,
            colspan: 2,

        });
        me.date_fecha_ini = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Ini",
            maximo: 'Sin Maximo',
            name: "FECHA_INI",
            readOnly: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.date_fecha_fin = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Fin",
            opcion: 'sin fecha',
            readOnly: true,
            //maximo: 'Sin Maximo',
            name: "FECHA_FIN",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            colspan : 2
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION_CIERRE",
            width: 720,
            colspan: 3,
            allowBlank: false,
            maxLength: 255,
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            //width: 480,
            name: "ESTADO",
            readOnly: true,
            colspan: 3,
            value: 'ACTIVO'

        });
        me.txt_saldo_efectivo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Total Disponible",
            //width: 480,
            name: "DISPONIBLE",
            readOnly: true,

        });
        me.txt_total_cobrar = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Total Por Cobrar",
            //width: 480,
            name: "POR_COBRAR",
            readOnly: true,

        });

        me.txt_total_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Total",
            //width: 480,
            name: "TOTAL",
            colspan : 1,
            readOnly: true,

        });
        me.txt_codigo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Codigo Nueva Gestion",
            //width: 480,
            name: "CODIGO_NUEVO",
            allowBlank: false,
            //colspan: 2,

        });

        me.txt_descripcion = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Desc. Nueva Gestion",
            width: 480,
            name: "DESCRIPCION_NUEVA_GESTION",
            allowBlank: false,
            colspan: 2,

        });
        me.gridDetalle = Ext.create("App.View.Gestion.GridDetalles", { colspan: 3, width: 700, cargarStore: false, height: 250 });
        me.items = [
            me.txt_id,
            me.txt_gestion ,me.txt_descripcion,
            me.date_fecha_ini, me.date_fecha_fin,
            me.txt_observacion,
            me.txt_saldo_efectivo, me.txt_total_cobrar, me.txt_total_total,
            me.txt_estado,
            me.txt_codigo ,me.txt_descripcion,
            me.gridDetalle
        ];
    },
    CargarComponentes: function () {
        var me = this;
    },

    generarCierreGestion: function () {
        var me = this;
    
        me.setLoading(true);
        fn.getRequest("Cierres", "GenerarCierreGestion", "POST", {  }).then({
            success: function (res) {
                console.log(res);
                me.gridDetalle.getStore().setExtraParams({ ID_GESTION: res.id });
                me.gridDetalle.getStore().load();
                fn.loadRecordCmp(me, res.data);
                
            },
            failure: function (errorMessage) {
                Ext.Msg.alert("Error", errorMessage, function () {
                    cbx.reset();
                });
            }
        }).always(function () {
            return me.setLoading(false);
        });
    },
    isValid: function () {
        var me = this;
        if (me.getForm().isValid()) {
            if (me.gridDetalle.getStore().count() > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },
    convertirJson: function () {
        var me = this;
        var modified = me.gridDetalle.getStore().data; //step 1
        var recordsToSend = [];
        if (!Ext.isEmpty(modified)) {
            console.dir(modified);
            Ext.each(modified.items, function (record) { //step 2
                recordsToSend.push(Ext.apply(record.data));
            });
            recordsToSend = Ext.JSON.encode(recordsToSend);
            return recordsToSend;
        }
        else {
            return false;
        }

    },
});
