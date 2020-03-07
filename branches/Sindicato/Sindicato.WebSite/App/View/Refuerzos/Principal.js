Ext.define("App.View.Refuerzos.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    paramsStore: {},
    noLimpiar: [],
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        //var paramsStore = {};
        if (Constantes.Usuario.ID_CAJA != 0) {
            me.paramsStore = { ID_CAJA: Constantes.Usuario.ID_CAJA };
            me.noLimpiar = ["ID_CAJA"];
        }
        me.toolbar = Funciones.CrearMenuBar();
        //Funciones.CrearMenu('btn_Detalle', 'Detalle Socio', 'report', me.EventosPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_Kardex', 'Kardex Caja', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_KardexDestino', 'Kardex Caja Destino', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.Refuerzos.GridRefuerzos', {
            region: 'west',
            width: '50%',
            fbarmenu: me.toolbar,
            paramsStore: me.paramsStore,
            noLimpiar: me.noLimpiar,
            fbarmenuArray: ["btn_Kardex", "btn_eliminar", "btn_impresion"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Refuerzo', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Eliminar Refuerzo', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.btn_impresion = Funciones.CrearMenu('btn_impresion', 'Re-Impresion', 'printer', me.EventosPrincipal, null, this);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_eliminar, me.btn_impresion]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.form = Ext.create("App.View.Refuerzos.FormRefuerzo", {
            region: 'center',
            width: '50%',
            columns: 2,
            modoConsulta: true,
        });

        me.form.BloquearFormulario();
        me.items = [me.grid, me.form];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    ImprimirHojasRuta: function (id) {
        var ruta = fn.ObtenerUrlReportPDF("ReporteVentaRefuerzo", "ID_VENTA=" + id);
        var panel = Ext.create("App.View.Reports.ReportsPDF", {
            ruta: ruta,
            pageScale: 1.50,
        });
        panel.show();
    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];
        if (!disabled) {
            me.form.getForm().loadRecord(selections[0])
        }
        else {
            me.form.getForm().reset();

        }
    },

    EventosPrincipal: function (btn) {
        var me = this;
        //console.log(btn.getItemId());
        switch (btn.getItemId()) {
            case "btn_crear":
                me.FormCrearIngreso();
                break;
            case "btn_eliminar":
                Funciones.AjaxRequestGrid("VentaHojas", "AnularVentaRefuerzo", me.grid, "Esta seguro de Eliminar la Ingreso?", { ID_VENTA: me.record.get('ID_VENTA') }, me.grid, null);
                break;
            case "btn_Kardex":
                me.VentanaKardex(me.record.get('ID_CAJA'));
                break;
            case "btn_impresion":
                me.ImprimirHojasRuta(me.record.get('ID_VENTA'));
                 break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    FormCrearIngreso: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Refuerzos.FormRefuerzo", {
            title: 'Datos Venda de Refuerzo',
            columns: 2,
            botones: false,
            paramsStore: me.paramsStore
        });
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            Funciones.AjaxRequestWin("VentaHojas", "GuardarVentaRefuerzo", win, form, me.grid, "Esta Seguro de Guardar", null, win, function (result) {
                me.ImprimirHojasRuta(result.id);
            });
        });

    },
    VentanaKardex: function (id_caja) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false });
        var grid = Ext.create("App.View.Cajas.GridKardexCaja", {
            region: 'center',
            width: 760,
            height: 450,
            id_caja: id_caja
        });
        win.add(grid);
        win.show();

    }

});