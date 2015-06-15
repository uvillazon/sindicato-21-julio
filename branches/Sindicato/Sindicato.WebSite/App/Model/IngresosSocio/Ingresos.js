Ext.define('App.Model.IngresosSocio.Ingresos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_INGRESO" },
            { type: "int", name: "ID_SOCIO" },
            { type: "int", name: "NRO_RECIBO" },
            { type: "float", name: "INGRESO" },
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "OBSERVACION" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "LOGIN" },
            { type: "string", name: "ESTADO" },

        ]
});