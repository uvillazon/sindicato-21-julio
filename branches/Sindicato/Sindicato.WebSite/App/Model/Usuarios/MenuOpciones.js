Ext.define('App.Model.Usuarios.MenuOpciones', {
    extend: 'Ext.data.Model',
    fields: [
//           { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "int", name: "ID_OPC" },
            { type: "string", name: "OPCION" },
            { type: "string", name: "TOOLTIP" },
            { type: "string", name: "ESTADO" }
            

        ]
});