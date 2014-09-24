Ext.define('App.Model.Ventas.Ventas', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "VENTA_TOTAL" },
            { type: "float", name: "VENTA_DIA" },
            { type: "float", name: "VENTA_TARDE" },
            { type: "float", name: "VENTA_NOCHE" }
        ]
});