Ext.define('App.Model.Prestamos.TiposPrestamos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE_MINIMO" },
            { type: "float", name: "IMPORTE_MAXIMO" },
            { type: "float", name: "SEMANAS" },
            { type: "float", name: "INTERES" },
            { type: "float", name: "INTERES_FIJO" },
            { type: "float", name: "MULTA_POR_MORA" },
            { type: "int", name: "ID_TIPO" },
            { type: "int", name: "ID_CAJA" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "MONEDA" },
            { type: "string", name: "LOGIN_USR" },
            { type: "string", name: "CAJA" },
            { type: "string", name: "NOMBRE" },
            { type: "string", name: "CATEGORIA" },
            { type: "string", name: "ESTADO" },
            { type: "string", name: "TIPO_INTERES" },
            { type: "int", name: "DIAS_ESPERA_MORA" },
            
        ]
});