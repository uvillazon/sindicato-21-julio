Ext.define("App.View.Hojas.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    view: '',
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        //me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_Crear', 'Crear', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosCliente, me.toolbar, this);
        Funciones.CrearMenu('btn_Eliminar', 'Anular', Constantes.ICONO_BAJA, me.EventosPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_kardex', 'Detalle Kardex', 'folder_database', me.EventosPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_CerrarCaja', 'Cerrar Caja', 'folder_database', me.EventosPrincipal, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Kardex', 'Kardex', 'report', me.EventosCliente, me.toolbar, this);
//        alert(Constantes.Usuario.ID_CAJA)   
        me.grid = Ext.create('App.View.Ventas.GridVentas', {
            region: 'center',
            opcion: 'GridHojas',
            width: '100%',
            height: '100%',
            fbarmenu: me.toolbar,
            paramsStore: { ID_PARADA: Constantes.Usuario.ID_PARADA },
            noLimpiar: ["ID_PARADA"]

        });
        //        me.grid.bar.add(me.toolbar);
        me.items = [me.grid];
        me.grid.on('itemclick', me.onItemClick, this);

    },
    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_Crear":
                me.CrearHojasControl();
                break;
            case "btn_kardex":
                me.CrearVentanaKardex();
                break;
            default: Ext.Msg.alert("Aviso", "No Existe el botton");
        };

    },
    CrearVentanaKardex: function () {
        var me = this;
        var buttonGroup = [{
            xtype: 'button',
            text: 'Imprimir',
            iconCls: 'printer',
            minHeight: 27,
            minWidth: 80,
            handler: function () {
                me.ImprimirReporteCustomGrid(me.gridKardexCaja);
            }

        }, {
            xtype: 'button',
            text: 'Cerrar',
            iconCls: 'cross',
            minHeight: 27,
            minWidth: 80,
            handler: function () {
                this.up('window').hide();
            }

        }];
//        alert(Constantes.Usuario.ID_CAJA);
        if (me.winKardexCaja == null) {
            me.winKardexCaja = Ext.create("App.Config.Abstract.Window", { botones: false, buttons: buttonGroup });
            me.gridKardexCaja = Ext.create("App.View.Cajas.GridKardexCaja", {
                region: 'center',
                width: 760,
                height: 450,
                imagenes: false,
                opcion: 'GridKardexCaja',
                id_caja: Constantes.Usuario.ID_CAJA
            });
            me.winKardexCaja.add(me.gridKardexCaja);
            me.winKardexCaja.show();
        } else {
//            me.gridKardexCaja.store.setExtraParams({ ID_CAJA: Constantes.Usuario.ID_CAJAa });
            me.gridKardexCaja.store.load();
            me.winKardexCaja.show();
        }
    },
    CrearHojasControl: function () {
        var me = this;
        win = Ext.create("App.Config.Abstract.Window", { botones: true, textGuardar: 'Guardar Venta' });
        form = Ext.create("App.View.Hojas.FormHoja", { botones: false });
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {

            Funciones.AjaxRequestWin("VentaHojas", "GrabarHoja", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });
    }
});
