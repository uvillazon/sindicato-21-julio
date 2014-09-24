Ext.define('App.Model.Tanques.Tanques', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA_DIESEL", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "SINICIAL_DIESEL" },
            { type: "float", name: "COMPRAS_DIESEL" },
            { type: "float", name: "VENTAS_DIESEL" },
            { type: "float", name: "AJUSTES_DIESEL" },
            { type: "float", name: "ACUM_DIESEL" },
            { type: "date", name: "FECHA_GASOLINA", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            { type: "float", name: "SINICIAL_GASOLINA" },
            { type: "float", name: "COMPRAS_GASOLINA" },
            { type: "float", name: "VENTAS_GASOLINA" },
            { type: "float", name: "AJUSTES_GASOLINA" },
            { type: "float", name: "ACUM_GASOLINA" }
            
        ]
});