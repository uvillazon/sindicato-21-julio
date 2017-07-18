Ext.define("App.View.Usuarios.Principal", {
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
        Funciones.CrearMenu('btn_Crear', 'Nuevo', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_Editar', 'Editar', Constantes.ICONO_EDITAR, me.EventosPrincipal, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_CrearPerfil', 'Perfiles', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this);
        Funciones.CrearMenu('btn_Imprimir', 'Imprimir', 'printer', me.ImprimirReporteGrid, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Detalle', 'Detalle', 'report', me.EventosCliente, me.toolbar, this);
        //        Funciones.CrearMenu('btn_Kardex', 'Kardex', 'report', me.EventosCliente, me.toolbar, this);

        me.grid = Ext.create('App.View.Usuarios.GridUsuarios', {
            region: 'center',
            height: 350,
            imagenes: false,
            opcion: 'GridUsuarios',
            toolbar: me.toolbar
        });
        me.items = [me.grid];
        me.grid.getSelectionModel().on('selectionchange', me.onSelectChange, this);
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        me.record = selections[0];
        Funciones.DisabledButton('btn_Editar', me.toolbar, disabled);
        //        Funciones.DisabledButton('btn_Kardex', me.toolbar, disabled);
    },
    EventosPrincipal: function (btn) {
        var me = this;
        if (btn.getItemId() == "btn_Crear" || btn.getItemId() == "btn_Editar") {

            var win = Ext.create("App.Config.Abstract.Window", { botones: true });
            var form = Ext.create("App.View.Usuarios.FormUsuario", {
                columns: 2,
                title: 'Formulario de Usuario',
                botones: false
            })
            if (btn.getItemId() == "btn_Editar") {
                form.CargarDatos(me.record);
            }
            win.add(form);
            win.show();
            win.btn_guardar.on('click', function () {
                Funciones.AjaxRequestWinArray("Usuarios", "GuardarUsuario", win, form, me.grid, null, null, [win]);
                //                alert("Saludos");
            });
        }
        else if (btn.getItemId() == "btn_CrearPerfil") {
//            alert("asdasd");
            var win = Ext.create("App.Config.Abstract.Window", { botones: false });
            var form = Ext.create("App.View.Usuarios.Forms", {
                columns: 2,
                opcion: 'FormPerfil',
                title: 'Administracion de Perfiles',
                botones: false
            })
            win.add(form);
            win.show();
        }
        else {
            Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    }
});
