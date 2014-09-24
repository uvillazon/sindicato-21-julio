Ext.define("App.Model.Familiares.Familiares", {
    extend: "Ext.data.Model",
    fields: [
        { type: "int", name: "ID_FAMILIAR" },
        { type: "int", name: "ID_SOCIO" },
        { type: "int", name: "ID_CHOFER" },
        { type: "string", name: "NOMBRE" },
        { type: "string", name: "NOMBRE_COMPLETO" },
        { type: "string", name: "APELLIDO_PATERNO" },
        { type: "string", name: "APELLIDO_MATERNO" },
        { type: "int", name: "EDAD" },
        { type: "int", name: "CI" },
        { type: "string", name: "EXPEDIDO" },
        { type: "date", name: "FECHA_NAC", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "string", name: "PARENTESCO" },
        { type: "string", name: "OBSERVACION" },
        { type: "string", name: "DIRECCION" },
        { type: "string", name: "TELEFONO" },
        { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "int", name: "ID_USR" }
    ]
});