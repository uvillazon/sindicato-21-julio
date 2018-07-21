Ext.define('App.Model.Egresos.Egresos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE" },
            { type: "int", name: "NRO_RECIBO" },
            { type: "int", name: "ID_CAJA" },
            { type: "int", name: "ID_TIPO" },
            { type: "int", name: "ID_EGRESO" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "CONCEPTO" },
            { type: "string", name: "TIPO" },
            { type: "string", name: "LOGIN" },
            { type: "string", name: "ESTADO" },
            { type: "float", name: "SALDO" },
            { type: "string", name: "CAJA" }
        ]
});