Ext.define("App.Model.Socios.Antecedentes", {
    extend: "Ext.data.Model",
    fields: [
       { type: "int", name: "ID_ANTECEDENTE" },
        { type: "int", name: "ID_SOCIO" },
        { type: "string", name: "MOTIVO" },
        { type: "string", name: "OBSERVACION" },
        { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
        { type: "int", name: "ID_USR" },
    ]
});