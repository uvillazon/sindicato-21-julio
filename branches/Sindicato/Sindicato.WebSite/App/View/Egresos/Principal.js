Ext.define("App.View.Egresos.Principal", {
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
        if (Constantes.Usuario.ID_CAJA != 0) {
            me.paramsStore = { ID_CAJA: Constantes.Usuario.ID_CAJA };
            me.noLimpiar = ["ID_CAJA"];
        }
        me.toolbar = Funciones.CrearMenuBar();
        //Funciones.CrearMenu('btn_Detalle', 'Detalle Socio', 'report', me.EventosPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_Kardex', 'Kardex Caja', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
         Funciones.CrearMenu('btn_VerDetalle', 'Ver Recibo', 'report', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_VerDetalle', 'Ver Recibo', 'report', me.EventosPrincipal, me.toolbar, this, null, true);

        //Funciones.CrearMenu('btn_KardexDestino', 'Kardex Caja Destino', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.Egresos.GridEgresos', {
            region: 'west',
            width: '50%',
            fbarmenu: me.toolbar,
            paramsStore: me.paramsStore,
            fbarmenuArray: ["btn_Kardex", "btn_eliminar", "btn_VerDetalle"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Egreso', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Anular Egreso', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_eliminar]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.form = Ext.create("App.View.Egresos.FormEgreso", {
            region: 'center',
            width: '50%',
            columns: 2,
            modoConsulta: true,
        });

        me.form.BloquearFormulario();
        me.items = [me.grid, me.form];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

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
        switch (btn.getItemId()) {
            case "btn_crear":
                me.FormCrearEgreso();
                break;
            case "btn_eliminar":
                if (me.record.get('ESTADO') == "NUEVO") {
                    Funciones.AjaxRequestGrid("Transferencias", "EliminarEgreso", me.grid, "Esta seguro de Eliminar el Egreso?", { ID_EGRESO: me.record.get('ID_EGRESO') }, me.grid, null);
                }
                else {
                    Ext.Msg.alert("Error", "No puedo Anular el Egreso en estado diferente a NUEVO");
                }
                break;
            case "btn_Kardex":
                me.VentanaKardex(me.record.get('ID_CAJA'));
                break;
            case "btn_VerDetalle":
                me.VentanaRecibo(me.grid.record.get('ID_EGRESO'));
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    FormCrearEgreso: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Egresos.FormEgreso", {
            title: 'Datos Egresos',
            columns: 2,
            botones: false,
            paramsStore: me.paramsStore
        });
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            Funciones.AjaxRequestWinSc("Transferencias", "GuardarEgreso", win, form, me.grid, "Esta Seguro de Guardar", null, win, function (result) {
                me.VentanaRecibo(result.id);
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

    },
    VentanaRecibo: function (id) {
        fn.VerImpresion("ReporteEgreso", "ID_EGRESO=" + id);
    }


});