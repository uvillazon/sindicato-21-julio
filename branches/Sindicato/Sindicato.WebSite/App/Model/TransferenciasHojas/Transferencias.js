Ext.define('App.Model.TransferenciasHojas.Transferencias', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "IMPORTE_TOTAL" },
            { type: "float", name: "CANTIDAD_HOJAS" },
            { type: "int", name: "ID_TRANSF" },
            { type: "string", name: "OBSERVACION" },
            { type: "string", name: "TO_NRO_MOVIL" },
            { type: "string", name: "FROM_NRO_MOVIL" },
            { type: "string", name: "TO_SOCIO" },
            { type: "string", name: "FROM_SOCIO" },
            { type: "string", name: "CONCEPTO" },
            { type: "string", name: "LOGIN_USR" }
        ]
});