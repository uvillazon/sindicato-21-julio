Ext.define("App.View.Prestamos.FormMora", {
    extend: "App.Config.Abstract.Form",
    columns: 2,
    title: 'Registro de Mora',
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        //me.cargarEventos();
        this.callParent(arguments);
    },


    CargarComponentes: function () {
        var me = this;

        me.txt_id = Ext.widget('hiddenfield', {
            name: 'ID_MORA',
            value: Constantes.Usuario.ID_CAJA
        });
        me.txt_id_plan = Ext.widget('hiddenfield', {
            name: 'ID_PLAN'
        });


        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            colspan: 1,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            //readOnly: true
        });
        me.txt_nro_prestamo = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Prestamo",
            name: "ID_PRESTAMO",
            readOnly: true,
            colspan: 1,

        });

        me.txt_nro_semana = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Semana",
            name: "NRO_SEMANA",
            readOnly: true,
            colspan: 1,

        });

        me.txt_dias_retraso = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Dias Retraso",
            name: "DIAS_RETRASO",
            readOnly: true,
            colspan: 1,

        });



        me.txt_importe = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Importe a Cancelar",
            name: "IMPORTE_MORA",
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,

        });

        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION",
            width: 480,
            colspan: 2,
            //maxLength: 500,
        });

        me.items = [
            me.txt_id, me.txt_id_plan,
            me.date_fecha, me.txt_nro_prestamo,
            me.txt_nro_semana, me.txt_dias_retraso,
            me.txt_importe,
            me.txt_observacion
        ];



    }
});
