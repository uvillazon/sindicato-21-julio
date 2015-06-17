Ext.define("App.View.Choferes.FormChofer", {
    extend: "App.Config.Abstract.Form",
    //    title: "Datos de Orden de Trabajo",
    cargarStores: true,
    columns: 2,
    gridPrincipal: null,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        //me.cargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        //me.store_chofer = Ext.create('App.Store.Choferes.Choferes');

        //me.cbx_chofer = Ext.create("App.Config.Componente.ComboAutoBase", {
        //    fieldLabel: "Buscar Chofer",
        //    name: "ID_CHOFER1",
        //    displayField: 'NRO_CHOFER',
        //    valueField: 'NOMBRE',
        //    store: me.store_chofer,
        //    textoTpl: function () { return "Nro Chofer :{NRO_CHOFER} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        //});


        //me.toolbar = Funciones.CrearMenuBar();
        //Funciones.CrearMenu('btn_Crear', 'Crear Chofer', Constantes.ICONO_CREAR, me.EventosForm, me.toolbar, this);
        //Funciones.CrearMenu('btn_Editar', 'Modificar Chofer', Constantes.ICONO_EDITAR, me.EventosForm, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_Baja', 'Baja Chofer', Constantes.ICONO_BAJA, me.EventosForm, me.toolbar, this, null, true);
        //Funciones.CrearMenu('btn_Imagen', 'Imagen', 'image_add', me.EventosForm, me.toolbar, this, null, true);
//        me.toolbar.add(me.cbx_chofer);

//        me.formImagen = Ext.create('App.View.Choferes.ImageField', {
//            layout: 'anchor',
//            colspan: 1,
//            rowspan: 6
//        });
        //me.formImagen = Ext.create('App.View.Choferes.Forms', {
        //    opcion: 'FormImagen',
        //    colspan: 1,
        //    width: 240,
        //    height: 170,
        //    rowspan: 8,
        //    //solo cuando el evento esta fuera del formulario se envia el scope
        //    //            EventosForm : me.EventosForm,
        //    scope: me
        //});
        me.formImagen = Ext.create('App.View.Imagenes.ViewImagenes', {
            //opcion: 'FormImagen',
            colspan: 2,
            height: 300,
            //width: 550,
            //height: 250,
            TABLA: 'SD_CHOFERES'
            //ID_TABLA :15
        });
        me.panelImagen = Ext.create('Ext.panel.Panel', {
            title: 'Visor de Imagenes',
            //width: 200,
            colspan: 2,
            items: [me.formImagen]
        });
        me.componentes = Ext.create("App.View.Choferes.Forms");
        me.componentes.ComponentesChofer(me);
        
        //me.txt_telefono.colspan = 2;
        //me.txt_celular.colspan = 2;
        //me.txt_observacion.colspan = 2;
        //me.txt_estado.colspan = 2;
        //me.tbar = me.toolbar;

        //me.CargarTabPanel();
        me.items = [
        me.txt_id,
        me.txt_id_usr,
        me.num_id,
        me.num_nro_chofer,        me.txt_nombre,
        me.txt_apellido_paterno,        me.txt_apellido_materno,
        me.num_nro_licencia,        me.cbx_categoria_lic,
        me.num_ci, me.cbx_expedido,
         me.cbx_estado_civil, me.txt_telefono,
        me.txt_celular, me.txt_estado,
        me.dat_fecha_nac,        me.dat_fecha_ingreso,
        me.dat_fecha_baja,
        me.txt_domicilio,
        me.cbx_socio,
      
        me.txt_observacion,
        me.panelImagen
        //me.tabPanel
        ];

    }
});
