Ext.define('App.Model.Refuerzos.Refuerzos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "TOTAL" },
            { type: "float", name: "COSTO_UNITARIO" },
            { type: "int", name: "CANTIDAD" },
            { type: "int", name: "ID_VENTA" },
            { type: "int", name: "ID_CAJA" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "NOMBRE" },
            { type: "string", name: "CODIGO" },
            { type: "string", name: "LOGIN" },
            { type: "string", name: "CAJA" },
            { type: "string", name: "ESTADO" },
            { type: "string", name: "PLACA" }
        ]
});