Ext.define("App.View.Ventas.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Ventas',
    accionGrabar: 'GrabarVentas',
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
        Funciones.CrearMenu('btn_CrearVenta', 'Crear Venta', Constantes.ICONO_CREAR, me.EventosVenta, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', Constantes.ICONO_IMPRIMIR, me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle', Constantes.ICONO_VER, me.EventosVenta, me.toolbar, this,null, true);


        me.grid = Ext.create('App.View.Ventas.GridVentas', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridVentas',
            toolbar: me.toolbar
        });
        me.items = [me.grid
        ];
        me.grid.on('itemclick', me.onItemClick, this);
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);

    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.record = record;
        me.id = record.get('ID_VENTA');
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        Funciones.DisabledButton('btn_Detalle', me.toolbar, disabled);
    },
    EventosVenta: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_CrearVenta") {
            if (me.winCrearVenta == null) {
                me.winCrearVenta = Ext.create("App.Config.Abstract.Window");
                me.panelVentas = Ext.create("App.View.Ventas.FormCrearVenta", {
                    columns: 4,
                    title: 'Formulario de Registro de Ventas ',
                    botones: false
                });
                me.panelVentas.CargarFecha();
                me.winCrearVenta.add(me.panelVentas);
                me.winCrearVenta.show();
            } else {
                me.panelVentas.getForm().reset();
                me.panelVentas.CargarStoreFecha();
                me.panelVentas.gridVenta.getStore().removeAll();
                me.panelVentas.gridVentaCredito.getStore().removeAll();
                me.panelVentas.gridVentaConsumo.getStore().removeAll();
                me.panelVentas.CargarFecha(me.grid.getStore());
                me.winCrearVenta.show();
            }
        }
        else if (btn.getItemId() == "btn_Detalle") {
            if (me.winEditarVenta == null) {
                me.winEditarVenta = Ext.create("App.Config.Abstract.Window");
                me.panelVentasEditar = Ext.create("App.View.Ventas.FormCrearVenta", {
                    columns: 4,
                    title: 'Formulario de Registro de Ventas ',
                    botones: false,
                    editar: true
                });
                me.panelVentasEditar.CargarEditarVenta(me.record);
                me.winEditarVenta.add(me.panelVentasEditar);
                me.winEditarVenta.show();
            } else {
                me.panelVentasEditar.getForm().reset();
                me.panelVentasEditar.CargarEditarVenta(me.record);
                me.panelVentasEditar.gridVenta.getStore().removeAll();
                me.panelVentasEditar.gridVentaCredito.getStore().removeAll();
                me.panelVentasEditar.gridVentaConsumo.getStore().removeAll();
                me.winEditarVenta.show();
            }
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }
    //    CargarDatos: function (grid, td, cellIndex, record, tr, owIndex, e, eOpts) {
    //        var me = this;
    //        me.formulario.CargarDatos(record);
    //        me.panelImagen.setTitle("Visor de Imagenes - "+record.get('COD_ALTERNATIVO'));
    //        me.ViewImagen.store.setExtraParams({ TABLA: me.Tabla, ID_TABLA: record.get(me.idTabla) });
    //        me.ViewImagen.store.load();

    //    },
    //    EventosBoton: function (btn) {
    //        var me = this;

    //        if (btn.getItemId() == '') {

    //        }
    //        else {
    //            alert("No se Selecciono ningun botton");
    //        }
    //    },
    //    EventoConfiguracion: function (btn) {
    //        me = this;
    //        if (btn.getItemId() == 'btn_configuracionUC') {
    //            if (me.winConfig == null) {
    //                me.winConfig = Ext.create("App.Config.Abstract.Window");
    //                me.formConfig = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionCodSol', title: 'Formulario de Configuracion Codigo Solucion y Materiales' });
    //                me.winConfig.add(me.formConfig);
    //                me.winConfig.show();
    //            }
    //            else {
    //                me.formConfig.getForm().reset();
    //                me.winConfig.show();
    //            }
    //        }
    //        else if (btn.getItemId() == 'btn_configuracionCodMat') {
    //            if (me.winConfigMat == null) {
    //                me.winConfigMat = Ext.create("App.Config.Abstract.Window");
    //                me.formConfigMat = Ext.create("App.View.Postes.Forms", { opcion: 'FormConfiguracionCodMan', title: 'Formulario de Configuracion Codigo Materiales y Cod. Soluciones' });
    //                me.winConfigMat.add(me.formConfigMat);
    //                me.winConfigMat.show();
    //            }
    //            else {
    //                me.formConfigMat.getForm().reset();
    //                me.winConfigMat.show();
    //            }
    //        }
    //        else { alert("Selecione uina opcion") }
    //    }
});
