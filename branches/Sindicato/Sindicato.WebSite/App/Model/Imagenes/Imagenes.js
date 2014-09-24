Ext.define('App.Model.Imagenes.Imagenes', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_TABLA" },
            { type: "int", name: "ID_IMG" },
            { type: "string", name: "TABLA" },
            { type: "string", name: "NOMBRE_IMG" },
            { type: "string", name: "EXTENSION" },
            { type: "string", name: "DESCRIPCION" },
            { type: "int", name: "TAMANO" },
            { type: "string", name: "LOGIN_USR" },
        ]
});