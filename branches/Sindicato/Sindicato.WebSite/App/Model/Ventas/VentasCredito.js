Ext.define('App.Model.Ventas.VentasCredito', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "DIESEL" },
            { type: "float", name: "GASOLINA" },
            { type: "int", name: "ID_VENTA" },
            { type: "int", name: "ID_CLIENTE" },
            { type: "string", name: "CLIENTE" },
            { type: "int", name: "ID_COMBUSTIBLE" },
            { type: "string", name: "COMBUSTIBLE" },
            { type: "float", name: "PRECIO" },
            { type: "float", name: "IMPORTE_LTS" },
            { type: "float", name: "IMPORTE_BS" }
        ]
});