Ext.define('App.Model.Descuentos.Detalles', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_DESCUENTO_SOCIO" },
            { type: "int", name: "ID_DESCUENTO" },
            { type: "int", name: "ID_SOCIO" },
             { type: "string", name: "SOCIO" },
            { type: "string", name: "DESCUENTO" },
            { type: "string", name: "DETALLE" },
            { type: "float", name: "IMPORTE" },
            { type: "string", name: "LOGIN" }
        ]
});