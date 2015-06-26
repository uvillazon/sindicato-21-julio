Ext.define("App.View.Transferencias.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    paramsStore: {},
    paramsStoreForm: {},
    noLimpiar: [],
    noLimpiarForm: [],
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        if (Constantes.Usuario.ID_CAJA != 0) {
            me.paramsStore = { ID_CAJA_ORIGEN: Constantes.Usuario.ID_CAJA, ID_CAJA_DESTINO: Constantes.Usuario.ID_CAJA, Operador: " or " };
            me.paramsStoreForm = { ID_CAJA: Constantes.Usuario.ID_CAJA };
            me.noLimpiar = ['ID_CAJA_ORIGEN', 'ID_CAJA_DESTINO', 'Operador'];
        }
        me.toolbar = Funciones.CrearMenuBar();
        //Funciones.CrearMenu('btn_Detalle', 'Detalle Socio', 'report', me.EventosPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_KardexOrigen', 'Kardex Caja Origen', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_KardexDestino', 'Kardex Caja Destino', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.Transferencias.GridTransferencias', {
            region: 'west',
            width: '50%',
            fbarmenu: me.toolbar,
            paramsStore: me.paramsStore,
            noLimpiar: me.noLimpiar,
            fbarmenuArray: ["btn_KardexOrigen", "btn_KardexDestino", "btn_eliminar"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Transferencia', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Eliminar Transferencia', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_eliminar]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.form = Ext.create("App.View.Transferencias.FormTransferencia", {
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
                me.FormCrearTransferencia();
                break;
            case "btn_eliminar":
                Funciones.AjaxRequestGrid("Transferencias", "EliminarTransferencia", me.grid, "Esta seguro de Eliminar la Transferencia?", { ID_TRANSFERENCIA: me.record.get('ID_TRANSFERENCIA') }, me.grid, null);
                break;
            case "btn_KardexOrigen":
                me.VentanaKardex(me.record.get('ID_CAJA_ORIGEN'));
                break;
            case "btn_KardexDestino":
                me.VentanaKardex(me.record.get('ID_CAJA_DESTINO'));
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    FormCrearTransferencia: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Transferencias.FormTransferencia", {
            title: 'Datos Transferencia entre Cuentas',
            columns: 2,
            botones: false,
            paramsStore: me.paramsStoreForm
        });
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            Funciones.AjaxRequestWin("Transferencias", "GuardarTransferencia", win, form, me.grid, "Esta Seguro de Guardar", null, win);
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