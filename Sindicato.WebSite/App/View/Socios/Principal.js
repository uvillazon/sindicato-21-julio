Ext.define("App.View.Socios.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    controlador: 'Clientes',
    accionGrabar: 'GrarbarCliente',
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
        Funciones.CrearMenu('btn_Detalle', 'Detalle Socio', 'report', me.EventosPrincipal, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Kardex', 'Kardex', 'report', me.EventosCliente, me.toolbar, this);
        Funciones.CrearMenu('btn_ImprimirReporte', 'Imprimir Reporte', 'printer', me.EventosPrincipal, me.toolbar, this);
        me.grid = Ext.create('App.View.Socios.GridSocios', {
            region: 'center',
            opcion: 'GridSocios',
            width: '100%',
            height: '100%',
            fbarmenu: me.toolbar

        });
        //        me.grid.bar.add(me.toolbar);
        me.items = [me.grid];

    },
    EventosPrincipal: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_Detalle") {
            var win = Ext.create("App.Config.Abstract.Window", {gridLoads : [me.grid]});
            var form = Ext.create("App.View.Socios.FormSocio", {
                columns: 4,
                title: 'Formulario de Registro de Socios (Afiliados) ',
                botones: true,
                gridPrincipal: me.grid
            })
            form.BotonesSocio(true);
            win.add(form);
            win.show();
        }
        else if (btn.getItemId() == "btn_ImprimirReporte") {
            var win = Ext.create("App.Config.Abstract.Window", { botones: true, title: 'Datos de Reporte' });
            var form = Ext.create("App.View.Socios.Forms", { opcion: 'FormReporte' });
            win.add(form);
            win.show();
            win.btn_guardar.on('click', function () {
                window.open(Constantes.HOST + 'Reportes/ReporteSocioMovil?fecha=' + form.dat_fecha.getSubmitValue());
            });


        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }

});
