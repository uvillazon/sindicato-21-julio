Ext.define("App.View.Permisos.FormPermiso", {
    extend: "App.Config.Abstract.Form",
    columns: 1,
    record: '',
    title: 'Datos del Permiso',
    Eventos: true,
    modoConsulta: false,
    paramsStore: {},
    initComponent: function () {
        var me = this;
        if (!me.modoConsulta) {
            me.CargarComponentes();
            if (me.Eventos) {
                me.cargarEventos();
            }
        }
        else {
            me.CargarComponentesConsulta();
        }
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.store_socio = Ext.create('App.Store.Socios.Socios');

        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Nro Movil",
            name: "ID_SOCIO_MOVIL",
            displayField: 'NRO_MOVIL',
            valueField: 'ID_SOCIO_MOVIL',
            store: me.store_socio,
            textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        });
        me.txt_nor_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Movil",
            name: "NRO_MOVIL",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            //colspan: 2,
            //width: ,
            readOnly: true,
        });
        me.txt_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Socio",
            name: "SOCIO",
            colspan: 2,
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true,
        });
        me.store_motivo = Ext.create('App.Store.Listas.StoreLista');
        me.store_motivo.setExtraParam('ID_LISTA', Lista.Buscar('MOTIVO_PERMISO'));

        me.cbx_motivo = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Motivo Permiso",
            name: "MOTIVO",
            width: 480,
            colspan: 2,
            store: me.store_motivo,
            selectOnFocus: true
        });

        me.date_fecha_ini = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Desde",
            name: "FECHA_INI",
            //            readOnly : true,
            //colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            maximo: 'maximo'
        });
        me.date_fecha_fin = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Hasta",
            name: "FECHA_FIN",
            //            readOnly : true,
            //colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            maximo: 'maximo'
        });

        me.txt_cantidad = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Cant. Hojas Obligatorias",
            name: "CANT_HOJAS_OBLIG",
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            width: 480,
            maxLength: 500,
            colspan: 2,
            //afterLabelTextTpl: Constantes.REQUERIDO,
            //allowBlank: false
        });
        me.items = [
          me.cbx_socio, me.txt_nor_movil,
          me.txt_socio,
          me.cbx_motivo,
          me.date_fecha_ini, me.date_fecha_fin,
          me.txt_cantidad,
           me.txt_observacion
        ];
    },
    CargarComponentesConsulta: function () {
        var me = this;

        me.txt_nro_permiso = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Permiso",
            name: "ID_PERMISO"

        });
        me.txt_nro_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Movil",
            name: "NRO_MOVIL"
        });
        me.txt_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Socio",
            name: "SOCIO",
            width: 480,
            colspan: 2,

        });
        me.txt_motivo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Motivo",
            name: "MOTIVO",
            width: 480,
            colspan: 2,

        });

        me.date_fecha_ini = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Desde",
            name: "FECHA_INI",
            maximo: 'maximo'
        });
        me.date_fecha_fin = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Hasta",
            name: "FECHA_FIN",
            maximo: 'maximo'
        });

        me.txt_cantidad = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Cant. Hojas Obligatorias",
            name: "CANT_HOJAS_OBLIG",
            width: 480,
            colspan: 2,
        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO"
        });
        me.txt_login = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Usr. Responsable",
            name: "LOGIN_USR"
        });

        me.items = [
            me.txt_nro_permiso, me.txt_nro_movil,
            me.txt_socio,
            me.txt_motivo,
            me.date_fecha_ini, me.date_fecha_fin,
            me.txt_cantidad,
            me.txt_observacion,
            me.txt_estado, me.txt_login

        ];
    },
    cargarEventos: function () {
        var me = this;
        me.cbx_socio.on('select', function (cbx, record) {
            me.txt_nor_movil.setValue(record[0].get('NRO_MOVIL'));
            me.txt_socio.setValue(record[0].get('NOMBRE_SOCIO'));
        });
    },
});
