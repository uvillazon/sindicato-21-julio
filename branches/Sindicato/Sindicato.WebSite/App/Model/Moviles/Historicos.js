Ext.define('App.Model.Moviles.Historicos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_MOVIL" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y H:i:s", convert: Funciones.Fecha },
            { type: "string", name: "MOVIL_ANTERIOR" },
            { type: "string", name: "MOVIL_NUEVO" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "LOGIN_USR" }
    ],
    
});
