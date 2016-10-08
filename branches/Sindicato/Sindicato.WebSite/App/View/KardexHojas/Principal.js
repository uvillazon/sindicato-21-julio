Ext.define("App.View.KardexHojas.Principal", {
    extend: "App.Config.Abstract.PanelPrincipal",
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;

        //me.toolbar = Funciones.CrearMenuBar();
        //Funciones.CrearMenu('btn_Detalle', 'Detalle Socio', 'report', me.EventosPrincipal, me.toolbar, this);
        //Funciones.CrearMenu('btn_Crear', 'Crear Auto', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this, null, false);
        //Funciones.CrearMenu('btn_Editar', 'Editar Auto', Constantes.ICONO_CREAR, me.EventosPrincipal, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_Imagen', 'Imagen', 'image_add', me.EventosPrincipal, me.toolbar, this, null, true);


        me.grid = Ext.create('App.View.KardexHojas.GridKardexHojas', {
            region: 'center',
            width: '100%',
            //fbarmenu: me.toolbar,
            //fbarmenuArray: ["btn_Editar", "btn_Imagen"]

        });

        //me.grid.AgregarBtnToolbar([me.btn_crear, me.btn_editar, me.btn_crearMovil, me.btn_editarMovil, me.btn_crearImagen]);

        //me.form = form = Ext.create("App.View.Autos.FormAuto", {
        //    title: 'Datos Automovil',
        //    botones: false,
        //    region: 'center',
        //    width: '50%',
        //});
        //me.form.BloquearFormulario();

        me.items = [me.grid];
        //me.grid.getSelectionModel().on('selectionchange', me.CargarDatos, this);

    },
  
});