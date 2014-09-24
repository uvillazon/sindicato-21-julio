Ext.define('App.Model.ConsumoPropio.Clientes', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            {type: "int", name: "ID_CLIENTE" },
            { type: "int", name: "CODIGO" },
            { type: "float", name: "CONSUMO" },
            { type: "float", name: "CONSUMO_BS" },
            { type: "string", name: "NOMBRE" },
            { type: "string", name: "DESCRIPCION" },
            { type: "string", name: "RESPONSABLE" }
        ]
});