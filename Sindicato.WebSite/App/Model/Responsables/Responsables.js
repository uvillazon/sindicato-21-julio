Ext.define('App.Model.Responsables.Responsables', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_RESP" },
            { type: "string", name: "NOMBRE" },
            { type: "string", name: "APELLIDO" },
            { type: "string", name: "NOMBRECOMPLETO", convert: Funciones.ConcatenarModelo, defaultValue: "  ,APELLIDO,NOMBRE" },
            { type: "date", name: "FCH_ALTA", dateFormat: "d/m/Y", convert: Funciones.Fecha }, 
            { type: "date", name: "FCH_BAJA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "UNIDAD" },
            { type: "string", name: "AREA" },
            { type: "string", name: "INSPECCIONA" },
            { type: "string", name: "EJECUTA" },
            { type: "string", name: "REPORTA" },
            { type: "string", name: "ATRIBUTO_3" },
            { type: "string", name: "ATRIBUTO_4" },
            { type: "string", name: "ATRIBUTO_5" },
            { type: "string", name: "ATRIBUTO_6" },
            { type: "string", name: "ESTADO" },
    ],
    
});