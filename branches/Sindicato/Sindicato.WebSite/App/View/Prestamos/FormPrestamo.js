Ext.define("App.View.Prestamos.FormPrestamo", {
    extend: "App.Config.Abstract.Form",
    columns: 3,
    record: '',
    Eventos : true,
    rec_tipo_prestamo : null,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        if (me.Eventos) {
            me.cargarEventos();
        }
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        
        me.txt_id_socio_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            name: "ID_SOCIO_MOVIL"

        });


        me.store_tipo = Ext.create('App.Store.Prestamos.TiposPrestamos');

        me.cbx_tipos = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Tipo Prestamo",
            name: "ID_TIPO_PRESTAMO",
            displayField: 'NOMBRE',
            valueField: 'ID_TIPO',
            store: me.store_tipo,
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "{NOMBRE} - {CAJA}  , Moneda : {MONEDA}" }
        });
       

        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Prestamo",
            name: "FECHA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly : true
        });

        me.store_socio = Ext.create('App.Store.Socios.Socios');
        me.cbx_socio = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Movil",
            name: "ID_SOCIO_MOVIL_1",
            displayField: 'NRO_MOVIL',
            valueField: 'ID_SOCIO_MOVIL',
            store: me.store_socio,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            colspan: 3,
            width: 480,
            textoTpl: function () { return "Nro Movil :{NRO_MOVIL} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        });
        me.txt_nro_movil = Ext.create("App.Config.Componente.TextFieldBase", {
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

        
        me.txt_caja = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Caja",
            name: "CAJA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true

        });
        me.txt_moneda = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Moneda",
            name: "MONEDA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true

        });
        me.txt_tipo_interes = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo Interes",
            name: "TIPO_INTERES",
            readOnly: true

        });
        me.txt_interes = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Interes%",
            name: "INTERES",
            readOnly: true

        });
        me.txt_interes_fijo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Interes fijo",
            name: "INTERES_FIJO",
            readOnly: true

        });
        me.txt_importe_minimo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Minimo",
            name: "IMPORTE_MINIMO",
            readOnly: true

        });
        me.txt_importe_maximo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Maximo",
            name: "IMPORTE_MAXIMO",
            readOnly: true

        });
        me.txt_importe_mora = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe p/mora",
            name: "MULTA_POR_MORA",
            readOnly: true

        });
        me.txt_nro_semanas = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro de Cuotas",
            name: "SEMANAS",
            readOnly: true

        });
        me.txt_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Prestamo",
            name: "IMPORTE_PRESTAMO",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });
        me.txt_importe_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total Prestamo",
            name: "IMPORTE_TOTAL_PRESTAMO",
            colspan : 2,
            readOnly: true

        });
        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observaciones",
            name: "OBSERVACION",
            width: 480,
            colspan: 3,
            maxLength: 500,
        });
        me.items = [
            me.txt_id_socio_movil,
            me.cbx_tipos, me.date_fecha,
            me.cbx_socio,
            me.txt_socio, me.txt_nro_movil,
            me.txt_caja, me.txt_moneda, me.txt_tipo_interes,
            me.txt_interes,me.txt_interes_fijo, me.txt_nro_semanas,
            me.txt_importe_minimo, me.txt_importe_maximo, me.txt_importe_mora,
            me.txt_importe,me.txt_importe_total,
            me.txt_observacion
        ];



    },
    cargarEventos: function () {
        var me = this;
        me.cbx_socio.on('select', function (cbx, rec) {
            me.txt_socio.setValue(rec[0].get('NOMBRE_SOCIO'));
            me.txt_nro_movil.setValue(rec[0].get('NRO_MOVIL'));
            me.txt_id_socio_movil.setValue(rec[0].get('ID_SOCIO_MOVIL'));
        });
        me.cbx_tipos.on('select', function (cbx, rec) {
            me.getForm().loadRecord(rec[0]);
            me.rec_tipo_prestamo = rec[0];
            me.txt_importe.reset();
            me.txt_importe_total.reset();
        });
        me.txt_importe.on('change', function (num, newvalue, oldvalue) {
            if (me.rec_tipo_prestamo === null) {
                Ext.Msg.alert("Aviso", "No puede registrar el importe sin seleccionar el tipo de prestamo", function () {
                    num.reset();
                });
            }
            else {
                var valor = num.getValue();
                if ( valor <= me.txt_importe_maximo.getValue()) {

                    if (me.rec_tipo_prestamo.get('TIPO_INTERES') === 'INTERES SEMANAL') {
                        var total = (num.getValue() * (me.rec_tipo_prestamo.get('INTERES') / 100)) + num.getValue();
                        me.txt_importe_total.setValue(total);
                    }
                    else if (me.rec_tipo_prestamo.get('TIPO_INTERES') === 'INTERES MENSUAL') {
                        var total = (me.txt_nro_semanas.getValue() * num.getValue() * (me.rec_tipo_prestamo.get('INTERES') / 100)) + num.getValue();
                        me.txt_importe_total.setValue(total);
                    }
                    else {
                        var total = num.getValue() + me.rec_tipo_prestamo.get('INTERES_FIJO');
                        me.txt_importe_total.setValue(total);
                    }
                }
                else {
                    Ext.Msg.alert("Aviso", "No puede Sobrepasar el Limite", function () {
                        num.reset();
                    });
                }
            }
        });
       
    },
});
