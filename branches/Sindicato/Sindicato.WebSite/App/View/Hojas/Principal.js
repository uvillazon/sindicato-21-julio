﻿Ext.define("App.View.Hojas.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        var paramsStore = {};
        var noLimpiar = "";
        if (Constantes.Usuario.ID_PARADA != 0) {
            paramsStore = { ID_PARADA: Constantes.Usuario.ID_PARADA };
            noLimpiar = ["ID_PARADA"];
        }
        me.grid = Ext.create('App.View.Ventas.GridVentas', {
            region: 'west',
            opcion: 'GridHojas',
            width: '50%',
            fbarmenu: me.toolbar,
            paramsStore: paramsStore,
            noLimpiar: noLimpiar,
            fbarmenuArray: ["btn_debitar", "btn_anular"]

        });
        //me.grid = Ext.create('App.View.Descuentos.GridDescuentos', {
        //    region: 'west',
        //    width: '50%',
        //    fbarmenu: me.toolbar,
        //    fbarmenuArray: ["btn_debitar", "btn_eliminar", "btn_editar", "btn_aprobar"]

        //});
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Venta', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        //me.btn_editar = Funciones.CrearMenu('btn_editar', 'Editar Descuento', Constantes.ICONO_EDITAR, me.EventosPrincipal, null, this, null, true);
        me.btn_eliminar = Funciones.CrearMenu('btn_anular', 'Anular Venta', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_eliminar]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.gridDetalles = Ext.create('App.View.Hojas.GridDetalles', {
            width: '100%',
            height: 400,
            cargarStore: false

        });
        me.form = Ext.create("App.View.Hojas.Forms", {
            opcion: 'formVentaConsulta',
            columns: 2,
            modoConsulta: true
        });
        me.form.BloquearFormulario();

        me.panel = Ext.create("Ext.panel.Panel", {
            region: 'center',
            width: '50%',
            items: [me.form, me.gridDetalles]
        });
        //        me.grid.bar.add(me.toolbar);
        me.items = [me.grid, me.panel];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];
        if (!disabled) {
            me.form.getForm().loadRecord(selections[0])
            me.gridDetalles.getStore().setExtraParams({ ID_VENTA: selections[0].get('ID_VENTA') });
            me.gridDetalles.getStore().load();
            //me.form.CargarDatos(selections[0]);

        }
        else {
            me.form.getForm().reset();
            me.gridDetalles.getStore().setExtraParams({ ID_VENTA: 0 });
            me.gridDetalles.getStore().load();

        }
    },

    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_crear":
                me.CrearHojasControl();
                break;
            case "btn_anular":
                if (me.record.get('ESTADO') == "NUEVO") {
                    Funciones.AjaxRequestGrid("VentaHojas", "AnularVenta", me.grid, "Esta seguro de Anular la Venta?", { ID_VENTA: me.record.get('ID_VENTA') }, me.grid, null);
                }
                else {
                    Ext.Msg.alert("Error", "Venta en estado Inapropiado.");
                }
                break;
           
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    CrearHojasControl: function () {
        var me = this;
        win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Venta' });
        form = Ext.create("App.View.Hojas.FormHoja", { botones: false });
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            if (form.isValid()) {
                Funciones.AjaxRequestWin("VentaHojas", "GuardarVenta", win, form, me.grid, "Esta Seguro de Guardar", { detalles: form.GridDetalleJson() }, win);
            }
            else {
                Ext.Msg.alert("Error", "Falta Compeltar Formulario. Al menos una hoja debe de venderse");
            }
        });
    },

});