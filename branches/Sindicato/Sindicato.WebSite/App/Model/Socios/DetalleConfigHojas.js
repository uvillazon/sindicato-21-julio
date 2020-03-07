Ext.define("App.Model.Socios.DetalleConfigHojas", {
    extend: "Ext.data.Model",
    fields: [
            { type: "int", name: "ID_SOC_MOV_OBLIG" },
            { type: "int", name: "ID_OBLIGACION" },
            { type: "int", name: "ID_SOCIO_MOVIL" },
            { type: "string", name: "OBLIGACION" },
            { type: "string", name: "CAJA" },
            { type: "string", name: "CAJA_REGULACIONES" },
            { type: "float", name: "IMPORTE" },
            { type: "string", name: "LOGIN" },
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha } 
    ]
});