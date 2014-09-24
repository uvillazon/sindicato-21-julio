Ext.define("App.View.BandejasEntrada.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Responsables',
    accionGrabar: 'GrabarResponsableSP',
    view: '',
    win: null,
    initComponent: function () {
        var me = this;
        //        alert(me.view);
        me.CargarComponentes();
        //me.CargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.SolicitudesMantenimiento.GridSolicitudesMantenimiento', {
            //region: 'west',
            width: '100%',
            height : 350,
            opcion: 'Bandeja'
        });
        me.CargarBotones();

        //Funciones.CrearMenu('id13', 'Nombre2', Constantes.ICONO_EDITAR, me.CargarEventos, me.toolbar, this);
        me.form = Ext.create("App.Config.Abstract.FormPanel", {
            bbar: me.grupo
        });

        me.formulario = Ext.create("App.View.SolicitudesMantenimiento.FormSolicitudesMantenimiento", { cargarStores: false });
        me.formulario.BloquearFormulario();
        me.form.add(me.formulario);
        me.items = [//me.grid,
            {
                region: 'west',
                //autoScroll : true,
                width: '45%',
                items: [me.grid ,me.CargarTabPanel()]
            }
            , me.form
        ];
        me.grid.on('cellclick', me.CargarDatos, this);

    },
    CargarBotones: function () {
        var me = this;
        me.grupo = Funciones.CrearGrupoBoton("3", "opciones de Solicitudes");
        Funciones.CrearMenu('btn_AprobarSolicitud', 'Aprobar<br>Solicitud', Constantes.ICONO_EDITAR, me.EventosBoton, me.grupo, this);
        Funciones.CrearMenu('btn_RechazarSolicitud', 'Rechazar<br>Solicitud', Constantes.ICONO_BAJA, me.EventosBoton, me.grupo, this);
    },
    CargarTabPanel: function () {
        var me = this;
        var gridSolicitutesAceptadas = Ext.create("App.View.SolicitudesMantenimiento.Grids", {
            opcion: "GridSolicitudesAceptadas", width: '100%',
            height: 200,
        });
        var gridSolicitutesRechazadas = Ext.create("App.View.SolicitudesMantenimiento.Grids", {
            opcion: "GridSolicitudesRechazadas", width: '100%',
            height: 200,
        });
        me.TabPanel = Ext.create("Ext.tab.Panel", {
            items: [gridSolicitutesAceptadas, gridSolicitutesRechazadas]
        });
        return me.TabPanel;
    },
    EventosBoton: function (btn) {
        var me = this;

        if (btn.getItemId() == "btn_AprobarSolicitud") {
            if (me.formulario.record != null) {
                //alert(me.formulario.record.get('ESTADO'));
                if (me.formulario.record.get('ESTADO') == 'NUEVA' || me.formulario.record.get('ESTADO') == 'APR_JF_MN') {
                    if (me.win == null) {
                        me.win = Ext.create("App.Config.Abstract.Window", { textGuardar: "Aprobar Solicitudes", botones: true });
                        me.formAprobacion = Ext.create("App.View.SolicitudesMantenimiento.FormAprobacionRechazo", { opcion: "FormAprobacion" });
                        me.formAprobacion.CargarFormularioAprobacion(me.formulario.record);
                        me.win.btn_guardar.on('click', me.GuardarFormulario, this);
                        me.win.add(me.formAprobacion);
                        me.win.show();
                    }
                    else {
                        me.formAprobacion.CargarFormularioAprobacion(me.formulario.record);
                        me.win.show();
                    }
                }
                else {
                    Ext.MessageBox.alert('Error', "Seleccione una Solicitud en estado NUEVA");
                }
            }
            else {
                Ext.MessageBox.alert('Error', "Seleccione una Solicitud en estado NUEVA");
            }

        }
        else if (btn.getItemId() == "btn_RechazarSolicitud") {
            if (me.formulario.record != null && me.formulario.record.get('ESTADO') == 'NUEVA') {
                if (me.winRechazo == null) {
                    me.winRechazo = Ext.create("App.Config.Abstract.Window", { textGuardar: "Rechazar Solicitud", botones: true });
                    me.formRechazo = Ext.create("App.View.SolicitudesMantenimiento.FormAprobacionRechazo", { opcion: "FormRechazo" });
                    me.formRechazo.CargarFormularioRechazo(me.formulario.record);
                    me.winRechazo.btn_guardar.on('click', me.GuardarFormulario, this);
                    me.winRechazo.add(me.formRechazo);
                    me.winRechazo.show();
                }
                else {
                    me.formRechazo.CargarFormularioRechazo(me.formulario.record);
                    me.winRechazo.show();
                }
            } else {
                Ext.MessageBox.alert('Error', "Seleccione una Solicitud en Estado NUEVA");
            }
        }

        else {
            alert("No se Selecciono ningun botton");
        }
    },
    GuardarFormulario: function (btn) {
        var me = this;
        if (btn.getText() == 'Rechazar Solicitud') {
            Funciones.AjaxRequestWin("SolicitudesMantenimiento", "AprobarRechazarSolicitudesMantenimiento", me.winRechazo, me.formRechazo, me.grid, "Esta Seguro de Rechazar la Solicitud", { ESTADO: 'NUEVA', ESTADO_DESTINO: 'RECH_INSP', OPCION: 'RECHAZADA' }, me.winRechazo);
        } else {
            Funciones.AjaxRequestWin("SolicitudesMantenimiento", "GrabarAprobacionSolicitudMantenimiento", me.win, me.formAprobacion, me.grid, "Esta Seguro de Confirmar la Aprobacion", { ESTADO: 'NUEVA', ESTADO_DESTINO: 'APROBADA', OPCION: 'APROBADA' }, me.win);
        }
    }
});
