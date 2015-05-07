Ext.define("App.View.Socios.FormSocio", {
    extend: "App.Config.Abstract.Form",
    //    title: "Datos de Orden de Trabajo",gertertertert
    cargarStores: true,
    columns: 2,
    gridPrincipal: null,
    initComponent: function () {
        var me = this;
        me.CargarComponentes();

        //me.cargarEventos();
        this.callParent(arguments);
        //Funciones.BloquearFormularioReadOnly(me, ["ID_SOCIO1"], "botones");
    },
    CargarComponentes: function () {
        var me = this;

       
//        me.toolbar = Funciones.CrearMenuBar();
//        Funciones.CrearMenu('btn_Crear', 'Crear Socio', Constantes.ICONO_CREAR, me.EventosForm, me.toolbar, this);
//        Funciones.CrearMenu('btn_Editar', 'Modificar Socio','user_edit', me.EventosForm, me.toolbar, this, null, true);
//        Funciones.CrearMenu('btn_EditarMovil', 'Modificar Movil', Constantes.ICONO_EDITAR, me.EventosForm, me.toolbar, this, null, true);
////        Funciones.CrearMenu('btn_Baja', 'Baja Socio', Constantes.ICONO_BAJA, me.EventosForm, me.toolbar, this, null, true);
//        Funciones.CrearMenu('btn_Imagen', 'Imagen', 'image_add', me.EventosForm, me.toolbar, this, null, true);
        //        me.toolbar.add(me.cbx_socio);
        me.formImagen = Ext.create('App.View.Socios.Forms', {
            opcion: 'FormImagen',
            colspan: 2,
            width: 480,
            height: 250,
            //solo cuando el evento esta fuera del formulario se envia el scope
            //            EventosForm : me.EventosForm,
            scope: me
        });
        
        me.txt_id_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_MOVIL",
            hidden: true
        });
        me.num_nro_socio = Ext.create("App.Config.Componente.NumberFieldBase", {
            fieldLabel: "Nro Movil",
            name: "NRO_MOVIL",
            width: 240,
            maxLength: 7,
            allowNegative: false,
            allowDecimals: false,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_tipo_movil = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Tipo Movil",
            name: "TIPO_MOVIL",
            
        });
        me.componentes = Ext.create("App.View.Socios.Forms");
        me.componentes.ComponentesSocio(me);
        me.txt_telefono.colspan = 2;
        me.txt_celular.colspan = 2;
        me.txt_observacion.colspan = 2;
        //me.CargarTabPanel();
        me.items = [
            me.formImagen,
            me.txt_id_socio,
            me.txt_id_movil,
            me.cbx_socio,
            me.num_nro_socio,
            me.txt_tipo_movil,
            me.num_ci,
            me.cbx_expedido,
            me.txt_nombre,
            me.txt_apellido_paterno,
            me.txt_apellido_materno,
            me.cbx_estado_civil,
            me.num_nro_licencia,
            me.cbx_categoria_lic,
            me.dat_fecha_nac,
          
            me.dat_fecha_ingreso,
            me.dat_fecha_baja,
            me.txt_telefono ,
            me.txt_celular,
            me.txt_domicilio,

            me.txt_observacion,
              me.txt_estado,
            //me.tabPanel

        ];
    },
//    CargarTabPanel: function () {
//        var me = this;

//        me.toolbarAuto = Funciones.CrearMenuBar();
//        Funciones.CrearMenu('btn_CrearAuto', 'Crear', Constantes.ICONO_CREAR, me.EventosForm, me.toolbarAuto, this);
//        Funciones.CrearMenu('btn_EditarAuto', 'Editar', Constantes.ICONO_EDITAR, me.EventosForm, me.toolbarAuto, this,null,true);
//        Funciones.CrearMenu('btn_ImagenAuto', 'Imagen', 'image_add', me.EventosForm, me.toolbarAuto, this,null,true);
//        me.gridAutos = Ext.create("App.View.Socios.Grids", {
//            opcion: 'GridAutomoviles',
//            height: 200,;
//            fbarmenu: me.toolbarAuto
//        });
//         me.gridAutos.getSelectionModel().on('selectionchange', me.onSelectChangeAuto, this);

