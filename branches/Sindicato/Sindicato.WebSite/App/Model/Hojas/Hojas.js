Ext.define('App.Model.Hojas.Hojas', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_HOJA" },
            { type: "int", name: "NRO_HOJA" },
            { type: "int", name: "ID_MOVIL" },
            { type: "int", name: "ID_PARADA" },
            { type: "string", name: "OBSERVACION" },
             { type: "string", name: "PARADA" },
            { type: "string", name: "NRO_MOVIL" },
            { type: "string", name: "SOCIO" },
            { type: "date", name: "FECHA_COMPRA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_USO", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "MONTO" },
            { type: "string", name: "ESTADO" },
            { type: "int", name: "ID_USUARIO" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        ]
});