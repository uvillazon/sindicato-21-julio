Ext.define('App.Model.Clientes.Kardex', {
    extend: 'Ext.data.Model',
    fields: [
           { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "int", name: "ID_CAJA" },
            { type: "int", name: "ID_KARDEX" },
            { type: "int", name: "ID_OPERACION" },
            { type: "string", name: "OPERACION" },
            { type: "string", name: "DETALLE" },
            { type: "float", name: "CONSUMO" },
            { type: "float", name: "AMORTIZACION" },
            { type: "float", name: "SALDO" },
            { type: "int", name: "ID_USUARIO" }
        ]
});