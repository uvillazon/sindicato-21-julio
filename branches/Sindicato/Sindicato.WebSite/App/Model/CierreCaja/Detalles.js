Ext.define('App.Model.CierreCaja.Detalles', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_CIERRE" },
            { type: "int", name: "ID_SOCIO" },
            { type: "int", name: "ID_CAJA" },
            { type: "string", name: "MSG" },
            { type: "string", name: "CAJA" },
            { type: "string", name: "NOMBRE" },
            { type: "string", name: "MONEDA" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "OPERACION" },
            { type: "string", name: "SUBOPERACION" },
            { type: "float", name: "SALDO" },
            { type: "date", name: "CIERRE.FECHA_INI", dateFormat: "d/m/Y", mapping: 'CIERRE.FECHA_INI', convert: Funciones.Fecha },
            { type: "date", name: "CIERRE.FECHA_FIN", dateFormat: "d/m/Y", mapping: 'CIERRE.FECHA_FIN', convert: Funciones.Fecha },
            { type: "string", name: "CIERRE.OBSERVACION", mapping: 'CIERRE.OBSERVACION' },
            { type: "string", name: "CIERRE.CODIGO", mapping: 'CIERRE.CODIGO' },

    ]
});