﻿Ext.define('App.Model.Hojas.Hojas', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_HOJA" },
            { type: "int", name: "NRO_HOJA" },
            { type: "int", name: "ID_VENTA" },
            { type: "string", name: "OBSERVACION" },
            { type: "date", name: "FECHA_USO", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "MONTO" },
            { type: "string", name: "LOGIN" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha }
        ]
});