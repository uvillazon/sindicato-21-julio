Ext.define('App.Model.Usuarios.Usuarios', {
    extend: 'Ext.data.Model',
    fields: [
                { type: "date", name: "FCH_ALTA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "int", name: "ID_USUARIO" },
            { type: "int", name: "ID_PERFIL" },
            { type: "string", name: "EMAIL" },
            { type: "string", name: "PERFIL" },
            { type: "string", name: "NOMBRE" },
            { type: "string", name: "LOGIN" },
            { type: "string", name: "EMAIL" },
            { type: "string", name: "ESTADO" }
        ]
});