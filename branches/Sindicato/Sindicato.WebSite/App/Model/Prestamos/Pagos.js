Ext.define('App.Model.Prestamos.Pagos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            
            { type: "float", name: "IMPORTE" },
            { type: "int", name: "ID_PRESTAMO" },
            { type: "int", name: "ID_PAGO" },
            { type: "string", name: "LOGIN_USR" },
            { type: "string", name: "MONEDA" },
            { type: "string", name: "ESTADO" },
            { type: "string", name: "SOCIO" },
            { type: "string", name: "OBSERVACION" },
             { type: "string", name: "CAJA" },
            
        ]
});
