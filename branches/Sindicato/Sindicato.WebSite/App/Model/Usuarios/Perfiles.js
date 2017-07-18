Ext.define('App.Model.Usuarios.Perfiles', {
    extend: 'Ext.data.Model',
    fields: [
    //           { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            {type: "int", name: "ID_PERFIL" },
            { type: "string", name: "NOMBRE" },
            { type: "string", name: "DESCRIPCION" },
            { type: "string", name: "ESTADO" }


        ]
});