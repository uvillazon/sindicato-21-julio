Ext.define("App.View.Moviles.FormMovil", {
    extend: "App.Config.Abstract.Form",
    title: "Datos del Movil",
    cargarStores: true,
    initComponent: function () {
        var me = this;
        if (me.cargarStores) {
            me.CargarStore();
            me.CargarComponentes();
        }
        else {
            me.CargarComponentes();
        }
        this.callParent(arguments);
    },
    CargarStore: function () {
        var me = this;
       
        me.store_area = Ext.create("App.Store.Listas.StoreLista");
        me.store_area.setExtraParam('ID_LISTA', Lista.Buscar('AREA'));

        me.store_unidad = Ext.create("App.Store.Listas.StoreLista");
        me.store_unidad.setExtraParam('ID_LISTA', Lista.Buscar('UNIDAD_REPORTA'));

    },
    CargarComponentes: function () {
        var me = this;
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_MOVIL",
            hidden: true,
        });
        me.txt_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Movil",
            name: "MOVIL",
            width: 480,
            maxLength: 30,
            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.cbx_unidad = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Unidad",
            name: "UNIDAD",
            width: 240,
            store: me.store_unidad,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.cbx_area = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Area",
            name: "AREA",
            width: 240,
            store: me.store_area,
            selectOnFocus: true,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
        me.chx_privilegios = Ext.create('Ext.form.CheckboxGroup', {
            fieldLabel: 'Responsabilidad',
            name : 'RESPONSABILIDAD',
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            columns: 2,
            colspan: 2,
            width: 480,
            disabledCls: 'DisabledClase1',
            vertical: true,
            items: [
                { boxLabel: 'Ejecuta', name: 'EJECUTA', inputValue: 'T', checked: true },
                //{ boxLabel: 'Ejecuta', name: 'EJECUTA', inputValue: 'T' },
                //{ boxLabel: 'Roporta', name: 'REPORTA', inputValue: 'T' },
//                { boxLabel: 'Energiza', name: 'ENERGIZA', inputValue: 'T' },
//                { boxLabel: 'Reporta Pendientes', name: 'REPOR_PEND', inputValue: 'T' },
////                { boxLabel: 'Asigna Pendientes', name: 'ASIGNA_PEND', inputValue:'T' },
//                { boxLabel: 'Ejecuta Pendientes', name: 'EJEC_PEND', inputValue: 'T' }
            ]

        });
        me.cbx_estado = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            width: 240,
            maxLength: 1,
            afterLabelTextTpl: Constantes.REQUERIDO,
            value: 'A',
            store : ["A","I"],
            allowBlank: false,
        });
        me.items = [
        me.txt_id,
        me.txt_movil,
        me.cbx_unidad,
        me.cbx_area,
        me.chx_privilegios,
        me.cbx_estado
    ];
        
    }
});
