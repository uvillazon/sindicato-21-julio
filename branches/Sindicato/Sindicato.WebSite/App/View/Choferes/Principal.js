Ext.define("App.View.Choferes.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
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

        me.toolbar = Funciones.CrearMenuBar();
        //        Funciones.CrearMenu('btn_Crear', 'Nuevo', Constantes.ICONO_CREAR, me.EventosCliente, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosCliente, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Eliminar', 'Eliminar', Constantes.ICONO_BAJA, me.EventosCliente, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        Funciones.CrearMenu('btn_Detalle', 'Detalle Chofer (F4)', 'report', me.EventosPrincipal, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Kardex', 'Kardex', 'report', me.EventosCliente, me.toolbar, this);

        me.grid = Ext.create('App.View.Choferes.GridChoferes', {
            region: 'center',
            opcion: 'GridPrincipal',
            width: '100%',
            height: '100%',
            fbarmenu: me.toolbar

        });
        //        me.grid.bar.add(me.toolbar);
        me.items = [me.grid];
        me.grid.on('itemclick', me.onItemClick, this);

    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.recordSelected = record;
    },
    EventosPrincipal: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_Detalle") {
            me.MostrarForm();
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }, MostrarForm: function () {
        var me = this;
        if (me.win == null) {
            me.win = Ext.create("App.Config.Abstract.Window");
            me.form = Ext.create("App.View.Choferes.FormChofer", {
                columns: 4,
                title: 'Formulario de Registro de Choferes ',
                botones: true,
                gridPrincipal: me.grid
            })
            me.form.BotonesChofer(true);
            me.win.add(me.form);
        } else {
            me.form.getForm().reset();
        }

        if (!Funciones.isEmpty(me.recordSelected)) {
            me.form.cargarDatos(me.recordSelected);
        }
        me.win.show();
        me.form.Bloquear();
    }
});
