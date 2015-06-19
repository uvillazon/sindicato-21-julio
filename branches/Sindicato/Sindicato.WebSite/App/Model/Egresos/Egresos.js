Ext.define('App.Model.Egresos.Egresos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE" },
            { type: "int", name: "NRO_RECIBO" },
            { type: "int", name: "ID_CAJA" },
            { type: "int", name: "ID_EGRESO" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "CONCEPTO" },
            { type: "string", name: "LOGIN" },
            { type: "float", name: "SALDO" },
            { type: "string", name: "CAJA" }
        ]
});