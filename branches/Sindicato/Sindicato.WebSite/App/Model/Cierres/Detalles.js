Ext.define('App.Model.Cierres.Detalles', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_CIERRE" },
            { type: "int", name: "ID_SOCIO" },
            { type: "string", name: "PERIODO" },
            { type: "string", name: "SOCIO" },
            { type: "float", name: "INGRESOS_HOJAS" },
            { type: "float", name: "OTROS_INGRESOS" },
            { type: "float", name: "OBLIGACIONES_INSTITUCION" },
            { type: "float", name: "OTRAS_OBLIGACIONES" },
            { type: "float", name: "DESCUENTOS" },
            { type: "float", name: "AHORRO" },
            { type: "float", name: "DEUDA" },

        ]
});