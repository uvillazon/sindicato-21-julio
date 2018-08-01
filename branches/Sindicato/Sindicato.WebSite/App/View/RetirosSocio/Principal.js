Ext.define("App.View.RetirosSocio.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_VerDetalle', 'Ver Recibo', 'report', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Kardex', 'Kardex Socio', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.RetirosSocio.GridRetiros', {
            region: 'center',
            width: '100%',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_Kardex", "btn_eliminar", "btn_VerDetalle"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Retiro', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Anular Retiro', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_eliminar]);
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
                me.FormCrearRetiro();
                break;
            case "btn_eliminar":
                if (me.record.get('ESTADO') == "NUEVO") {
                    Funciones.AjaxRequestGrid("Socios", "EliminarRetiroSocio", me.grid, "Esta seguro de Eliminar el Retiro?", { ID_RETIRO: me.record.get('ID_RETIRO') }, me.grid, null);
                }
                else {
                    Ext.Msg.alert("Error", "Solo puede anular en estado NUEVO");
                }
                break;
            case "btn_Kardex":
                me.VentanaKardex();
                break;
            case "btn_VerDetalle":
                me.VentanaRecibo(me.grid.record.get('ID_RETIRO'));
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    FormCrearRetiro: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.RetirosSocio.FormRetiro", {
            title: 'Datos Retiros Por Socios',
            columns: 2,
            botones: false
        });
        //form.txt_socio.setVisible(false);
        //form.getForm().loadRecord(me.socio);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            //Funciones.AjaxRequestWin("Socios", "GuardarRetiroSocio", win, form, me.grid, "Esta Seguro de Guardar", null, win);
            Funciones.AjaxRequestWinSc("Socios", "GuardarRetiroSocio", win, form, me.grid, "Esta Seguro de Guardar", null, win, function (result) {
                //console.dir(result);
                //form.ImprimirRecibo(result.id);
                me.VentanaRecibo(result.id);
            });

        });

    },
    VentanaRecibo: function (id) {
        fn.VerImpresion("ReporteRetiro", "ID_RETIRO=" + id);
    },
    VentanaKardex: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false });
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