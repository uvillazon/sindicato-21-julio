Ext.define('App.Model.Amortizaciones.Amortizaciones', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE" },
            { type: "int", name: "ID_CAJA" },
            { type: "string", name: "CAJA" },
            { type: "int", name: "ID_SOCIO" },
            { type: "string", name: "SOCIO" },
            { type: "int", name: "ID_AMORTIZACION" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "CONCEPTO" },
            { type: "string", name: "LOGIN" },
        ]
});