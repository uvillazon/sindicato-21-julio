Ext.define("App.View.Moviles.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Moviles',
    accionGrabar: 'GuardarMovil',
    //   accionBaja: 'BajaLista',
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
        me.grid = Ext.create('App.View.Moviles.GridMoviles', {
            region: 'west',
            width: '45%'

        });
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearMovil', 'Crear', Constantes.ICONO_CREAR, me.EventosBoton, me.toolbar, this);
        Funciones.CrearMenu('btn_EditarMovil', 'Editar', Constantes.ICONO_EDITAR, me.EventosBoton, me.toolbar, this);
        me.grid.addDocked(me.toolbar, 1);
        //Funciones.CrearMenu('id13', 'Nombre2', Constantes.ICONO_EDITAR, me.CargarEventos, me.toolbar, this);
        me.form = Ext.create("App.Config.Abstract.FormPanel");

        me.formulario = Ext.create("App.View.Moviles.FormMovil");
        me.formulario.BloquearFormulario();
        me.gridSocio = Ext.create("App.View.Socios.GridSocios", {
            opcion: 'GridSociosKardex',
            cargarStore: false,
            busqueda: true,
            width: '100%',
            height : 400
        });
        //var cadenas = ["NOMBRE","APELLIDO","jhkhh"];
        //me.formulario.BloquearFormularioParams(cadenas);
        me.form.add([me.formulario,me.gridSocio]);
        me.items = [me.grid, me.form];
        me.grid.on('cellclick', me.CargarDatos, this);
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatosGrid, me);

    },
    CargarDatosGrid: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.grid.record = disabled ? null : selections[0];
        if (!disabled) {
            me.formulario.loadRecord(me.grid.record);
            me.formulario.BloquearFormulario();
            me.gridSocio.getStore().setExtraParams({ ID_MOVIL: me.grid.record.get('ID_MOVIL') });
            me.gridSocio.getStore().load();
        }
        else {
            me.formulario.getForm().reset();
            me.gridSocio.getStore().setExtraParams({ ID_MOVIL: 0 });
            me.gridSocio.getStore().load();
        }
    },
    EventosBoton: function (btn, e) {
        var me = this;
        if (btn.getItemId() == "btn_CrearMovil") {
            me.formulario.DesbloquearFormulario();
            me.formulario.LimpiarFormulario();
            me.formulario.btn_guardar.on('click', me.GuardarMoviles, this);

        }
        else if (btn.getItemId() == "btn_EditarMovil") {
            if (me.formulario.record != null && me.formulario.record.get('ESTADO') == 'ACTIVO') {
                me.formulario.DesbloquearFormulario();
                me.formulario.btn_guardar.on('click', me.GuardarMoviles, this);
            }
            else {
                Ext.MessageBox.alert('Aviso', 'Seleccione un registro  en estado A para Editar..');
            }

        }
        else {
            alert("No se Selecciono ningun botton");
        }

    },
    GuardarMoviles: function () {
        var me = this;
        //controlador, accion, mask, form, grid, msg, param, Formulario
        Funciones.AjaxRequestForm(me.controlador, me.accionGrabar, me.form, me.formulario, me.grid, null, null, me.formulario);
    }
});
