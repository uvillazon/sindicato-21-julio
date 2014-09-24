Ext.define('App.Model.Combustibles.Ajustes', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "DIESEL" },
            { type: "float", name: "GASOLINA" },
            { type: "string", name: "OBSERVACION" }
        ]
});