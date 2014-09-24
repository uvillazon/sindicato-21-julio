Ext.define('App.Model.Parametros.Parametros', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_PARAMETRO" },
            { type: "string", name: "CODIGO" },
            { type: "string", name: "NOMBRE" },
            { type: "string", name: "NRO_LINEA" },
            { type: "string", name: "TIPO" },
            { type: "int", name: "ID_LINEA" },
            { type: "float", name: "MONTO" },
            { type: "date", name: "FECHA_INICIO", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_FIN", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "ESTADO" },
            { type: "int", name: "ID_USUARIO" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        ]
});