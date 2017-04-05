Ext.define("App.View.Usuarios.Forms", {
    extend: "App.Config.Abstract.Form",
    title: "",
    botones: false,
    columns: 2,
    initComponent: function () {
        var me = this;
        if (me.opcion == "FormPerfil") {
            //            me.title = "Subtotales";
            me.CargarFormPerfil();
            me.eventosFormPerfil();
        }
        else if (me.opcion == 'FormCrearPerfil') {
            me.title = "Datos Perfil";
            me.CargarFormCrearPerfil();
        }
        else if (me.opcion == 'FormCrearPerfilMenu') {
            me.title = "Datos Perfil Menu";
            me.CargarFormFormCrearPerfilMenu();
        }
        else{
            Ext.Msg.alert("Error","no existe opcion");
        }
        this.callParent(arguments);
    },
    CargarFormFormCrearPerfilMenu : function(){
        var me = this;
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre",
            name: "NOMBRE",
            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
        });
         me.txt_descripcion = Ext.create("App.Config.Componente.TextAreaBase", {
            fieldLabel: "Descripcion",
            name: "DESCRIPCION",
//            afterLabelTextTpl: Constantes.REQUERIDO,
//            allowBlank: false,
        });
        me.items =[
            me.txt_nombre,
            me.txt_descripcion
        ];
    },
    CargarFormCrearPerfil: function () {
        var me = this;
         me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            name: "ID_PERFIL",
//            colspan : 2,
            hidden : true
        });
        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Perfil",
            name: "NOMBRE",
//            colspan : 2,
            readOnly : true
        });
        me.store_menu = Ext.create('App.Store.Usuarios.MenuOpciones');
        me.cbx_menu = Ext.create("App.Config.Componente.ComboAutoBase", {
            fieldLabel: "Opcion",
            name: "ID_OPC",
            displayField: 'OPCION',
            valueField: 'ID_OPC',
            store: me.store_menu,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            textoTpl: function () { return "<h3>{OPCION} </h3>- {TOOLTIP}" }
        });
        
        me.items =[
            me.txt_id,
            me.txt_nombre,
            me.cbx_menu
        ];

    },
    CargarFormPerfil: function () {
        var me = this;
        me.toolbar = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearPerfil', 'Crear Perfil', Constantes.ICONO_CREAR, me.eventosGridPerfil, me.toolbar, this);

        //        Funciones.CrearMenu('btn_EliminarPerfil', 'Eliminar', Constantes.ICONO_Baja, me.EventosPerfil, me.toolbar, this, null, true);

        me.gridPerfiles = Ext.create("App.View.Usuarios.Grids", {
            width: 360,
            opcion: 'GridPerfiles',
            height: 400
        });
        me.gridPerfiles.addDocked(me.toolbar, 1);
        me.gridMenu = Ext.create("App.View.Usuarios.Grids", {
            width: 360,
            opcion: 'GridMenuOpciones',
            height: 400
        });
        me.toolbarMenu = Funciones.CrearMenuBar();
        Funciones.CrearMenu('btn_CrearMenu', 'Crear Menu', Constantes.ICONO_CREAR, me.CrearMenuOpcion, me.toolbarMenu, this,null,true);
        Funciones.CrearMenu('btn_EliminarMenu', 'Eliminar Menu', Constantes.ICONO_BAJA, me.EliminarMenuOpcion, me.toolbarMenu, this,null,true);
        me.gridMenu.addDocked(me.toolbarMenu, 1);
        me.items = [
           me.gridPerfiles,
        //           me.txt_diesel,
           me.gridMenu
        ];
    },
    CrearMenuOpcion : function(){
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Usuarios.Forms", {
            columns: 1,
            opcion: 'FormCrearPerfil',
            title: 'Datos de Perfil',
            botones: false
        })
        form.loadRecord(me.recordPerfil);
        win.add(form);
        win.show();
        win.btn_guardar.on('click',function(){
            Funciones.AjaxRequestWinArray("MenuOpciones", "GuardarPerfilOpcion", win, form, me.gridMenu,"Esta Seguro de Guardar?", null, [win]);
        });
    },
    eventosGridPerfil: function () {
        var me = this;
        var win = Ext.create("App.Config.Abstract.Window", { botones: true });
        var form = Ext.create("App.View.Usuarios.Forms", {
            columns: 2,
            opcion: 'FormCrearPerfilMenu',
            title: 'Datos de Perfil Menu',
            botones: false
        })
        win.add(form);
        win.show();
        win.btn_guardar.on('click',function(){
            Funciones.AjaxRequestWinArray("Usuarios", "GuardarPerfil", win, form, me.gridPerfiles,"Esta Seguro de Guardar el Perfil", null, [win]);
        });
    },
    eventosFormPerfil: function () {
        var me = this;
        me.gridPerfiles.getSelectionModel().on('selectionchange', function (selModel, selections) {
            var disabled = selections.length === 0;
            me.recordPerfil = disabled  ? null : selections[0];
            if (disabled) {
                me.gridMenu.getStore().removeAll();
                Funciones.DisabledButton('btn_CrearMenu', me, disabled);
            }
            else {
                me.gridMenu.getStore().setExtraParams({ ID_PERFIL: selections[0].get('ID_PERFIL') });
                me.gridMenu.getStore().load();
                Funciones.DisabledButton('btn_CrearMenu', me, disabled);
            }
        });
        me.gridMenu.getSelectionModel().on('selectionchange', function (selModel, selections) {
            var disabled = selections.length === 0;
            me.recordPerfilMenu = disabled  ? null : selections[0];
            Funciones.DisabledButton('btn_EliminarMenu', me, disabled);
        });
    },
    EliminarMenuOpcion : function(){
        var me = this;
        Funciones.AjaxRequestGrid("MenuOpciones", "EliminarPerfilOpcion", me.gridMenu, "Esta Seguro de Eliminar la asociacion Perfil Menu", {ID_OPC : me.recordPerfilMenu.get('ID_OPC') , ID_PERFIL : me.recordPerfil.get('ID_PERFIL')}, me.gridMenu, null);
    }
});
