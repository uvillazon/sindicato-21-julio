Ext.define("App.View.TiposPrestamos.Principal", {
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
        
        me.grid = Ext.create('App.View.TiposPrestamos.GridTiposPrestamos', {
            region: 'west',
            width: '50%',
            paramsStore: me.paramsStore,
            noLimpiar : me.noLimpiar,
            fbarmenuArray: ["btn_eliminar", "btn_editar"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Tipo Prestamo', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_editar = Funciones.CrearMenu('btn_editar', 'Editar Tipo Prestamo', Constantes.ICONO_EDITAR, me.EventosPrincipal, null, this, null, true);
        me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Eliminar Tipo Prestamo', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_editar , me.btn_eliminar]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.form = Ext.create("App.View.TiposPrestamos.FormTipoPrestamo", {
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
                me.FormCrearTipo();
                break;
            case "btn_editar":
                me.FormCrearTipo(me.record);
                break;
            case "btn_eliminar":
                Funciones.AjaxRequestGrid("Prestamos", "EliminarTipoPrestamos", me.grid, "Esta seguro de Eliminar el Tipo de Prestamo?", { ID_TIPO: me.record.get('ID_TIPO') }, me.grid, null);
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    FormCrearTipo: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.TiposPrestamos.FormTipoPrestamo", {
            title: 'Datos Tipos de Prestamo a Socio',
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
            Funciones.AjaxRequestWin("Prestamos", "GuardarTipoPrestamos", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });

    }

});