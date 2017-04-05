Ext.define('App.Model.Prestamos.Moras', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_LIMITE_PAGO_MORA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE_MORA" },
            { type: "int", name: "ID_PRESTAMO" },
            { type: "int", name: "ID_MORA" },
            { type: "string", name: "LOGIN_USR" },
            { type: "string", name: "OBSERVACION" }
            
        ]
});