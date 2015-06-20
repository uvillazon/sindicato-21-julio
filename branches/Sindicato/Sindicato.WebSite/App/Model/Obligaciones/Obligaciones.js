Ext.define('App.Model.Obligaciones.Obligaciones', {
    extend: 'Ext.data.Model',
    fields: [
              { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE" },
            { type: "int", name: "ID_SOCIO" },
            { type: "int", name: "ID_CIERRE" },
            { type: "int", name: "ID_OBLIGACION" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "CONCEPTO" },
            { type: "string", name: "LOGIN" },
            { type: "string", name: "ESTADO" },
            { type: "string", name: "SOCIO" },
            { type: "string", name: "PERIODO" }
        ]
});