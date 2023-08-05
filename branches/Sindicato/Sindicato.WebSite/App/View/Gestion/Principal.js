Ext.define("App.View.Gestion.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.grid = Ext.create('App.View.Gestion.GridGestion', {
            region: 'west',
            width: '50%',
            fbarmenuArray: ["btn_cierre"]


        });
        //me.form = Ext.create("App.Config.Abstract.FormPanel");

        me.form = Ext.create("App.View.Gestion.FormCierre", {
            region: 'center',
            width: '50%',
            columns: 2,
            modoConsulta: true,

        });
        me.form.BloquearFormulario();

        me.btn_cierre = Funciones.CrearMenu('btn_cierre', 'Generar Cierre de Gestion1', 'folder_database', me.EventosPrincipal, null, this);

        me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_cierre]);

        me.items = [me.grid, me.form];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];
        if (me.record.get('ESTADO') == "INACTIVO") {
            me.form.loadRecord(me.record);
            me.form.gridDetalle.getStore().setExtraParams({ ID_GESTION: me.record.get("ID_GESTION") });
            me.form.gridDetalle.getStore().load();
        }
        else {
            me.form.LimpiarFormulario();
            me.form.gridDetalle.getStore().setExtraParams({ ID_GESTION: -1 });
            me.form.gridDetalle.getStore().load();
        }
    },

    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_cierre":
                me.FormCrearCierre();
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    
    FormCrearTransferenciaHojas: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Socios.TransferenciasHojasForm", {
            title: 'Datos de la Transferencia de Hojas',
            columns: 3,
            botones: false
        });
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Socios", "GuardarTransferenciaHojas", win, form, me.grid, "Esta Seguro de Guardar", null, win);

        });

    },

    FormCrearCierre: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true, showBtn3: false });
        var form = Ext.create("App.View.Gestion.FormCierre", {
            columns: 3,
            botones: false
        });
       
        //form.getForm().loadRecord(me.socio);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            if (form.isValid()) {
                Funciones.AjaxRequestWin("Cierres", "GuardarCierreGestion", win, form, me.grid, "Esta Seguro de Cerrar la GESTION ", null, win);
            }
            else {
                Ext.Msg.alert("Error", "Falta Completar Algun Datos. Revisar Formulario.");
            }
        });
        form.generarCierreGestion();

    }

  

});