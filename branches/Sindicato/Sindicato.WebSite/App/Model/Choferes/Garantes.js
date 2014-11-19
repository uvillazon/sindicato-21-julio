Ext.define("App.Model.Choferes.Garantes", {
    extend: "Ext.data.Model",
    fields: [
    { type: "int", name: "ID_GARANTE" },
    { type: "int", name: "ID_CHOFER" },
    { type: "string", name: "CHOFER" },
    { type: "string", name: "SOCIO" },
    { type: "int", name: "ID_SOCIO" },
    { type: "string", name: "OBSERVACION" },
    { type: "date", name: "FECHA_INI", dateFormat: "d/m/Y", convert: Funciones.Fecha },
    { type: "date", name: "FECHA_FIN", dateFormat: "d/m/Y", convert: Funciones.Fecha },
    { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
    { type: "string", name: "ESTADO" },
    { type: "string", name: "LOGIN" },
    { type: "int", name: "ID_USR" }
    ]
});