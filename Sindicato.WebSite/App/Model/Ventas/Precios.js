Ext.define('App.Model.Ventas.Precios', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "float", name: "PRECIO" },
            { type: "string", name: "CONBUSTIBLE" },
            { type: "string", name: "TIPO" },
        ]
});