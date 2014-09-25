Ext.define("App.Model.Socios.Autos", {
    extend: "Ext.data.Model",
    fields: [
            { type: "int", name: "ID_AUTO" },
            { type: "int", name: "ID_MOVIL" },
            { type: "string", name: "MOVIL" },
            { type: "string", name: "TIPO" },
            { type: "string", name: "COLOR" },
            { type: "string", name: "MARCA" },
            { type: "string", name: "MODELO" },
            { type: "string", name: "PLACA" },
            { type: "string", name: "MOTOR" },
            { type: "string", name: "CHASIS" },
            { type: "string", name: "DESCRIPCION" },
            { type: "date", name: "FECHA_ALTA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "date", name: "FECHA_BAJA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "MOTIVO_CAMBIO" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "int", name: "ID_USR" },
            { type: "int", name: "ID_IMG" },
            
    ]
});