Ext.define("App.View.Choferes.FormCambioGarante", {
    extend: "App.Config.Abstract.Form",
    //    title: "Datos de Orden de Trabajo",
    cargarStores: true,
    columns: 2,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();
        me.cargarEventos();
        this.callParent(arguments);
    },
    CargarComponentes: function () {
        var me = this;
        me.store_chofer = Ext.create('App.Store.Choferes.Choferes');

        me.cbx_chofer = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Buscar Chofer",
            name: "ID_CHOFER1",
            displayField: 'NRO_CHOFER',
            valueField: 'NOMBRE',
            store: me.store_chofer,
            textoTpl: function () { return "Nro Chofer :{NRO_CHOFER} - {NOMBRE} {APELLIDO_PATERNO} {APELLIDO_MATERNO}" }
        });


        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_Crear', 'Crear Chofer', Constantes.ICONO_CREAR, me.EventosForm, me.toolbar, this);
        Funciones.CrearMenu('btn_Editar', 'Modificar Chofer', Constantes.ICONO_EDITAR, me.EventosForm, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Baja', 'Baja Chofer', Constantes.ICONO_BAJA, me.EventosForm, me.toolbar, this, null, true);
        Funciones.CrearMenu('btn_Imagen', 'Imagen', 'image_add', me.EventosForm, me.toolbar, this, null, true);
//        me.toolbar.add(me.cbx_chofer);

//        me.formImagen = Ext.create('App.View.Choferes.ImageField', {
//            layout: 'anchor',
//            colspan: 1,
//            rowspan: 6
//        });
        me.formImagen = Ext.create('App.View.Choferes.Forms', {
            opcion: 'FormImagen',
            colspan: 1,
            width: 240,
            height: 170,
            rowspan: 8,
            //solo cuando el evento esta fuera del formulario se envia el scope
            //            EventosForm : me.EventosForm,
            scope: me
        });
        me.componentes = Ext.create("App.View.Choferes.Forms");
        me.componentes.ComponentesChofer(me);
        
        
        me.tbar = me.toolbar;

        me.CargarTabPanel();
        me.items = [
        me.formImagen,
        me.cbx_chofer,
        me.txt_id,
        me.txt_id_usr,
        me.num_id,
        me.num_nro_chofer,
        me.txt_nombre,
        me.txt_apellido_paterno,
        me.txt_apellido_materno,
        me.num_nro_licencia,
        me.cbx_categoria_lic,
        me.num_ci,
        me.cbx_expedido,
        me.dat_fecha_nac,
        me.dat_fecha_ingreso,
        me.dat_fecha_baja,
        me.txt_domicilio,
        
        me.cbx_estado_civil,
        me.cbx_socio,
        me.txt_estado,
        me.txt_telefono,
        me.txt_celular,
        me.txt_observacion,
        me.tabPanel
        ];

    },
    CargarTabPanel: function () {
        var me = this;

        me.toolbarFamiliares = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearFamiliar', 'Crear', Constantes.ICONO_CREAR, me.EventosForm, me.toolbarFamiliares, this);
        Funciones.CrearMenu('btn_EditarFamiliar', 'Editar', Constantes.ICONO_EDITAR, me.EventosForm, me.toolbarFamiliares, this, null, true);
        Funciones.CrearMenu('btn_BajaFamiliar', 'Baja', Constantes.ICONO_BAJA, me.EventosForm, me.toolbarFamiliares, this, null, true);
        me.gridFamiliares = Ext.create("App.View.Choferes.Grids", {
            opcion: 'GridFamiliares',
            height: 200,
            fbarmenu: me.toolbarFamiliares
        });
        me.gridFamiliares.on('itemclick', me.onItemClick, this);
        me.gridFamiliares.getSelectionModel().on('selectionchange', me.onSelectChange, this);

        me.toolbarDocumentos = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearDocumento', 'Crear', Constantes.ICONO_CREAR, me.EventosForm, me.toolbarDocumentos, this);
        Funciones.CrearMenu('btn_EditarDocumento', 'Editar', Constantes.ICONO_EDITAR, me.EventosForm, me.toolbarDocumentos, this);
        Funciones.CrearMenu('btn_BajaDocumento', 'Baja', Constantes.ICONO_BAJA, me.EventosForm, me.toolbarDocumentos, this);

        me.gridDocumentos = Ext.create("App.View.Choferes.Grids", {
            opcion: 'GridDocumentos',
            height: 200,
            fbarmenu: me.toolbarDocumentos
        });

        me.toolbarFondoAsalariado = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearFondoAsalariado', 'Crear', Constantes.ICONO_CREAR, me.EventosForm, me.toolbarFondoAsalariado, this);
        Funciones.CrearMenu('btn_EditarFondoAsalariado', 'Editar', Constantes.ICONO_EDITAR, me.EventosForm, me.toolbarFondoAsalariado, this);
        Funciones.CrearMenu('btn_BajaFondoAsalariado', 'Baja', Constantes.ICONO_BAJA, me.EventosForm, me.toolbarFondoAsalariado, this);
        me.gridFondoAsalariado = Ext.create("App.View.Choferes.Grids", {
            opcion: 'GridFondoAsalariado',
            height: 200,
            fbarmenu: me.toolbarFondoAsalariado
        });

        me.toolbarAntecedente = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearAntecedente', 'Crear', Constantes.ICONO_CREAR, me.EventosForm, me.toolbarAntecedente, this);
        Funciones.CrearMenu('btn_EditarAntecedente', 'Editar', Constantes.ICONO_EDITAR, me.EventosForm, me.toolbarAntecedente, this);
        Funciones.CrearMenu('btn_BajaAntecedente', 'Baja', Constantes.ICONO_BAJA, me.EventosForm, me.toolbarAntecedente, this);
        me.gridAntecedentes = Ext.create("App.View.Choferes.Grids", {
            opcion: 'GridAntecedentes',
            height: 200,
            fbarmenu: me.toolbarAntecedente
        });

        me.tabPanel = Ext.create('Ext.tab.Panel', {
            width: 960,
            height: 235,
            colspan: 4,
            items: [
                me.gridFamiliares,
                me.gridDocumentos,
                me.gridAntecedentes,
                me.gridFondoAsalariado

            ]
        });
    },
    cargarDatos: function (recordSelected) {
        var me = this;
        if (recordSelected != null) {
            me.loadRecord(recordSelected);
            me.gridFamiliares.store.setExtraParams({ ID_CHOFER: recordSelected.get('ID_CHOFER') });
            me.gridFamiliares.store.load();
        }
    },
    onItemClick: function (view, record, item, index, e) {
        var me = this;
        me.recordSelected = record;
    },
    onSelectChange: function (selModel, selections) {
        var me = this;
        var disabled = selections.length === 0;
        console.log('disbled: ' + disabled);
        Funciones.DisabledButton('btn_EditarFamiliar', me.toolbarFamiliares, disabled);
        Funciones.DisabledButton('btn_BajaFamiliar', me.toolbarFamiliares, disabled);
    },
    cargarEventos: function () {
        var me = this;
        me.cbx_chofer.on('select', function (cmb, record) {
            me.cargarDatos(record[0]);
            me.record = record[0];
            me.Bloquear();
            me.formImagen.CargarImagen(record[0].get('ID_IMG'));
        });
        me.txt_id.on('change', function (cmb, n, o) {
            var disabled = n === "";
            Funciones.DisabledButton('btn_Editar', me.toolbar, disabled);
//            Funciones.DisabledButton('btn_Baja', me.toolbar, disabled);
            Funciones.DisabledButton('btn_Imagen', me.toolbar, disabled);
        });

    },
    EventosForm: function (btn) {
        var me = this;
        switch (btn.getItemId()) {
            case "btn_Crear":
//                me.BotonesChofer(false);
                me.CrearChofer(true);

                break;
            case "btn_Editar":
//                me.BotonesChofer(false);
//alert("easdasd2");
                me.CrearChofer(false);

                break;
            case "btn_Crear_imagen":
                me.BotonesChofer(true);
                break;
            case "btn_Detalle":
                me.MostrarFormEgreso(false, true);
                break;
            case "btn_Eliminar":
                me.EliminarRegistro();
                break;
            case "btn_CrearFamiliar":
                me.FormFamiliar();
                break;
            case "btn_EditarFamiliar":
                me.FormFamiliar(true);
                break;
            case "btn_CrearDocumento":
                me.CrearDocumento();
                break;
            case "btn_CrearAntecedente":
                me.CrearAntecedente();
                break;
            case "btn_CrearFondoAsalariado":
                me.CrearFondoAsalariado();
                break;
            case "btn_Imagen":
                me.CrearImagen(true);
                break;
            default:
                Ext.Msg.alert("Aviso", "No Existe el botton");
        }
    },
