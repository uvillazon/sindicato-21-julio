Ext.define("App.Model.Socios.Obligaciones", {
    extend: "Ext.data.Model",
    fields: [
           { type: "int", name: "ID_OBLIGACION" },

{ type: "int", name: "ID_SOCIO" },

{ type: "string", name: "OBLIGACION" },

{ type: "float", name: "IMPORTE" },

{ type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },

{ type: "string", name: "LOGIN" },
            
    ]
});