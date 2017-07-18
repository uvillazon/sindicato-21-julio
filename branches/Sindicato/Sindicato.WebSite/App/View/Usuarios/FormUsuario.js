Ext.define("App.View.Usuarios.FormUsuario", {
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
        me.txt_id = Ext.create("App.Config.Componente.TextFieldBase", {
            hidden: true,
            fieldLabel: "Id",
            readOnly: true,
            name: "ID_USUARIO"

        });
        me.txt_login = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Login",
            //            readOnly : true,
            name: "LOGIN",
//            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false

        });
        me.txt_password = Ext.create("Ext.form.TextField", {
            opc : 'min',
            fieldLabel: "Password",
            inputType: 'password' ,
            name: "CONTRASENA",
//            colspan : 2,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false

        });

        me.txt_nombre = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Nombre Completo",
            name: "NOMBRE",
            colspan : 2,
            width : 480,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false
        });
        me.txt_email = Ext.create("App.Config.Componente.TextFieldBase", {
            fieldLabel: "Email",
            name: "EMAIL",
            colspan : 2,
            width : 480,
//            afterLabelTextTpl: Constantes.REQUERIDO,
//            allowBlank: false
        });
        me.store_rol = Ext.create('App.Store.Usuarios.Perfiles', { autoLoad: true });
        me.cbx_rol = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Perfil",
            name: "ID_PERFIL",
            displayField : 'NOMBRE',
            valueField : 'ID_PERFIL',
            maxLength: 50,
            afterLabelTextTpl: Constantes.REQUERIDO,
            allowBlank: false,
            store: me.store_rol
        });
        me.cbx_estado = Ext.create("App.Config.Componente.ComboBase", {
            fieldLabel: "Estado",
            name: "ESTADO",
            width: 240,
            maxLength: 1,
            afterLabelTextTpl: Constantes.REQUERIDO,
            value: 'A',
            store : ["A","I"],
            allowBlank: false,
        });
        me.items = [
             me.txt_id,
             me.txt_login,
             me.txt_password,
             me.txt_nombre,
             me.txt_email,
             me.cbx_rol,
             me.cbx_estado
        ];


    },
//    CargarDataos : function
    cargarEventos: function () {

    },
    EventosVenta: function (btn) {

    }
});
