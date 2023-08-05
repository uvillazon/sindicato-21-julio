Ext.define("App.View.Prestamos.FormRefinanciarPrestamo", {
    extend: "App.Config.Abstract.Form",
    columns: 3,
    title: 'Refinanciar Prestamo',
    rec_tipo_prestamo : null,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
    },
    cargarEventos: function () {
        var me = this;

        me.cbx_tipos.on('select', function (cbx, rec) {
            console.log('aaa');

            console.log(rec[0].data);
            Funciones.loadRecordCmp(me.setFieldRefinanciar, rec[0].data);
            me.rec_tipo_prestamo = rec[0];
            
            //me.getForm().loadRecord(rec[0]);
            //me.rec_tipo_prestamo = rec[0];
            //me.txt_importe.reset();
            //me.txt_importe_total.reset();
        });
        me.txt_importe_a_prestar.on('change', function (num, newvalue, oldvalue) {
            console.log("txt_importe_a_prestar");
            console.log(newvalue);
            console.log(oldvalue);
            if (me.rec_tipo_prestamo === null) {
                Ext.Msg.alert("Aviso", "No puede registrar el importe sin seleccionar el tipo de prestamo", function () {
                    num.reset();
                });
            }
            else {
                var valor = num.getValue();
                if (valor <= me.txt_importe_maximo.getValue()) {

                    if (me.rec_tipo_prestamo.get('TIPO_INTERES') === 'INTERES') {
                        var total = (num.getValue() * (me.rec_tipo_prestamo.get('INTERES') / 100)) + num.getValue();
                        me.txt_importe_total_a_prestar.setValue(total);
                        me.txt_importe_total_a_entregar.setValue(valor - me.txt_importe.getValue());
                    }
                    else {
                        var total = num.getValue() + me.rec_tipo_prestamo.get('INTERES_FIJO');
                        me.txt_importe_total_a_prestar.setValue(total);
                        me.txt_importe_total_a_entregar.setValue(valor - me.txt_importe.getValue());

                    }
                }
                else {
                    Ext.Msg.alert("Aviso", "No puede Sobrepasar el Limite", function () {
                        num.reset();
                        me.txt_importe_total_a_entregar.reset();
                    });
                }
            }
        });
    },
    CargarComponentes: function () {
        var me = this;

        me.txt_id_caja = Ext.widget('hiddenfield', {
            name: 'ID_CAJA',
            value: Constantes.Usuario.ID_CAJA
        });
        me.txt_id_socio = Ext.widget('hiddenfield', {
            name: 'ID_SOCIO_MOVIL',
            //value: Constantes.Usuario.ID_CAJA
        });

        me.txt_id_prestamo = Ext.widget('hiddenfield', {
            name: 'ID_PRESTAMO',
            //value: Constantes.Usuario.ID_CAJA
        });

        me.txt_id_plan = Ext.widget('hiddenfield', {
            name: 'ID_PLAN',
            //value: Constantes.Usuario.ID_CAJA
        });
        me.txt_nro_prestamo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Prestamo",
            name: "NUMERO",
            readOnly: true

        });

        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            colspan: 1,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true
        });

        me.txt_nor_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Movil",
            name: "NRO_MOVIL",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            colspan : 1,
            readOnly: true,
        });

        me.txt_nro_semana = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Semana",
            name: "NRO_SEMANA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            colspan: 1,
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

        
        me.txt_importe_prestamo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Prestamo",
            name: "IMPORTE_PRESTAMO",
            readOnly: true

        });
        me.txt_importe_interes = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Interes",
            name: "IMPORTE_INTERES",
            readOnly: true

        });
        me.txt_importe_total = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total",
            name: "IMPORTE_TOTAL",
            readOnly: true

        });

        me.txt_debe = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Debe",
            name: "DEBE",
            readOnly: true

        });

        me.txt_cancelado = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Cancelado",
            name: "TOTAL_CANCELADO",
            readOnly: true,
            colspan : 2,

        });

        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            //maxLength: 500,
        });

        me.txt_mora = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Mora",
            name: "MORA",
            readOnly: true,
            colspan : 2,

        });
        me.txt_dias_retraso = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Dias Retraso",
            name: "DIAS_RETRASO",
            readOnly: true,
            colspan: 1,

        });

        me.txt_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe a Cancelar + Mora",
            name: "CUOTA",
            width: 240,
            colspan: 1,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly : true

        });

        me.txt_total_condonacion = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Total Condonacion",
            name: "TOTAL_CONDONACION",
            width: 240,
            colspan: 2,
            value : 0,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true,
            hidden : true

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

        me.txt_nro_semanas = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro de Semenas",
            name: "SEMANAS",
            readOnly: true

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
            fieldLabel: "Interes",
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
      
        me.txt_importe_a_prestar = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe Prestamo",
            name: "IMPORTE_A_PRESTAR",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });
        

        me.txt_importe_total_a_prestar = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total Prestamo",
            name: "IMPORTE_TOTAL_A_PRESTAR",
            readOnly: true,
            colspan : 2

        });

        me.txt_importe_total_a_entregar = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Total a Entregar",
            name: "IMPORTE_TOTAL_A_ENTREGAR",
            readOnly: true,
            colspan : 2


        });
        me.txt_dias_espera_mora = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Dias Espera p/mora",
            name: "DIAS_ESPERA_MORA",
            readOnly: true

        });

       
        me.setFieldRefinanciar = Ext.create("Ext.form.FieldSet", {
            title: 'Prestamo Refinanciado',
            layout: {
                type: 'table',
                columns: 3,
                tdAttrs: {
                    valign: 'top'
                }
            },
            colspan : 3,
            
            items: [
                me.cbx_tipos, me.txt_nro_semanas,
                me.txt_caja, me.txt_moneda, me.txt_tipo_interes,
                me.txt_interes, me.txt_interes_fijo, me.txt_importe_minimo,
                me.txt_importe_maximo, me.txt_importe_mora, me.txt_dias_espera_mora,
                me.txt_importe_a_prestar, me.txt_importe_total_a_prestar,
                me.txt_importe_total_a_entregar
            ]
        });
        me.items = [
            me.txt_id_caja, me.txt_id_socio,,me.txt_id_prestamo,me.txt_id_plan,
            me.txt_nro_prestamo, me.date_fecha, me.txt_nor_movil,
            me.txt_socio, me.txt_nro_semana,
            me.txt_importe_prestamo, me.txt_importe_interes, me.txt_importe_total,
            me.txt_debe, me.txt_cancelado,
            me.txt_dias_retraso,me.txt_mora,
            me.txt_importe, me.txt_total_condonacion,
           
            me.setFieldRefinanciar,
            me.txt_observacion
        ];



    }
});
