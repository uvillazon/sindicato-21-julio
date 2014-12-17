Ext.define("App.View.FondoEmergencia.ReporteFondoEmergencia", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 3,
    initComponent: function () {
        var me = this;
        me.CargarForm();
        this.callParent(arguments);
    },
    CargarForm: function (me) {

        var me = this;
        me.dat_fecha_ini = Ext.create("App.Config.Componente.DateFieldBase", {
            opcion: "sin fecha",
            fieldLabel: "Fecha Inicio",
            name: "FECHA_INI",
            width: 240,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.dat_fecha_fin = Ext.create("App.Config.Componente.DateFieldBase", {
            //opcion: "sin fecha",
            fieldLabel: "Fecha Fin",
            name: "FECHA_FIN    ",
            width: 240,
            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.num_deuda_desde = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Deuda Desde",
            name: "DEUDA_DESDE",
            width: 240,
            maxLength: 15,
            allowNegative: false,
            allowDecimals: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.num_deuda_hasta = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Deuda Hasta",
            name: "DEUDA_HASTA",
            width: 240,
            maxLength: 15,
            allowNegative: false,
            allowDecimals: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.panel = Ext.create("App.Config.ux.IFrame", {
            height: 750,
            width : 650,
        });
        me.panelMain = Ext.create("Ext.panel.Panel", {
            title: 'Reporte',
            colspan : 3,
            items: [me.panel]
        })
        me.btn_generar = Funciones.CrearMenu('btn_Normal', 'Generar', 'report', null, null, this);
        me.items = [
            me.dat_fecha_ini, me.dat_fecha_fin,
            me.num_deuda_desde, me.num_deuda_hasta,
            me.btn_generar,
            me.panelMain
        ];
    },
  
});
