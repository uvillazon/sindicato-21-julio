﻿Ext.define("App.View.Cierres.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_generar', 'Generar', 'cog', me.EventosPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_cerrar', 'Cerrar Periodo', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.Cierres.GridCierres', {
            region: 'west',
            width: '50%',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_generar", "btn_cerrar"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Periodo', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        //me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Eliminar Periodo', Constantes.ICONO_BAJA, me.EventosPrincipal,null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_eliminar]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

      

        me.form = Ext.create("App.View.Cierres.FormCierre", {
            //region: 'center',
            //width: '50%',
            columns: 2,
            Eventos : false
        });
        me.form.BloquearFormulario();
        me.gridCierreSocio = Ext.create('App.View.Cierres.GridCierreSocios');
        me.tabPanel = Ext.create('Ext.tab.Panel', {
            items: [
                me.form, me.gridCierreSocio
            ],
            region: 'center',
            width: '50%'
        });

        //        me.grid.bar.add(me.toolbar);
        me.items = [me.grid, me.tabPanel];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];
        if (!disabled) {
            me.form.getForm().loadRecord(selections[0]);
            me.gridCierreSocio.getStore().setExtraParams({ ID_CIERRE: me.record.get('ID_CIERRE') });
            me.gridCierreSocio.getStore().load();
            //me.form.CargarDatos(selections[0]);

        }
        else {
            me.form.getForm().reset();
            me.gridCierreSocio.getStore().removeAll();
          
        }
    },
   
    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_crear":
                me.FormCrearCierre();
                break;
            case "btn_generar":
                Funciones.AjaxRequestGrid("Cierres", "GenerarDetalleCierre", me, "Esta seguro de Generar Detalle Periodo Socio?", { ID_CIERRE: me.record.get('ID_CIERRE') }, me.gridCierreSocio, null);
                break;
            //case "btn_Kardex":
            //    me.VentanaKardex();
            //    break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    FormCrearCierre: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Cierres.FormCierre", {
            //title: 'Datos Cierre Sistema',
            columns: 2,
            botones: false
        });
        form.ObtenerUltimoRegistro();
        //form.getForm().loadRecord(me.socio);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            Funciones.AjaxRequestWin("Cierres", "GuardarCierre", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });

    }

});