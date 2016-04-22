Ext.define("App.View.TiposIngresos.Principal", {
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
    

        me.grid = Ext.create('App.View.TiposIngresos.GridIngresos', {
            region: 'west',
            width: '50%',
            paramsStore: me.paramsStore,
            noLimpiar : me.noLimpiar,
            fbarmenuArray: ["btn_eliminar", "btn_editar"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Tipo Ingreso', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_editar = Funciones.CrearMenu('btn_editar', 'Editar Tipo Ingreso', Constantes.ICONO_EDITAR, me.EventosPrincipal, null, this, null, true);
        me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Eliminar Tipo Ingreso', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_editar , me.btn_eliminar]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.form = Ext.create("App.View.TiposIngresos.FormIngreso", {
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
        //console.log(btn.getItemId());
        switch (btn.getItemId()) {
            case "btn_crear":
                me.FormCrearIngreso();
                break;
            case "btn_editar":
                me.FormCrearIngreso(me.record);
                break;
            case "btn_eliminar":
                Funciones.AjaxRequestGrid("Transferencias", "EliminarIngreso", me.grid, "Esta seguro de Eliminar la Ingreso?", { ID_INGRESO: me.record.get('ID_INGRESO') }, me.grid, null);
                break;
            case "btn_Kardex":
                me.VentanaKardex(me.record.get('ID_CAJA'));
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    FormCrearIngreso: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.TiposIngresos.FormIngreso", {
            title: 'Datos Tipos de Ingreso Por Socio a Caja',
            columns: 2,
            botones: false,
            paramsStore : me.paramsStore
        });
        win.add(form);
        win.show();
        if (record != null) {
            form.loadRecord(record);
        }
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            Funciones.AjaxRequestWin("Ingresos", "GuardarTipoIngreso", win, form, me.grid, "Esta Seguro de Guardar", null, win);
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