Ext.define('App.Model.IngresosPorSocios.TiposIngresos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE" },
            { type: "int", name: "ID_TIPO" },
            { type: "int", name: "ID_CAJA" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "MONEDA" },
            { type: "string", name: "LOGIN_USR" },
            { type: "string", name: "CAJA" },
            { type: "string", name: "NOMBRE" },
            { type: "string", name: "CATEGORIA" },
            { type: "string", name: "ESTADO" }
        ]
});