//        me.toolbarFamiliares = Funciones.CrearMenuBar();
//        Funciones.CrearMenu('btn_CrearFamiliar', 'Crear', Constantes.ICONO_CREAR, me.EventosForm, me.toolbarFamiliares, this);
//        Funciones.CrearMenu('btn_EditarFamiliar', 'Editar', Constantes.ICONO_EDITAR, me.EventosForm, me.toolbarFamiliares, this);
//        Funciones.CrearMenu('btn_BajaFamiliar', 'Baja', Constantes.ICONO_BAJA, me.EventosForm, me.toolbarFamiliares, this);
//        me.gridFamiliares = Ext.create("App.View.Socios.Grids", {
//            opcion: 'GridFamiliares',
//            height: 200,
//            fbarmenu: me.toolbarFamiliares
//        });

//        me.toolbarDocumentos = Funciones.CrearMenuBar();
//        Funciones.CrearMenu('btn_CrearDocumento', 'Crear', Constantes.ICONO_CREAR, me.EventosForm, me.toolbarDocumentos, this);
//        Funciones.CrearMenu('btn_EditarDocumento', 'Editar', Constantes.ICONO_EDITAR, me.EventosForm, me.toolbarDocumentos, this);
//        Funciones.CrearMenu('btn_BajaDocumento', 'Baja', Constantes.ICONO_BAJA, me.EventosForm, me.toolbarDocumentos, this);

//        me.gridDocumentos = Ext.create("App.View.Socios.Grids", {
//            opcion: 'GridDocumentos',
//            height: 200,
//            fbarmenu: me.toolbarDocumentos
//        });

//        me.toolbarDesempeno = Funciones.CrearMenuBar();
//        Funciones.CrearMenu('btn_CrearDesempeno', 'Crear', Constantes.ICONO_CREAR, me.EventosForm, me.toolbarDesempeno, this);
//        Funciones.CrearMenu('btn_EditarDesempeno', 'Editar', Constantes.ICONO_EDITAR, me.EventosForm, me.toolbarDesempeno, this);
//        Funciones.CrearMenu('btn_BajaDesempeno', 'Baja', Constantes.ICONO_BAJA, me.EventosForm, me.toolbarDesempeno, this);
//        me.gridDesempeno = Ext.create("App.View.Socios.Grids", {
//            opcion: 'GridDesempenos',
//            height: 200,
//            fbarmenu: me.toolbarDesempeno
//        });

//        me.toolbarAntecedente = Funciones.CrearMenuBar();
//        Funciones.CrearMenu('btn_CrearAntecedente', 'Crear', Constantes.ICONO_CREAR, me.EventosForm, me.toolbarAntecedente, this);
//        Funciones.CrearMenu('btn_EditarAntecedente', 'Editar', Constantes.ICONO_EDITAR, me.EventosForm, me.toolbarAntecedente, this);
//        Funciones.CrearMenu('btn_BajaAntecedente', 'Baja', Constantes.ICONO_BAJA, me.EventosForm, me.toolbarAntecedente, this);
//        me.gridAntecedentes = Ext.create("App.View.Socios.Grids", {
//            opcion: 'GridAntecedentes',
//            height: 200,
//            fbarmenu: me.toolbarAntecedente
//        });

