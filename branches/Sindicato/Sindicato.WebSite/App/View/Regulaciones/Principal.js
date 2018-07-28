﻿Ext.define("App.View.Regulaciones.Principal", {
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
        me.grid = Ext.create('App.View.Regulaciones.GridRegulaciones', {
            region: 'west',
            width: '50%',
            fbarmenu: me.toolbar,
            paramsStore: paramsStore,
            noLimpiar: noLimpiar,
            fbarmenuArray: ["btn_anular","btn_VerDetalle"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Regulacion', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        //me.btn_editar = Funciones.CrearMenu('btn_editar', 'Editar Descuento', Constantes.ICONO_EDITAR, me.EventosPrincipal, null, this, null, true);
        me.btn_eliminar = Funciones.CrearMenu('btn_anular', 'Anular Regulacion', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.btn_reporte = Funciones.CrearMenu('btn_VerDetalle', 'Ver Recibo', 'report', me.EventosPrincipal, null, this, null, true);


        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_eliminar, me.btn_reporte]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.gridDetalles = Ext.create('App.View.Regulaciones.GridDetalles', {
            width: '100%',
            height: 400,
            cargarStore: false

        });
        me.form = Ext.create("App.View.Regulaciones.Forms", {
            opcion: 'formConsulta',
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
            me.gridDetalles.getStore().setExtraParams({ ID_REGULACION: selections[0].get('ID_REGULACION') });
            me.gridDetalles.getStore().load();
            //me.form.CargarDatos(selections[0]);

        }
        else {
            me.form.getForm().reset();
            me.gridDetalles.getStore().setExtraParams({ ID_REGULACION: 0 });
            me.gridDetalles.getStore().load();

        }
    },

    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_crear":
                me.CrearRegulacion();
                break;
            case "btn_anular":
                if (me.record.get('ESTADO') == "NUEVO") {
                    Funciones.AjaxRequestGrid("Regulaciones", "AnularRegulacion", me.grid, "Esta seguro de Anular la Regulacion?", { ID_REGULACION: me.record.get('ID_REGULACION') }, me.grid, null);
                }
                else {
                    Ext.Msg.alert("Error", "Venta en estado Inapropiado.");
                }
                break;
            case "btn_VerDetalle":
                me.VentanaRecibo(me.grid.record.get('ID_REGULACION'));
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    
    CrearRegulacion: function () {
        var me = this;
        win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Venta' });
        form = Ext.create("App.View.Regulaciones.FormRegulacion", { botones: false });
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            if (form.isValid()) {
                Funciones.AjaxRequestWinSc("Regulaciones", "GuardarRegulacion", win, form, me.grid, "Esta Seguro de Guardar", null, win, function (result) {
                    //console.dir(result);
                    //form.ImprimirHojas(result.id);
                    me.VentanaRecibo(result.id);
                });
            }
            else {
                Ext.Msg.alert("Error", "Falta Compeltar Formulario. Al menos una hoja debe de venderse");
            }
        });
    },
    VentanaRecibo: function (id) {

        //("ReporteRegulacion", "ID_REGULACION=" + id);
        fn.VerImpresion("ReporteRegulacion", "ID_REGULACION=" + id);
    },

});