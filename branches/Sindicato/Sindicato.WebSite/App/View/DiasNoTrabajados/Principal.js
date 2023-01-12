﻿Ext.define("App.View.DiasNoTrabajados.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_VerDetalle', 'Imprimir', 'report', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_Kardex', 'Kardex Pagos', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.DiasNoTrabajados.GridDetalles', {
            region: 'center',
            width: '100%',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_Kardex", "btn_crear", "btn_eliminar", "btn_VerDetalle", "btn_anular"]

        });

        me.btn_anular = Funciones.CrearMenu('btn_anular', 'Anular Dia No Trabajado SIN PAGO', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);

        me.btn_crear_dia_no_trabajado = Funciones.CrearMenu('btn_crear_dia_no_trabajado', 'Crear Deuda', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this, null);
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Realizar Pago', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this,null,true);
        me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Anular Dia No Trabajado con PAGO', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear_dia_no_trabajado, me.btn_crear, me.btn_anular,  me.btn_eliminar]);

        me.items = [me.grid];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];

    },

    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_crear_dia_no_trabajado":
                me.FormCrearDeuda();
                
                break;
            case "btn_crear":
                if (me.record.get('ESTADO') == "NUEVO") {
                    Funciones.AjaxRequestGrid("DeudasSocios", "GuardarPagoDeudaDiaNoTrabajado", me.grid, "Esta seguro de Pagar la Dueda del Movil  " + me.record.get('MOVIL') + "?", { ID_DETALLE: me.record.get('ID_DETALLE') }, me.grid, null, function () {
                        me.ImprimirReportePrestamo(me.record.get('ID_DETALLE'));
                    });
                }
                else {
                    Ext.Msg.alert("Error", "Solo puede Anular los prestamos en estado NUEVO");
                }
                break;
            case "btn_eliminar":
                if (me.record.get('ESTADO_DEUDA') == "CANCELADO" && me.record.get('ESTADO') == "NUEVO") {
                    Funciones.AjaxRequestGrid("DeudasSocios", "AnularPagoDiaNoTrabajado", me.grid, "Esta seguro de ANULAR el PAGO de la Deuda DIA NO TRABAJADO del Movil" + me.record.get('MOVIL') + "?", { ID_DETALLE: me.record.get('ID_DETALLE') }, me.grid, null);
                }
                else {
                    Ext.Msg.alert("Error", "Solo puede Anular los prestamos CANCELADOS y en estado NUEVO");
                }
                break;
            case "btn_Kardex":
                me.VentanaPagos();
                break;
            case "btn_VerDetalle":
                if (me.grid.record.get('ESTADO_DEUDA') != 'SIN_PAGO') {
                    me.ImprimirReportePrestamo(me.grid.record.get('ID_DETALLE'));
                } else {
                    Ext.Msg.alert("Error", "Solo se puede imprimir deudas cancelados");
                }
                break;
            case "btn_anular":
                if (me.record.get('ESTADO') == "NUEVO" && me.record.get('ESTADO_DEUDA') =='SIN_PAGO') {

                    me.FormAnularDeuda(me.record);

                }
                else {
                    Ext.Msg.alert("Error", "Solo puede Anular los prestamos en estado NUEVO y que no tenga PAGO");
                }
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },

    FormCrearDeuda: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: "Guardar" });
        var form = Ext.create("App.View.DiasNoTrabajados.FormDeuda", {

            botones: false
        });
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("DeudasSocios", "GuardarDiaNoTrabajado", win, form, me.grid, "Esta Seguro de Guardar el registro", null, win);
        });
    },

    FormAnularDeuda: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: "Anular" });
        var form = Ext.create("App.View.DiasNoTrabajados.FormAnular", {
            
            botones: false
        });
        win.add(form);
        win.show();
        if (record != null) {
            form.loadRecord(record);
            form.txt_observacion.setValue("");
        }
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("DeudasSocios", "AnularDeudaDiaNoTrabajado", win, form, me.grid, "Esta Seguro de Anular", null, win);
        });

    },
    ImprimirReportePrestamo: function (id) {
        var ruta = fn.ObtenerUrlReportPDF("ReportePagoDeudaDiaNoTrabajado", "ID_DETALLE=" + id);
        //var ruta = fn.ObtenerUrlReportPDF("ReporteRegulacion", "ID_REGULACION=2");
        var panel = Ext.create("App.View.Reports.ReportsPDF", {
            ruta: ruta,
            pageScale: 1.50,
        });
        panel.show();
    },
    VentanaKardex: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false, gridLoads: [me.grid]  });
        var grid = Ext.create("App.View.Socios.GridKardex", {
            region: 'center',
            width: 760,
            height: 450,
            id_socio_movil: me.record.get('ID_SOCIO_MOVIL')
        });
        win.add(grid);
        win.show();
    }
});