//        me.tabPanel = Ext.create('Ext.tab.Panel', {
//            width: 960,
//            height: 230,
//            colspan: 4,
//            items: [
//                me.gridAutos,
//                me.gridFamiliares,
//                me.gridDocumentos,
//                me.gridDesempeno,
//                me.gridAntecedentes
//            ]
//        });
//    },
//    onSelectChangeAuto: function (selModel, selections) {
//        var me = this;
//        var disabled = selections.length === 0;
//        me.recordAuto = disabled ? null : selections[0];
//        console.log('disbled: ' + disabled);
//        Funciones.DisabledButton('btn_ImagenAuto', me.toolbarAuto, disabled);
////        Funciones.DisabledButton('btn_BajaFamiliarbtn_ImagenAuto', me.toolbarFamiliares, disabled);
//    },
//    cargarEventos: function () {
//        var me = this;
//        me.cbx_socio.on('select', function (cmb, record) {
//            me.loadRecord(record[0]);
//            me.record = record[0];
//            Funciones.BloquearFormularioReadOnly(me, ["ID_SOCIO1"], "botones");
//            me.gridFamiliares.getStore().setExtraParams({ ID_SOCIO: record[0].get('ID_SOCIO') });
//            me.gridFamiliares.getStore().load();
//            me.gridAutos.getStore().setExtraParams({ ID_MOVIL: record[0].get('ID_MOVIL') });
//            me.gridAutos.getStore().load();
////            alert("asdas2");
//            me.formImagen.CargarImagen(record[0].get('ID_IMG'));
//        });
//        me.txt_id_movil.on('change', function (cmb, n, o) {
//            var disabled = n === "";
//            Funciones.DisabledButton('btn_Editar', me.toolbar, disabled);
//            Funciones.DisabledButton('btn_EditarMovil', me.toolbar, disabled);
//            Funciones.DisabledButton('btn_Baja', me.toolbar, disabled);
//            Funciones.DisabledButton('btn_Imagen', me.toolbar, disabled);

//        });
//    },
//    EventosForm: function (btn) {
//        var me = this;
//        switch (btn.getItemId()) {
//            case "btn_Crear":
////                me.BotonesSocio(false);
//                me.CrearSocio(true);

//                break;
//            case "btn_Editar":
////                me.BotonesSocio(false);
//                me.CrearSocio(false);
//                break;
//            case "btn_EditarMovil":
//                me.EditarLinea();
//                break;
            
//            case "btn_Imagen":
//                me.CrearImagen(true);
//                break;
//            case "btn_Detalle":
//                me.MostrarFormEgreso(false, true);
//                break;
//            case "btn_Eliminar":
//                me.EliminarRegistro();
//                break;
//            case "btn_CrearFamiliar":
//                me.CrearFamiliar();
//                break;
//            case "btn_EditarFamiliar":
//                if (me.gridFamiliares.record != null) {
//                    me.CrearFamiliar(me.gridFamiliares.record);
//                }
//                else {
//                    Ext.Msg.alert("Error", "Seleccione un Registro...");
//                }
//                break;
//            case "btn_CrearAuto":
//                if (me.record != null){
//                    me.FormAuto();
//                }
//                else {Ext.Msg.alert("Aviso","Seleccione un Registro")}
//                break;
//            case "btn_ImagenAuto":
//                me.CrearImagenAuto(true);
//                break;
                
