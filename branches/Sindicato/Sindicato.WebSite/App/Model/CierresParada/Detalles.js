Ext.define('App.Model.CierresParada.Detalles', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_CIERRE" },
            { type: "int", name: "ID_DETALLE" },
            { type: "string", name: "DETALLE" },
            { type: "float", name: "INGRESO" },
            { type: "float", name: "EGRESO" }
        ]
});