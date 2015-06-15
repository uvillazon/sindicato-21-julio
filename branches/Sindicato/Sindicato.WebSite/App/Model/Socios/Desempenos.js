Ext.define("App.Model.Socios.Desempenos", {
    extend: "Ext.data.Model",
    fields: [
       { type: "int", name: "ID_DESEMPENO" },
        { type: "int", name: "ID_SOCIO" },
        { type: "string", name: "CARGO" },
        { type: "string", name: "OBSERVACION" },
        { type: "date", name: "FECHA_DESDE", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "date", name: "FECHA_HASTA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "int", name: "ID_USR" }
    ]
});