//    CrearChofer: function (bool) {
//        var me = this;
//        if (bool) {
//            me.getForm().reset();
//        }
//        Funciones.DesbloquearFormularioReadOnly(me, ["FECHA_BAJA", "ESTADO"], false);
////        me.formImagen.modificar(true);
//        me.btn_guardar.on('click', me.GuardarChofer, me);
//    },
    CrearChofer: function (bool) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Choferes.Forms", {
            title : 'Datos Chofer',
            opcion: 'FormChofer',
            botones: false
        });
        if(bool == false){
            form.loadRecord(me.record);
             Funciones.DesbloquearFormularioReadOnly(form, ["FECHA_BAJA", "ESTADO"], false);
        }
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Choferes", "GuardarChofer", win, form, null, "Esta Seguro de Guardar", null, win);
//            Funciones.AjaxRequestForm("Choferes", "GuardarChofer", me, me, me.gridPrincipal, "Esta Seguro de Guardar Chofer", null, me);
        });
//        Funciones.BloquearFormularioReadOnly(form,["FECHA_INGRESO" , "TIPO_MOVIL"], "botones");
//        form.loadRecord(me.record);
        win.add(form);
        win.show();
    },
    BotonesChofer: function (hidden) {
        var me = this;
        if (me.btn_guardar) {
            if (hidden) {
                me.btn_guardar.hide();
                me.btn_limpiar.hide();
            }
            else {
                me.btn_guardar.show();
                me.btn_limpiar.show();
            }
        }

    },
    GuardarChofer: function () {
        var me = this;
        Funciones.AjaxRequestForm("Choferes", "GuardarChofer", me, me, me.gridPrincipal, "Esta Seguro de Guardar Chofer", null, me);
    },
    Bloquear: function () {
        Funciones.BloquearFormularioReadOnly(this, ["ID_CHOFER1"], "botones");
//        this.formImagen.modificar(false);
    },
    BloquearFormulario: function (result) {
        var me = this;
        me.BotonesChofer(true);
        me.txt_id.setValue(result.id);
        Funciones.BloquearFormularioReadOnly(me, ["ID_CHOFER1"], "botones");

    }, FormFamiliar: function (editar) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Choferes.Forms", {
            opcion: 'formFamiliar',
            columns: 1,
            botones: false
        });
        if (editar) {
            form.loadRecord(me.recordSelected);
        }
        else {
            form.txt_id_chofer.setValue(me.txt_id.getValue());
        }
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Familiares", "GuardarFamiliar", win, form, me.gridFamiliares, "Esta Seguro de Guardar", null, win);
        });
    },

    CrearDocumento: function (record) {

        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Choferes.Forms", {
            opcion: 'formDocumento',
            columns: 1,
            botones: false
        });
        if (record == null) {
            form.txt_id_socio.setValue(me.txt_id.getValue());
        }
        else {
            form.loadRecord(record);
        }
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Documentos", "GuardarDocumento", win, form, me.gridDocumentos, "Esta Seguro de Guardar", null, win);
        });
    },
    CrearAntecedente: function (record) {

        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Choferes.Forms", {
            opcion: 'formAntecedente',
            columns: 1,
            botones: false
        });
        if (record == null) {
            form.txt_id_socio.setValue(me.txt_id.getValue());
        }
        else {
            form.loadRecord(record);
        }
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("Antecedentes", "GuardarAntecedente", win, form, me.gridAntecedentes, "Esta Seguro de Guardar", null, win);
        });
    },
    CrearFondoAsalariado: function (record) {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Choferes.Forms", {
            opcion: 'formFondoAsalariado',
            columns: 1,
            botones: false
        });
        if (record == null) {
            form.txt_id_socio.setValue(me.txt_id.getValue());
        }
        else {
            form.loadRecord(record);
        }
        win.add(form);
        win.show();
        win.btn_guardar.on('click', function () {
            Funciones.AjaxRequestWin("FondoAsalariados", "GuardarFondoAsalariado", win, form, me.gridFondoAsalariado, "Esta Seguro de Guardar", null, win);
        });
    },
     CrearImagen: function () {
        var me = this;
        if (me.cbx_socio.getValue() != null) {
            var form = Ext.create("App.View.Imagenes.FormImagen", { opcion: 'FormImagen' });
            form.MostrarWindowImagen("SD_CHOFERES", me.cbx_chofer.datos[0].get('ID_CHOFER'), null);
        }
        else {
            Ext.MessageBox.alert('Error', "Seleccione un Registro");
        }
    },
});