//            default:
//                Ext.Msg.alert("Aviso", "No Existe el botton");
//        }
//    },
//    CrearImagenAuto: function () {
//        var me = this;
//        if (me.recordAuto != null) {
//            var form = Ext.create("App.View.Imagenes.FormImagen", { opcion: 'FormImagen' });
//            form.MostrarWindowImagen("SD_AUTOS", me.recordAuto.get('ID_AUTO'), null);
//        }
//        else {
//            Ext.MessageBox.alert('Error', "Seleccione un Registro");
//        }
//    },
//    CrearImagen: function () {
//        var me = this;
//        if (me.cbx_socio.getValue() != null) {
//            var form = Ext.create("App.View.Imagenes.FormImagen", { opcion: 'FormImagen' });
//            form.MostrarWindowImagen("SD_SOCIOS", me.cbx_socio.datos[0].get('ID_SOCIO'), null);
//        }
//        else {
//            Ext.MessageBox.alert('Error', "Seleccione un Registro");
//        }
//    },
//    EditarLinea : function(){
//        var me = this;
//        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
//        var form = Ext.create("App.View.Socios.Forms", {
//            title : 'Datos Socio Movil',
//            opcion: 'FormMovil',
//            botones: false
//        });
//        Funciones.BloquearFormularioReadOnly(form,["FECHA_ALTA","OBSERVACION" ,"DESCRIPCION" , "TIPO_MOVIL"], "botones");
////        form.loadRecord(me.record);
//        form.loadFormulario('Socios', 'ObtenerSocioMovil', {ID_SOCIO_MOVIL  : me.record.get('ID_SOCIO_MOVIL')});
//        win.add(form);
//        win.show();
//        win.btn_guardar.on('click', function () {
//            Funciones.AjaxRequestWin("Socios", "GuardarSocioMovil", win, form, null, "Esta Seguro de Guardar", null, win);
//        });
//    },
//    CrearSocio: function (bool) {
//        var me = this;
//        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
//        var form = Ext.create("App.View.Socios.Forms", {
//            title : 'Datos Socio',
//            opcion: 'FormSocio',
//            botones: false
//        });
//        if(bool == false){
//            form.loadRecord(me.record);
//        }
//        win.btn_guardar.on('click', function () {
//            Funciones.AjaxRequestWin("Socios", "GuardarSocio", win, form, null, "Esta Seguro de Guardar", null, win);
//        });
////        Funciones.BloquearFormularioReadOnly(form,["FECHA_INGRESO" , "TIPO_MOVIL"], "botones");
////        form.loadRecord(me.record);
//        win.add(form);
//        win.show();
//    },
//    BotonesSocio: function (hidden) {
//        var me = this;
//        if (hidden) {
//            me.btn_guardar.hide();
//            me.btn_limpiar.hide();
//        }
//        else {
//            me.btn_guardar.show();
//            me.btn_limpiar.show();
//        }
//    },
//    GuardarSocio: function () {
//        var me = this;
//        Funciones.AjaxRequestForm("Socios", "GuardarSocio", me, me, me.gridPrincipal, "Esta Seguro de Guardar Socio", null, me);
//    },
//    BloquearFormulario: function (result) {
//        var me = this;
//        me.BotonesSocio(true);
//        me.txt_id.setValue(result.id);
//        Funciones.BloquearFormularioReadOnly(me, ["ID_SOCIO1"], "botones");
//    },
//    CrearFamiliar: function (record) {
//        var me = this;
//        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
//        var form = Ext.create("App.View.Socios.Forms", {
//            opcion: 'formFamiliar',
//            botones: false
//        });
//        if (record == null) {
//            form.txt_id_socio.setValue(me.txt_id.getValue());
//        }
//        else {
//            form.loadRecord(record);

//        }
//        win.add(form);
//        win.show();
//        win.btn_guardar.on('click', function () {
//            Funciones.AjaxRequestWin("Familiares", "GuardarFamiliar", win, form, me.gridFamiliares, "Esta Seguro de Guardar", null, win);
//        });
//    },
//    FormAuto: function (editar) {
//        var me = this;
//        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
//        var form = Ext.create("App.View.Socios.Forms.FormAuto", {
////            opcion: 'formFamiliar',
//            columns: 2,
//            botones: false
//        });
//        if (editar) {
//            form.loadRecord(me.recordSelected);
//        }
//        else {
//            form.txt_id_movil.setValue(me.txt_id_movil.getValue());
//        }
//        win.add(form);
//        win.show();
//        win.btn_guardar.on('click', function () {
//            Funciones.AjaxRequestWin("Socios", "GuardarAuto", win, form, me.gridAutos, "Esta Seguro de Guardar", null, win);
//        });
//    },
});
