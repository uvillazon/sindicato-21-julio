Ext.define("App.View.Obligaciones.Principal", {
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
        Funciones.CrearMenu('btn_Kardex', 'Kardex Debe', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_KardexDestino', 'Kardex Caja Destino', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.Obligaciones.GridObligaciones', {
            region: 'west',
            width: '50%',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_Kardex", "btn_eliminar", "btn_editar"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Obligaciones', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_editar = Funciones.CrearMenu('btn_editar', 'Editar Obligaciones', Constantes.ICONO_EDITAR, me.EventosPrincipal, null, this);
        me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Eliminar Obligaciones', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear,me.btn_editar, me.btn_eliminar]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.form = Ext.create("App.View.Obligaciones.FormObligacion", {
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
                me.FormCrearObligacion();
                break;
            case "btn_editar":
                if (me.record.get('ESTADO') === "NUEVO") {
                    me.FormCrearObligacion(me.record);
                }
                else {
                    Ext.Msg.alert("Error", "Estado no corresponde para la Edicion");
                }
                break;
            case "btn_eliminar":
                Funciones.AjaxRequestGrid("Obligaciones", "EliminarObligacion", me.grid, "Esta seguro de Eliminar Otras Obligaciones?", { ID_OBLIGACION: me.record.get('ID_OBLIGACION') }, me.grid, null);
                break;
            case "btn_Kardex":
                me.VentanaKardexDebe(me.record.get('ID_SOCIO'));
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    FormCrearObligacion: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Obligaciones.FormObligacion", {
            //title: 'Datos Egresos',
            columns: 2,
            botones: false
        });
        if (record != null) {
            form.cargarModoEdicion();
            form.getForm().loadRecord(record);
        }
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            Funciones.AjaxRequestWin("Obligaciones", "GuardarObligacion", win, form, me.grid, "Esta Seguro de Guardar", null, win);
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

});