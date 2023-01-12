Ext.define("App.View.DiasNoTrabajados.FormDeuda", {
    extend: "App.Config.Abstract.Form",
    columns: 2,
    record: '',
    title: 'Datos deuda',
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
        me.txt_nro_ingreso = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Deuda No Trabajado",
            name: "ID_DETALLE",
            readOnly: true

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Creacion",
            name: "FECHA_REG",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true
        });

        me.store_socio = Ext.create('App.Store.Socios.Socios');

        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Nro Movil",
            name: "ID_SOCIO_MOVIL",
            displayField: 'NRO_MOVIL',
            valueField: 'ID_SOCIO_MOVIL',
            store: me.store_socio,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        });
        me.txt_nor_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Movil",
            name: "NRO_MOVIL",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
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


        me.date_fecha_no_trabajado = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Dia No Trabjado",
            name: "FECHA_NO_TRABAJADO",
            decimalPrecision: 0,
            opcion : 'sin fecha',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });

        me.txt_num_vueltas = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro de Vueltas Recorrido",
            name: "CANT_RECORRIDO",
            width: 240,
            colspan: 1,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });

        me.txt_motivo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Motivo",
            name: "OBSERVACION",
            width: 480,
            colspan: 2
        });

        me.store_caja = Ext.create('App.Store.Cajas.Cajas');
        me.store_caja.setExtraParams(me.paramsStore);
        me.cbx_caja = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Caja",
            name: "ID_CAJA",
            displayField: 'NOMBRE',
            valueField: 'ID_CAJA',
            store: me.store_caja,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE} - {DESCRIPCION}" }
        });
        
        me.txt_moneda = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Moneda",
            name: "MONEDA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true

        });
        me.store_caja.load(function (record) {
            Ext.each(record, function (row, index) {
                console.log(index);
                console.log(row);
                if (row.get('ID_CAJA') === 16) {
                    me.cbx_caja.setValue(row);
                    me.txt_moneda.setValue(row.get('MONEDA'));
                }
                
            });

        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            hidden : true,
            name: "OBSERVACION_ANULACION",
            width: 480,
            colspan: 2,
            //maxLength: 500,
        });
        me.txt_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Deuda",
            name: "IMPORTE",
            width: 480,
            colspan: 2,
            value : '50',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });
        me.txt_estado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            value : 'NUEVO',
            width: 240,
            colspan: 2,
            readOnly : true
            //maxLength: 500,
        });
        me.items = [
           me.txt_nro_ingreso, me.date_fecha,
           me.cbx_socio, me.txt_nor_movil,
           me.txt_socio,
           me.date_fecha_no_trabajado , me.txt_num_vueltas,
           me.txt_motivo,
           me.cbx_caja, me.txt_moneda,
           me.txt_importe,
           me.txt_observacion,
           me.txt_estado
        ];
    },
    CargarComponentesConsulta: function () {
        var me = this;
       
        me.txt_nro_recibo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Deuda",
            name: "ID_DEUDA"

        });
        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
        });
        me.txt_concepto = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Motivo",
            name: "MOTIVO",
            width: 480,
            colspan: 2
        });

        me.txt_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Caja",
            name: "CAJA",

        });
        me.txt_moneda = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Moneda",
            name: "MONEDA",

        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            //maxLength: 500,
        });
        me.txt_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total BS",
            name: "IMPORTE",
            width: 480,
            colspan: 2

        });
        me.items = [
            me.txt_nro_recibo, me.date_fecha,
            me.txt_concepto,
            me.txt_caja, me.txt_moneda,
            me.txt_total,
            me.txt_observacion

        ];
    },
    cargarEventos: function () {
        var me = this;
        me.cbx_caja.on('select', function (cbx, record) {
            me.txt_moneda.setValue(record[0].get('MONEDA'));
        });
        me.cbx_socio.on('select', function (cbx, rec) {
            me.txt_socio.setValue(rec[0].get('NOMBRE_SOCIO'));
            me.txt_nor_movil.setValue(rec[0].get('NRO_MOVIL'));
        });
    },
    ImprimirRecibo: function (id) {

        var ruta = fn.ObtenerUrlReportPDF("ReporteIngreso", "ID_INGRESO=" + id);
        window.open(ruta);
    }
});
