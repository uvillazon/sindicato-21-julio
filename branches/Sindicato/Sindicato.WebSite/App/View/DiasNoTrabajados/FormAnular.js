Ext.define("App.View.DiasNoTrabajados.FormAnular", {
    extend: "App.Config.Abstract.Form",
    columns: 2,
    record: '',
    title: 'Anular Deuda Socio Dia no trabajado',
    Eventos: true,
    modoConsulta: false,
    paramsStore: {},
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.txt_nro_deuda = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nro. Deuda",
            name: "ID_DETALLE",
            readOnly: true,
            colspan: 2

        });

        me.txt_observacion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Observacion",
            name: "OBSERVACION_ANULACION",
            width: 480,
            colspan: 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.items = [
           me.txt_nro_deuda,
           me.txt_observacion
        ];
    }
});
