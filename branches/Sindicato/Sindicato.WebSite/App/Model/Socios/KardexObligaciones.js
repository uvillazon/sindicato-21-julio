Ext.define("App.Model.Socios.KardexObligaciones", {
    extend: "Ext.data.Model",
    fields: [
            { type: "int", name: "ID_KARDEX" },

{ type: "int", name: "ID_OBLIGACION" },

{ type: "string", name: "MOTIVO" },

{ type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },

{ type: "float", name: "IMPORTE_ANTERIOR" },

{ type: "float", name: "IMPORTE_NUEVO" },

{ type: "string", name: "LOGIN" },

{ type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha }
            
    ]
});