Ext.define('App.Model.ConsumoPropio.Consumos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            {type: "int", name: "ID_CLIENTE" },
            { type: "string", name: "CLIENTE" },
            { type: "string", name: "TURNO" },
            { type: "float", name: "CONSUMO_BS" },
            { type: "float", name: "CONSUMO" },
            { type: "string", name: "RESPONSABLE" }
        ]
});