Ext.define('App.Model.DeudasSocios.Detalles', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE" },
            { type: "float", name: "IMPORTE_CANCELADO" },
            { type: "int", name: "ID_DEUDA" },
            { type: "int", name: "ID_SOCIO_MOVIL" },
            { type: "int", name: "ID_DETALLE" },
            { type: "int", name: "ID_CAJA" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "ESTADO" },
            { type: "string", name: "LOGIN_USR" },
            { type: "string", name: "CAJA" },
            { type: "string", name: "MOTIVO" },
            { type: "string", name: "SOCIO" },
            { type: "int", name: "MOVIL" },
            { type: "string", name: "ESTADO" }
        ]
});