Ext.define('App.Model.Hojas.Impresiones', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_IMPRESION" },
            { type: "int", name: "ID_SOCIO_SOCIO_MOVIL" },
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "TOTAL_HOJAS" },
            { type: "string", name: "LOGIN" },
            { type: "string", name: "NRO_MOVIL" },
            { type: "string", name: "SOCIO" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha }
        ]
});   