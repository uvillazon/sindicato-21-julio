Ext.define("App.View.Descuentos.Principal", {
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
        Funciones.CrearMenu('btn_aprobar', 'Aprobar Descuento', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_debitar', 'Debistar Descuento', 'folder_database', me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_ConfigObligacion', 'Configuracion Obligaciones', 'cog', me.EventosPrincipal, me.toolbar, this, null, true);



        me.grid = Ext.create('App.View.Descuentos.GridDescuentos', {
            region: 'west',
            width: '50%',
            fbarmenu: me.toolbar,
            fbarmenuArray: ["btn_debitar", "btn_eliminar", "btn_editar", "btn_aprobar"]

        });
        me.btn_crear = Funciones.CrearMenu('btn_crear', 'Crear Descuento', Constantes.ICONO_CREAR, me.EventosPrincipal, null, this);
        me.btn_editar = Funciones.CrearMenu('btn_editar', 'Editar Descuento', Constantes.ICONO_EDITAR, me.EventosPrincipal, null, this, null, true);
        me.btn_eliminar = Funciones.CrearMenu('btn_eliminar', 'Eliminar Descuento', Constantes.ICONO_BAJA, me.EventosPrincipal, null, this, null, true);
        me.grid.AgregarBtnToolbar([me.btn_crear,me.btn_editar, me.btn_eliminar]);
        //me.formulario = Ext.create("App.Config.Abstract.FormPanel");

        me.gridDetalles = Ext.create('App.View.Descuentos.GridDetalles', {
            width: '100%',
            height : 400
            
        });
        me.form = Ext.create("App.View.Descuentos.FormDescuento", {
            //region: 'center',
            //width: '50%',
            columns: 2,
            modoConsulta : true
        });
        me.form.BloquearFormulario();
      
        me.panel = Ext.create("Ext.panel.Panel", {
            region: 'center',
            width: '50%',
            items: [me.form, me.gridDetalles]
        });
        //        me.grid.bar.add(me.toolbar);
        me.items = [me.grid, me.panel];
        me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
    CargarDatos: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = disabled ? null : selections[0];
        if (!disabled) {
            me.form.getForm().loadRecord(selections[0])
            //me.form.CargarDatos(selections[0]);

        }
        else {
            me.form.getForm().reset();
          
        }
    },
   
    EventosPrincipal: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_crear":
                me.FormCrearDeposito();
                break;
            //case "btn_eliminar":
            //    Funciones.AjaxRequestGrid("Socios", "EliminarRetiroSocio", me.grid, "Esta seguro de Eliminar el Retiro?", { ID_RETIRO: me.record.get('ID_RETIRO') }, me.grid, null);
            //    break;
            //case "btn_Kardex":
            //    me.VentanaKardex();
            //    break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
                break;
        }
    },
    FormCrearDeposito: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Descuentos.FormDescuento", {
            title: 'Datos Descuento',
            columns: 2,
            botones: false
        });
        //form.txt_socio.setVisible(false);
        //form.getForm().loadRecord(me.socio);
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            //console.dir(params);
            Funciones.AjaxRequestWin("Socios", "GuardarRetiroSocio", win, form, me.grid, "Esta Seguro de Guardar", null, win);
        });

    },
    //VentanaKardex: function () {
    //    var me = this;
    //    var win = Ext.create("App.Config.Abstract.Window", { botones: false });
    //    var grid = Ext.create("App.View.Socios.GridKardex", {
    //        region: 'center',
    //        width: 760,
    //        height: 450,
    //        id_socio: me.record.get('ID_SOCIO')
    //    });
    //    win.add(grid);
    //    win.show();
    //}

});