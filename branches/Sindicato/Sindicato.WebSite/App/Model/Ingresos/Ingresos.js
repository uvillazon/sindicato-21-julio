Ext.define('App.Model.Ingresos.Ingresos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE" },
            { type: "int", name: "NRO_RECIBO" },
            { type: "string", name: "TIPO_INGRESO" },
            { type: "int", name: "ID_INGRESO" },
            { type: "int", name: "ID_CAJA" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "CONCEPTO" },
            { type: "string", name: "LOGIN" },
            { type: "string", name: "CAJA" }
        ]
});