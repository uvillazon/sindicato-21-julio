Ext.define('App.Model.Regulaciones.Detalles', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE" },
            { type: "int", name: "ID_DETALLE" },
            { type: "string", name: "CAJA" },
            { type: "string", name: "OBLIGACION" },
            { type: "string", name: "LOGIN_USR" }       
        ]
});