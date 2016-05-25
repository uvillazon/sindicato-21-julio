Ext.define('App.Model.Moviles.Moviles', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_LINEA" },
            { type: "int", name: "ID_MOVIL" },
            { type: "date", name: "FECHA_ALTA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_BAJA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "NRO_MOVIL" },
            { type: "string", name: "DESCRIPCION" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "LOGIN_USR" },
            { type: "string", name: "ESTADO" },
    ],
    
});
