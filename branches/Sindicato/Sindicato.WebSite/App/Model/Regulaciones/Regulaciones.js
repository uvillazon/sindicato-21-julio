Ext.define('App.Model.Regulaciones.Regulaciones', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
             { type: "date", name: "FECHA_COMPRA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "MES", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "NRO_MOVIL" },
            { type: "float", name: "MONTO" },
            { type: "int", name: "ID_REGULACION" },
            { type: "int", name: "CANTIDAD" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "SOCIO" },
            { type: "string", name: "ESTADO" }
        ]
});