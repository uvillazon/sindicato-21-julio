Ext.define('App.Model.CajasCierres.Detalles', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_CIERRE" },
             { type: "int", name: "ID_CIERRE_ANTERIOR", defaultValue: 0 },
            { type: "int", name: "ID_DETALLE" },
            { type: "int", name: "ID_CAJA" },
            { type: "string", name: "MSG" },
            { type: "string", name: "DETALLE" },
            { type: "float", name: "IMPORTE" },
            { type: "float", name: "SALDO" },
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },

     

    ]
});