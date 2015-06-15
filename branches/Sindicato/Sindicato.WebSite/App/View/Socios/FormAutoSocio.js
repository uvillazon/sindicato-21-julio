Ext.define("App.View.Socios.FormAutoSocio", {
    extend: "App.Config.Abstract.Form",
    //    title: "Datos de Orden de Trabajo",gertertertert
    opcion: '',
    tipo : '',
    initComponent: function () {
        var me = this;
        switch (me.opcion) {
            case "FormAutoPrincipal":
                me.CargarFormAutoPrincipal();
                break;
            default:
                break;
        }
        this.callParent(arguments);
    },
    CargarFormAutoPrincipal: function () {
        var me = this;
        me.id_socio = Ext.widget('hiddenfield', {
            name: 'ID_SOCIO_MOVIL',
        });
        me.dias = Ext.widget('hiddenfield', {
            name: 'DIAS',
            value: Constantes.CONFIG_DIAS_AUTOS_REEMPLAZO
        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombres Socio",
            name: "NOMBRE_SOCIO",
            width: 480,
            readOnly : true,
            maxLength: 500,
            colspan: 2,
        });
        me.store_autos = Ext.create('App.Store.Autos.Autos');
        me.store_autos.setExtraParams({ codigo: 'AutosSinSocios' });
        me.cbx_auto = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Automovil",
            name: "ID_AUTO",
            valueField : 'ID_AUTO',
            displayField: 'AUTO',
            store: me.store_autos,
            colspan: 2,
            width: 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "Placa :{PLACA} - {MARCA}/{MODELO}/{COLOR}" }
        });
        me.dat_fecha_alta = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "Fecha Alta",
            name: "FECHA_ALTA",
            width: 240,
            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_descripcion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Motivo",
            name: "MOTIVO_ALTA",
            width: 480,
            colspan: 2,
            maxLength: 500,
        });
        me.txt_tipo = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo",
            name: "TIPO",
            width: 480,
            readOnly: true,
            value : me.tipo,
            colspan: 2,
        });
        me.label_tipo = Ext.create("Ext.form.Label", {
            text: me.tipo === 'PRINCIPAL' ? 'Si existe un auto de tipo PRINCIPAL asociado al socio. El Sistema automaticamente lo pondra en estado INACTIVO ' : 'Si existe un auto de tipo REEMPLAZO asociado al socio. El Sistema automaticamente lo pondra en estado INACTIVO con validez de ' + Constantes.CONFIG_DIAS_AUTOS_REEMPLAZO + ' Dias',
            width: 480,
            cls: 'labelRecomendacion'
        });
        me.items = [
            me.id_socio,
            me.dias,
            me.txt_nombre,
            me.cbx_auto,
            me.dat_fecha_alta,
            me.txt_descripcion,
            me.txt_tipo,
            me.label_tipo
        ];
            
    },
});
