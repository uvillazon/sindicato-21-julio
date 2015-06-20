Ext.define("App.View.Amortizaciones.Principal", {
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
        Funciones.CrearMenu('btn_Kardex', 'Kardex Obligaciones', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_KardexCaja', 'Kardex Caja', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_KardexDestino', 'Kardex Caja Destino', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.Amortizaciones.GridAmortizaciones', {
            region: 'west',
            width: '50%',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_Kardex", "btn_eliminar", "btn_KardexCaja"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Amortizacion', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Eliminar Amortizacion', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_eliminar]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.form = Ext.create("App.View.Amortizaciones.FormAmortizacion", {
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
                me.FormCrearAmortizacion();
                break;
            case "btn_eliminar":
                Funciones.AjaxRequestGrid("Obligaciones", "EliminarAmortizacion", me.grid, "Esta seguro de Eliminar la Amortizacion?", { ID_AMORTIZACION: me.record.get('ID_AMORTIZACION') }, me.grid, null);
                break;
            case "btn_Kardex":
                me.VentanaKardexDebe(me.record.get('ID_SOCIO'));
                break;

            case "btn_KardexCaja":
                me.VentanaKardex(me.record.get('ID_CAJA'));
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    FormCrearAmortizacion: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Amortizaciones.FormAmortizacion", {
            //title: 'Datos Egresos',
            columns: 2,
            botones: false
        });
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            Funciones.AjaxRequestWin("Obligaciones", "GuardarAmortizacion", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });

    },
    VentanaKardexDebe: function (id_socio) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: false });
        var grid = Ext.create("App.View.Socios.GridKardexDebe", {
            region: 'center',
            width: 760,
            height: 450,
            id_socio: id_socio
        });
        win.add(grid);
        win.show();

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