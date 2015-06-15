Ext.define("App.Model.Autos.Autos", {
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
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "string", name: "LOGIN_USR" },
            { type: "int", name: "ID_IMG" },
            { type: "string", name: "TIPO_ACTUAL" },
            { type: "string", name: "MOVIL_ACTUAL" },
            { type: "string", name: "AUTO" },
            { type: "int", name: "ID_SOCIO_MOVIL_AUTO" },
            { type: "int", name: "ID_SOCIO_MOVIL" },
            { type: "string", name: "MOTIVO_ALTA" },
            { type: "string", name: "MOTIVO_BAJA" },
            { type: "string", name: "LOGIN_ALTA" },
            { type: "string", name: "LOGIN_BAJA" },
            { type: "string", name: "ESTADO" }
            
    ]
});