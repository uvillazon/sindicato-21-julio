Ext.define("App.View.Prestamos.Principal", {
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
        Funciones.CrearMenu('btn_PlanPagos', 'Plan de Pagos', 'report', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Moras', 'Moras', 'report', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_ReportePlanPagos', 'Reporte Prestamo', 'report', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Kardex', 'Kardex Pagos', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_GeneracionPlanPagos', 'Generacion Plan de Pagos', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.Prestamos.GridPrestamos', {
            region: 'center',
            width: '100%',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_Kardex", "btn_Moras", "btn_PlanPagos", "btn_eliminar", "btn_pagarPrestamo", "btn_GeneracionPlanPagos", "btn_ReportePlanPagos", "btn_VerDetalle", "btn_pagarTotalPrestamo", "btn_refinanciarPrestamo"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Prestamo', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Anular Prestamo', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.btn_pagarPrestamo = Funciones.CrearMenu('btn_pagarPrestamo', 'Pago Cuota', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this, null, true);
        me.btn_pagarTotalPrestamo = Funciones.CrearMenu('btn_pagarTotalPrestamo', 'Pago Parcial/Total', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this, null, true);
        me.btn_refinanciarPrestamo = Funciones.CrearMenu('btn_refinanciarPrestamo', 'Refinanciar Prestamo', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_eliminar, me.btn_pagarPrestamo, me.btn_pagarTotalPrestamo, me.btn_refinanciarPrestamo]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        //me.form = Ext.create("App.View.RetirosSocio.FormRetiro", {
        //    region: 'center',
        //    width: '50%',
        //    columns: 2,
        //    Eventos : false
        //});
        //me.form.ocultarSaldos(false);
        //me.form.BloquearFormulario();

        //        me.grid.bar.add(me.toolbar);
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
            case "btn_crear":
                me.FormCrearPrestamo();
                break;
            case "btn_eliminar":
                if (me.record.get('ESTADO_CIERRE') == "NUEVO") {
                    Funciones.AjaxRequestGrid("Prestamos", "EliminarPrestamo", me.grid, "Esta seguro de ANULAR el prestamo?", { ID_PRESTAMO: me.record.get('ID_PRESTAMO') }, me.grid, null);
                }
                else {
                    Ext.Msg.alert("Error","Solo puede Anular los prestamos en estado NUEVO");
                }
                break;
            case "btn_pagarPrestamo":
                Funciones.AjaxRequest("Prestamos", "ObtenerPlanAPagar", me.grid, { ID_PRESTAMO: me.record.get('ID_PRESTAMO') }, function (result) {
                    if (result.success == true) {
                        me.FormPagoPrestamo(result.data, false);
                    }
                    else {
                        Ext.MessageBox.alert('Error', result.msg);
                    }
                });
                break;
            case "btn_pagarTotalPrestamo":
                Funciones.AjaxRequest("Prestamos", "ObtenerTotalAPagar", me.grid, { ID_PRESTAMO: me.record.get('ID_PRESTAMO') }, function (result) {
                    if (result.success == true) {
                        me.FormPagoAmortizacion(result.data, true);
                    }
                    else {
                        Ext.MessageBox.alert('Error', result.msg);
                    }
                });
                break;
            case "btn_Kardex":
                me.VentanaPagos();
                break;
            case "btn_GeneracionPlanPagos":
                Funciones.AjaxRequestGrid("Prestamos", "GenerarPlanDePagos", me.grid, "Esta seguro de Generar el Plan de Pago?", { ID_PRESTAMO: me.record.get('ID_PRESTAMO') }, me.grid, null, function (result) {
                    me.ImprimirReportePrestamo(result.id);
                });
                break;
            case "btn_PlanPagos":
                me.VentanaPlanPagos();
                break;
            case "btn_ReportePlanPagos":
                me.ImprimirReportePrestamo(me.grid.record.get('ID_PRESTAMO'));
                break;
            case "btn_VerDetalle":
                me.ImprimirReportePrestamo(me.grid.record.get('ID_PRESTAMO'));
                break;
            case "btn_Moras":
                me.VentanaMoras();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    ImprimirReportePrestamo: function (id) {
        var ruta = fn.ObtenerUrlReportPDF("ReportePrestamo", "ID_PRESTAMO=" + id);
        //var ruta = fn.ObtenerUrlReportPDF("ReporteRegulacion", "ID_REGULACION=2");
        var panel = Ext.create("App.View.Reports.ReportsPDF", {
            ruta: ruta,
            pageScale: 1.50,
        });
        panel.show();
    },
    FormCrearPrestamo: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Prestamos.FormPrestamo", {
            title: 'Datos de Prestamo Por Socio',
            columns: 3,
            botones: false
        });
        //form.txt_socio.setVisible(false);
        //form.getForm().loadRecord(me.socio);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            //Funciones.AjaxRequestWin("Socios", "GuardarRetiroSocio", win, form, me.grid, "Esta Seguro de Guardar", null, win);
            Funciones.AjaxRequestWin("Prestamos", "GuardarPrestamos", win, form, me.grid, "Esta Seguro de Guardar", null, win);

        });

    },

    FormPagoAmortizacion: function (data) {
        //App.View.Prestamos.FormPagoAmortizacion
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Prestamos.FormPagoAmortizacion", {
            columns: 2,
            botones: false
        });
        Funciones.loadRecordCmp(form, data);
        form.txt_observacion.setValue("Pago Total o Parcial del Prestamo")
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWinSc("Prestamos", "GuardarPagoTotal", win, form, me.grid, "Esta Seguro de Guardar el pago total de la deuda", null, win, function (result) {
                fn.VerImpresion("ReportePagoTotalPrestamo", "ID_PAGO=" + result.id);
            });


        });

    },

    FormPagoPrestamo: function (data, pago_total) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Prestamos.FormPagoPrestamo", {
            columns: 2,
            title: pago_total ? "Pago Total del Prestamo" : "Pago Cuota del Prestamo",
            botones: false
        });
        //form.txt_socio.setVisible(false);
        form.getForm().loadRecord(me.grid.record);
        form.date_fecha.reset();
        if (!pago_total) {
            Funciones.loadRecordCmp(form, data);
            //form.txt_nro_semana.setValue(data.NRO_SEMANA);
            //form.txt_importe.setValue(data.CUOTA);
            win.add(form);
            win.show();
            win.btn_guardar.on('click', function () {
                Funciones.AjaxRequestWinSc("Prestamos", "GuardarPago", win, form, me.grid, "Esta Seguro de Guardar", null, win, function (result) {
                    fn.VerImpresion("ReportePagoPrestamo", "ID_PAGO=" + result.id);
                });


            });
        }
        else {
            form.txt_nro_semana.setValue(data.NRO_SEMANA);
            form.txt_importe.setValue(data.CUOTA);
            form.txt_total_condonacion.setVisible(true);
            form.txt_total_condonacion.setValue(data.INTERES_CALCULADO_A_FECHA);
            Funciones.loadRecordCmp(form, data);
            form.txt_importe.setReadOnly(false);
            form.txt_observacion.setValue("Pago Total o Parcial del Prestamo")
            win.add(form);
            win.show();
            win.btn_guardar.on('click', function () {
                Funciones.AjaxRequestWinSc("Prestamos", "GuardarPagoTotal", win, form, me.grid, "Esta Seguro de Guardar el pago total de la deuda", null, win, function (result) {
                    fn.VerImpresion("ReportePagoTotalPrestamo", "ID_PAGO=" + result.id);
                });


            });
            //Funciones.AjaxRequestWinSc("Prestamos", "GuardarPagoTotal", win, form, me.grid, "Esta Seguro de Guardar", null, win, function (result) {
            //    fn.VerImpresion("ReportePagoPrestamo", "ID_PAGO=" + result.id);
            //});
        }

    },
    VentanaKardex: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false, gridLoads: [me.grid] });
        var grid = Ext.create("App.View.Socios.GridKardex", {
            region: 'center',
            width: 760,
            height: 450,
            id_socio_movil: me.record.get('ID_SOCIO_MOVIL')
        });
        win.add(grid);
        win.show();
    },
    VentanaPlanPagos: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false });
        var grid = Ext.create("App.View.Prestamos.GridPlanPagos", {
            region: 'center',
            width: 760,
            height: 450,
        });
        grid.getStore().setExtraParams({ ID_PRESTAMO: me.grid.record.get('ID_PRESTAMO') });
        grid.getStore().load();
        win.add(grid);
        win.show();
    },
    VentanaPagos: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false, gridLoads: [me.grid] });
        var grid = Ext.create("App.View.Prestamos.GridPagos", {
            region: 'center',
            width: 760,
            height: 450,

        });
        grid.getStore().setExtraParams({ ID_PRESTAMO: me.grid.record.get('ID_PRESTAMO') });
        grid.getStore().load();
        win.add(grid);
        win.show();
    },
    VentanaMoras: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false, gridLoads: [me.grid] });
        var grid = Ext.create("App.View.Prestamos.GridMoras", {
            region: 'center',
            width: 760,
            height: 450,

        });
        grid.setPrestamo(me.grid.record);
        grid.getStore().setExtraParams({ ID_PRESTAMO: me.grid.record.get('ID_PRESTAMO') });
        grid.getStore().load();
        win.add(grid);
        win.show();
    }


    //App.View.Prestamos.GridPagos

});