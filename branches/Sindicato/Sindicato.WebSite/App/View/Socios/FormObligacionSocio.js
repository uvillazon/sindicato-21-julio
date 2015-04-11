Ext.define("App.View.Socios.FormObligacionSocio", {
    extend: "App.Config.Abstract.Form",
    title: "Datos Obligaciones Socio",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.EventosForm();
        this.callParent(arguments);
    },
    EventosForm: function () {
        var me = this;
        me.btn_cambiar.on('click', function () {
            //abrir fomrulario
            var win = Ext.create("App.Config.Abstract.Window", { botones: true, title: 'Configuracion de Obligaciones' });
            var form = Ext.create("App.View.Socios.Forms", { opcion: 'FormCambioObligacion', columns: 1 });
            win.add(form);
            //alert(me.record.get('OBLIGACION'));
            form.loadRecord(me.record);
            win.show();
            win.btn_guardar.on('click', function () {
                Funciones.AjaxRequestWin("Socios", "GuardarObligacion", win, form, me.gridObligaciones, "Esta Seguro de Guardar Los Cambios", null, win);
            });
        });
        me.gridObligaciones.getSelectionModel().on('selectionchange', function (selModel, selections) {
            var disabled = selections.length === 0;
            me.record = disabled ? null : selections[0];
            Funciones.DisabledButton("btn_CambiarObligacion", me, disabled);
            if (!disabled) {
                me.gridKardex.getStore().setExtraParams({ ID_OBLIGACION: me.record.get('ID_OBLIGACION') });
                me.gridKardex.getStore().load();
            } else {
                me.gridKardex.getStore().setExtraParams({ ID_OBLIGACION: 0 });
                me.gridKardex.getStore().load();

            }
        });
    },

    CargarComponentes: function () {
        var me = this;
        me.id_socio = Ext.widget('hiddenfield', {
            name: 'ID_SOCIO',
        });
        me.txt_socio = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Socio",
            name: "NOMBRE_SOCIO",
            width: 550,
            colspan: 2,
            readOnly: true
        });
        me.gridObligaciones = Ext.create("App.View.Socios.Grids", { opcion: "GridObligaciones", height: 250, width: 160 });
        me.gridKardex = Ext.create("App.View.Socios.Grids", { opcion: "GridKardexObligaciones", height: 250, width: 400 });
        me.btn_cambiar = Funciones.CrearMenu('btn_CambiarObligacion', 'Modificar Obligacion', Constantes.ICONO_CREAR, null, null, me, null, true);
        me.items = [
           me.id_socio,
           me.txt_socio,
           me.gridObligaciones,
           me.gridKardex,
           me.btn_cambiar
        ];
    }
});