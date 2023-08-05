Ext.define("App.View.Prestamos.FormPagoPrestamo", {
    extend: "App.Config.Abstract.Form",
    columns: 2,
    title: 'Pago de Prestamo',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        //me.cargarEventos();
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
            readOnly: true

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
            colspan : 1,

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
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly : true

        });

        me.txt_total_condonacion = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Total Condonacion",
            name: "TOTAL_CONDONACION",
            width: 480,
            colspan: 2,
            value : 0,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            readOnly: true,
            hidden : true

        });

        me.items = [
            me.txt_id_caja, me.txt_id_socio,,me.txt_id_prestamo,me.txt_id_plan,
            me.txt_nro_prestamo, me.date_fecha,
            me.txt_nor_movil, me.txt_nro_semana,
            me.txt_socio,
            me.txt_caja, me.txt_importe_prestamo,
            me.txt_importe_interes, me.txt_importe_total,
            me.txt_debe, me.txt_cancelado,
            me.txt_dias_retraso,me.txt_mora,
            me.txt_importe,
            me.txt_total_condonacion,
            me.txt_observacion
        ];



    }
});
