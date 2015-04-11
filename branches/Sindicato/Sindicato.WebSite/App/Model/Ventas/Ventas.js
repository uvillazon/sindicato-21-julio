Ext.define('App.Model.Ventas.Ventas', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_VENTA" },

{ type: "int", name: "ID_PARADA" },

{ type: "int", name: "NRO_MOVIL" },

{ type: "int", name: "ID_SOCIO" },

{ type: "string", name: "OBSERVACION" },

{ type: "date", name: "FECHA_VENTA", dateFormat: "d/m/Y", convert: Funciones.Fecha },

{ type: "float", name: "TOTAL" },

{ type: "float", name: "DESCUENTO" },

{ type: "int", name: "TOTAL_HOJAS" },

{ type: "string", name: "ESTADO" },

{ type: "string", name: "LOGIN" },

{ type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },

{ type: "int", name: "ID_CAJA" },
{ type: "string", name: "SOCIO" },
    ]
});