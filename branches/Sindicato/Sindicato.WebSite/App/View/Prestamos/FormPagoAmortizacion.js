Ext.define("App.View.Prestamos.FormPagoAmortizacion", {
    extend: "App.Config.Abstract.Form",
    columns: 2,
    title: 'Pago Parcial / Total de Prestamo',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
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

        me.txt_id_plan = Ext.widget('hiddenfield', {
            name: 'ID_PLAN',
            //value: Constantes.Usuario.ID_CAJA
        });
        me.txt_nro_prestamo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Prestamo",
            name: "ID_PRESTAMO",
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

        
        me.txt_nro_semana = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Cuota",
            name: "NRO_SEMANA",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            colspan: 1,
            readOnly: true,
        });

        me.date_fecha_cuota = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Cuota",
            name: "FECHA_CUOTA",
            colspan: 1,
            readOnly: true,
            maximo : 'no tiene'
        });

        me.txt_nor_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Movil",
            name: "NRO_MOVIL",
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            colspan: 2,
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
            readOnly: true
        });
        me.txt_importe_prestamo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Importe Prestamo",
            name: "IMPORTE_PRESTAMO",
            readOnly: true

        });
        me.txt_saldo_capital = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Saldo Capital",
            name: "CAPITAL",
            colspan : 2,
            readOnly: true

        });
      
        me.txt_mora = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Mora",
            name: "MORA",
            readOnly: true,
            colspan: 1,

        });
        me.txt_dias_retraso = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Dias Retraso",
            name: "DIAS_RETRASO",
            readOnly: true,
            colspan: 1,

        });
        me.txt_total_interes = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Interes Calculados a la Fecha",
            name: "INTERES_CALCULADO_A_FECHA",
            width: 480,
            colspan: 2,
            value: 0,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true

        });

        me.txt_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe a Cancelar + Mora",
            name: "CUOTA",
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false

        });

        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            //maxLength: 500,
        });

        

     

        

        me.items = [
            me.txt_id_caja, me.txt_id_socio, , me.txt_id_plan,
            me.txt_nro_prestamo, me.date_fecha,
            me.txt_nro_semana, me.date_fecha_cuota,
            me.txt_nor_movil,
            me.txt_socio,
            me.txt_caja, me.txt_importe_prestamo,
            me.txt_saldo_capital,
            me.txt_dias_retraso, me.txt_mora,
            me.txt_total_interes,
            me.txt_importe,
            me.txt_observacion
        ];



    },
    cargarEventos: function () {
        var me = this;
       
        me.txt_importe.on('change', function (num, newvalue, oldvalue) {
            console.log('entroooo');
            var total = me.txt_saldo_capital.getValue() + me.txt_mora.getValue() + me.txt_total_interes.getValue();
            console.log(total);
            total = total.toFixed(1)
            console.log(total);
            console.log(newvalue);
            if (newvalue > total) {
                Ext.Msg.alert("Aviso", "No puede Pagar mas de lo Adeudado", function () {
                    num.reset();
                });
            }
        });

    },
});
