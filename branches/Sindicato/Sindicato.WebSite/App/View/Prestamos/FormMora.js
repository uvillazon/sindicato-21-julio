Ext.define("App.View.Prestamos.FormMora", {
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

        me.txt_id = Ext.widget('hiddenfield', {
            name: 'ID_MORA',
            value: Constantes.Usuario.ID_CAJA
        });
       

        me.date_fecha = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha",
            name: "FECHA",
            colspan: 1,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            //readOnly: true
        });

        me.date_fecha_limite = Ext.create("App.Config.Componente.DateFieldBase", {
            fieldLabel: "Fecha Limite Mora",
            name: "FECHA_LIMITE_PAGO_MORA",
            colspan: 1,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            //readOnly: true
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
            me.txt_id, 
            me.date_fecha,me.date_fecha_limite,
            me.txt_importe,
            me.txt_observacion
        ];



    }
});
