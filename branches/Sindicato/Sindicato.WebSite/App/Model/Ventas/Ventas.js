Ext.define('App.Model.Ventas.Ventas', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_HOJA" },
            { type: "int", name: "ID_PARADA" },
            { type: "int", name: "NRO_MOVIL" },
            { type: "int", name: "NUMERO" },
            { type: "int", name: "NRO_HOJA" },
            { type: "int", name: "ID_SOCIO_MOVIL" },
            { type: "string", name: "OBSERVACION" },
            { type: "date", name: "FECHA_COMPRA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_USO", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "MONTO" },
            { type: "string", name: "ESTADO" },
            { type: "string", name: "LOGIN" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "SOCIO" },
    ]
});