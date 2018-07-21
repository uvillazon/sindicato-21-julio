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
            { type: "float", name: "AHORRO_REGULACIONES" },
            { type: "float", name: "TOTAL_CANCELADO" },
            {
                type: "float", name: "SALDO", mapping: function (raw) {
                    return raw.TOTAL_AHORRO - raw.TOTAL_CANCELADO;
                }
            },
            { type: "date", name: "CIERRE.FECHA_INI", dateFormat: "d/m/Y", mapping: 'CIERRE.FECHA_INI', convert: Funciones.Fecha },
            { type: "date", name: "CIERRE.FECHA_FIN", dateFormat: "d/m/Y", mapping: 'CIERRE.FECHA_FIN', convert: Funciones.Fecha },
            { type: "string", name: "CIERRE.OBSERVACION", mapping: 'CIERRE.OBSERVACION' },
            { type: "string", name: "CIERRE.CODIGO", mapping: 'CIERRE.CODIGO' },

    ]
});