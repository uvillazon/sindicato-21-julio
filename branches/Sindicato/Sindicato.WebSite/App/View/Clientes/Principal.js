Ext.define("App.View.Clientes.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Clientes',
    accionGrabar: 'GrarbarCliente',
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
        Funciones.CrearMenu('btn_Crear', 'Nuevo', Constantes.ICONO_CREAR, me.EventosCliente, me.toolbar, this);
        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosCliente, me.toolbar, this);
        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosCliente, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosCliente, me.toolbar, this);
        Funciones.CrearMenu('btn_Kardex', 'Kardex', 'report', me.EventosCliente, me.toolbar, this);

        me.grid = Ext.create('App.View.Clientes.GridClientes', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridClientes',
            toolbar: me.toolbar
        });
        me.items = [me.grid];

    },
    EventosCliente: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_CrearVenta") {
            if (me.winCrearVenta == null) {
                me.winCrearVenta = Ext.create("App.Config.Abstract.Window");
                me.panelVentas = Ext.create("App.View.Ventas.FormCrearVenta", {
                    columns: 4,
                    title : 'Formulario de Registro de Ventas ',
                    botones : false
                })

                me.winCrearVenta.add(me.panelVentas);
                me.winCrearVenta.show();
            } else {
                me.winCrearVenta.show();
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
