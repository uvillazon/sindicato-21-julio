Ext.define('App.Model.Socios.KardexDebe', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "int", name: "ID_SOCIO" },
            { type: "int", name: "ID_KARDEX" },
            { type: "int", name: "ID_OPERACION" },
            { type: "string", name: "OPERACION" },
            { type: "string", name: "DETALLE"  },
            { type: "float", name: "DEBE" },
            { type: "float", name: "AMORTIZACION" },
            { type: "float", name: "SALDO_DEBE" },
            { type: "string", name: "LOGIN" }
        ]
});