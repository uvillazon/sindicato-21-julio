Ext.define("App.View.Permisos.Principal", {
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

        me.grid = Ext.create('App.View.Permisos.GridPermisos', {
            region: 'west',
            width: '50%',
            paramsStore: me.paramsStore,
            noLimpiar : me.noLimpiar,
            fbarmenuArray: ["btn_anular"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Permiso', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_eliminar = Funciones.CrearMenu('btn_anular', 'Anular Permiso', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_eliminar]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.form = Ext.create("App.View.Permisos.FormPermiso", {
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
                me.FormCrearPermiso();
                break;
            case "btn_anular":
                me.FormAnularPermiso(me.record);
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    FormCrearPermiso: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Permisos.FormPermiso", {
            title: 'Datos Permisos Movil',
            columns: 2,
            botones: false,
            paramsStore : me.paramsStore
        });
        win.add(form);
        win.show();
       
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            Funciones.AjaxRequestWin("Permisos", "GuardarPermiso", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });

    },
    FormAnularPermiso: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Permisos.Forms", {
            title: 'Anulacion de Permiso',
            columns: 2,
            botones: false,
            opcion : 'formAnular',
            paramsStore: me.paramsStore
        });
        form.loadRecord(record);
        win.add(form);
        win.show();

        win.btn_guardar.on('click', function () {
            //console.dir(params);
            Funciones.AjaxRequestWin("Permisos", "AnularPermiso", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });

    }
    //App.View.Permisos.Forms

});