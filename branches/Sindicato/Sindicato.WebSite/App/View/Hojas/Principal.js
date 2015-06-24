Ext.define("App.View.Hojas.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        //Funciones.CrearMenu('btn_Detalle', 'Detalle Socio', 'report', me.EventosPrincipal, me.toolbar, this);
        //Funciones.CrearMenu('btn_kardex', 'Kardex Caja', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, false);
        //Funciones.CrearMenu('btn_debitar', 'Debitar Descuento', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);
        var paramsStore = {};
        var noLimpiar = "";
        if (Funciones.isEmpty(Constantes.Usuario.ID_PARADA)) {
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
    //FormCrearDeposito: function (record) {
    //    var me = this;
    //    var win = Ext.create("App.Config.Abstract.Window", { botones: true, gridLoads: [me.grid] });
    //    var form = Ext.create("App.View.Descuentos.FormDescuento", {
    //        title: 'Datos Descuento',
    //        columns: 2,
    //        botones: false
    //    });
    //    if (record != null) {
    //        form.bloquearEdicion();
    //        form.getForm().loadRecord(record);
    //        form.gridDetalles.getStore().setExtraParams({ ID_DESCUENTO: record.get('ID_DESCUENTO') });
    //        form.gridDetalles.getStore().load();
    //    }
    //    //form.txt_socio.setVisible(false);
    //    //form.getForm().loadRecord(me.socio);
    //    win.add(form);
    //    win.show();
    //    win.btn_guardar.on('click', function () {
    //        //console.dir(params);
    //        Funciones.AjaxRequestWin("Descuentos", "GuardarDescuento", win, form, me.grid, "Esta Seguro de Guardar", null, win);
    //    });

    //},
    //VentanaKardex: function () {
    //    var me = this;
    //    var win = Ext.create("App.Config.Abstract.Window", { botones: false });
    //    var grid = Ext.create("App.View.Socios.GridKardex", {
    //        region: 'center',
    //        width: 760,
    //        height: 450,
    //        id_socio: me.record.get('ID_SOCIO')
    //    });
    //    win.add(grid);
    //    win.show();
    //}

});


//Ext.define("App.View.Hojas.Principal", {
//    extend: "App.Config.Abstract.PanelPrincipal",
//    view: '',
//    initComponent: function () {
//        var me = this;
//        //        alert(me.view);
//        me.CargarComponentes();
//        //me.CargarEventos();
//        this.callParent(arguments);
//    },
//    CargarComponentes: function () {
//        var me = this;

//        me.toolbar = Funciones.CrearMenuBar();
//        Funciones.CrearMenu('btn_Crear', 'Crear', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this);
//        //        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosCliente, me.toolbar, this);
//        Funciones.CrearMenu('btn_Eliminar', 'Anular', Constantes.ICONO_BAJA, me.EventosPrincipal, me.toolbar, this);
//        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
//        Funciones.CrearMenu('btn_kardex', 'Detalle Kardex', 'folder_database', me.EventosPrincipal, me.toolbar, this);
//        Funciones.CrearMenu('btn_CerrarCaja', 'Cerrar Caja', 'folder_database', me.EventosPrincipal, me.toolbar, this);
//        //        Funciones.CrearMenu('btn_Kardex', 'Kardex', 'report', me.EventosCliente, me.toolbar, this);
////        alert(Constantes.Usuario.ID_CAJA)   
//        me.grid = Ext.create('App.View.Ventas.GridVentas', {
//            region: 'center',
//            opcion: 'GridHojas',
//            width: '100%',
//            height: '100%',
//            fbarmenu: me.toolbar,
//            paramsStore: { ID_PARADA: Constantes.Usuario.ID_PARADA },
//            noLimpiar: ["ID_PARADA"]

//        });
//        //        me.grid.bar.add(me.toolbar);
//        me.items = [me.grid];
//        me.grid.on('itemclick', me.onItemClick, this);

//    },
//    EventosPrincipal: function (btn) {
//        var me = this;
//        switch (btn.getItemId()) {
//            case "btn_Crear":
//                me.CrearHojasControl();
//                break;
//            case "btn_kardex":
//                me.CrearVentanaKardex();
//                break;
//            default: Ext.Msg.alert("Aviso", "No Existe el botton");
//        };

//    },
//    CrearVentanaKardex: function () {
//        var me = this;
//        var buttonGroup = [{
//            xtype: 'button',
//            text: 'Imprimir',
//            iconCls: 'printer',
//            minHeight: 27,
//            minWidth: 80,
//            handler: function () {
//                me.ImprimirReporteCustomGrid(me.gridKardexCaja);
//            }

//        }, {
//            xtype: 'button',
//            text: 'Cerrar',
//            iconCls: 'cross',
//            minHeight: 27,
//            minWidth: 80,
//            handler: function () {
//                this.up('window').hide();
//            }

//        }];
////        alert(Constantes.Usuario.ID_CAJA);
//        if (me.winKardexCaja == null) {
//            me.winKardexCaja = Ext.create("App.Config.Abstract.Window", { botones: false, buttons: buttonGroup });
//            me.gridKardexCaja = Ext.create("App.View.Cajas.GridKardexCaja", {
//                region: 'center',
//                width: 760,
//                height: 450,
//                imagenes: false,
//                opcion: 'GridKardexCaja',
//                id_caja: Constantes.Usuario.ID_CAJA
//            });
//            me.winKardexCaja.add(me.gridKardexCaja);
//            me.winKardexCaja.show();
//        } else {
////            me.gridKardexCaja.store.setExtraParams({ ID_CAJA: Constantes.Usuario.ID_CAJAa });
//            me.gridKardexCaja.store.load();
//            me.winKardexCaja.show();
//        }
//    },
//    CrearHojasControl: function () {
//        var me = this;
//        win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Venta' });
//        form = Ext.create("App.View.Hojas.FormHoja", { botones: false });
//        win.add(form);
//        win.show();
//        win.btn_guardar.on('click', function () {

//            Funciones.AjaxRequestWin("VentaHojas", "GrabarHoja", win, form, me.grid, "Esta Seguro de Guardar", null, win);
//        });
//    }
//});
