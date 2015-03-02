Ext.define('App.Model.FondoEmergencia.Kardex', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "int", name: "ID_CHOFER" },
            { type: "int", name: "ID_KARDEX" },
            { type: "int", name: "NRO_CMP" },
            { type: "string", name: "OPERACION" },
            { type: "string", name: "OBSERVACION"  },
            { type: "float", name: "INGRESO" },
            { type: "float", name: "EGRESO" },
            { type: "float", name: "SALDO" },
            { type: "string", name: "LOGIN" }
        ]
});