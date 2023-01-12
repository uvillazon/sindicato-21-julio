Ext.define('App.Model.DiasNoTrabajados.Detalles', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA_NO_TRABAJADO", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_CANCELADO", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE" },
            { type: "float", name: "IMPORTE_CANCELADO" },
            { type: "int", name: "ID_DETALLE" },
            { type: "int", name: "ID_SOCIO_MOVIL" },
            { type: "int", name: "ID_CAJA" },
            { type: "int", name: "CANT_RECORRIDO" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "OBSERVACION_ANULACION" },
            { type: "string", name: "ESTADO" },
            { type: "string", name: "LOGIN_USR" },
            { type: "string", name: "CAJA" },
            { type: "string", name: "SOCIO" },
            { type: "int", name: "MOVIL" },
            { type: "string", name: "ESTADO" },
            { type: "string", name: "ESTADO_DEUDA" }
        ]
});