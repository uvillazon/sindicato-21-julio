Ext.define("App.Model.Socios.ObligacionesHoja", {
    extend: "Ext.data.Model",
    fields: [
            { type: "int", name: "ID_CAJA" },
            { type: "int", name: "ID_OBLIGACION" },
            { type: "int", name: "ID_LINEA" },
            { type: "string", name: "OBLIGACION" },
            { type: "string", name: "CAJA" },
            { type: "float", name: "IMPORTE_DEFECTO" },
            { type: "string", name: "LOGIN" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha } 
    ]
});