Ext.define('App.Model.Cierres.Detalles', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_CIERRE" },
            { type: "int", name: "ID_SOCIO" },
            { type: "int", name: "ID_SOCIO_MOVIL" },
            { type: "string", name: "MSG" },
            { type: "int", name: "NRO_MOVIL" },
            { type: "string", name: "SOCIO" },
            { type: "float", name: "CANT_HOJAS" },
            { type: "float", name: "CANT_REGULACIONES" },
            { type: "float", name: "TOTAL_AHORRO" },
            { type: "float", name: "AHORRO_HOJA" },
            { type: "float", name: "AHORRO_REGULACIONES" }

    ]
});