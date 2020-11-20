Ext.define('App.Model.Ingresos.Ingresos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE" },
            { type: "int", name: "NRO_RECIBO" },
            { type: "int", name: "ID_INGRESO" },
            { type: "int", name: "ID_CAJA" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "CONCEPTO" },
            { type: "string", name: "ENTREGADO" },
            { type: "string", name: "LOGIN" },
            { type: "string", name: "CAJA" },
            { type: "string", name: "ESTADO" },
            { type: "string", name: "TIPO" }
        ]
});