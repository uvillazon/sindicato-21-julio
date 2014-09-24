Ext.define('App.Model.Moviles.Moviles', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_MOVIL" },
            { type: "string", name: "MOVIL" },
            { type: "date", name: "FCH_ALTA", dateFormat: "d/m/Y", convert: Funciones.Fecha }, 
            { type: "date", name: "FCH_BAJA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "UNIDAD" },
            { type: "string", name: "AREA" },
            { type: "string", name: "EJECUTA" },
            { type: "string", name: "ATRIBUTO_3" },
            { type: "string", name: "ATRIBUTO_4" },
            { type: "string", name: "ATRIBUTO_5" },
            { type: "string", name: "ATRIBUTO_6" },
            { type: "string", name: "ESTADO" },
    ],
    
});