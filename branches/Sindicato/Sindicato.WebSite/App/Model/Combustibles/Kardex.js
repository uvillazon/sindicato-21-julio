Ext.define('App.Model.Combustibles.Kardex', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "VENTAS_GAS" },
            { type: "float", name: "COMPRAS_GAS" },
            { type: "float", name: "AJUSTES_GAS" },
            { type: "float", name: "ACUMULADO_GAS" },
            { type: "float", name: "SALDO_INICIAL_GAS" },
            { type: "float", name: "VENTAS_DIE" },
            { type: "float", name: "COMPRAS_DIE" },
            { type: "float", name: "AJUSTES_DIE" },
            { type: "float", name: "ACUMULADO_DIE" },
            { type: "float", name: "SALDO_INICIAL_DIE" }
        ]
});