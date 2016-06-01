Ext.define("App.Model.KardexHojas.KardexHojas", {
    extend: "Ext.data.Model",
    fields: [
            { type: "float", name: "CANT_HOJAS" },
            { type: "float", name: "CANT_HOJAS_OBLIG" },
            { type: "float", name: "CANT_REGULACIONES" },
            { type: "float", name: "DEBE" },
            { type: "int", name: "ID_KARDEX" },
            { type: "int", name: "ID_SOCIO_MOVIL" },
            { type: "date", name: "MES", dateFormat: "m/Y", convert: Funciones.Fecha },
            { type: "string", name: "SOCIO" },
            { type: "int", name: "NRO_MOVIL" }       
    ]
});
