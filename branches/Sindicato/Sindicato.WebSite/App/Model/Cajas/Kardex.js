﻿Ext.define('App.Model.Cajas.Kardex', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "int", name: "ID_CAJA" },
            { type: "int", name: "ID_KARDEX" },
            { type: "int", name: "ID_OPERACION" },
            { type: "string", name: "OPERACION" },
            { type: "string", name: "DETALLE"  },
            { type: "float", name: "INGRESO" },
            { type: "float", name: "EGRESO" },
            { type: "float", name: "SALDO" },
            { type: "int", name: "ID_USUARIO" }
        ]
});