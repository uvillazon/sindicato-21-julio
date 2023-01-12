Ext.define('App.Model.Cierres.Cierres', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_CIERRE" },
            { type: "string", name: "CODIGO" },
            { type: "string", name: "TIPO" },
            { type: "date", name: "FECHA_INI", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_FIN", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "OBSERVACION" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "LOGIN" },
            { type: "string", name: "ESTADO" },

        ]
});