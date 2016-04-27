Ext.define('App.Model.Permisos.Permisos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA_INI", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_FIN", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_BAJA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "NRO_MOVIL" },
            { type: "int", name: "ID_PERMISO" },
            { type: "int", name: "CANT_HOJAS_OBLIG" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "MOTIVO" },
            { type: "string", name: "OBSERVACION_BAJA" },
            { type: "string", name: "LOGIN_USR" },
            { type: "string", name: "LOGIN_BAJA" },
            { type: "string", name: "TIPO_INGRESO" },
            { type: "string", name: "SOCIO" },
            { type: "int", name: "MOVIL" },
            { type: "string", name: "ESTADO" }
        ]
});