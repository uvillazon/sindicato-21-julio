Ext.define('App.Model.IngresosPorSocios.Ingresos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE" },
            { type: "int", name: "ID_INGRESO" },
            { type: "int", name: "ID_CAJA" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "MONEDA" },
            { type: "string", name: "LOGIN_USR" },
            { type: "string", name: "CAJA" },
            { type: "string", name: "TIPO_INGRESO" },
            { type: "string", name: "SOCIO" },
            { type: "int", name: "MOVIL" },
            { type: "string", name: "ESTADO" }
        ]
});
