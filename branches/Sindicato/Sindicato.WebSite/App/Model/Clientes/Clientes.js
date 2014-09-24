Ext.define('App.Model.Clientes.Clientes', {
    extend: 'Ext.data.Model',
    fields: [
                { type: "date", name: "FECHA_REG", dateFormat: "d/m/Y", convert: Funciones.Fecha },
            {type: "int", name: "ID_CLIENTE" },
            { type: "int", name: "CODIGO" },
            { type: "float", name: "LIMITE" },
            { type: "float", name: "CONSUMO" },
            { type: "float", name: "SALDO" },
            { type: "string", name: "EMPRESA" },
            { type: "string", name: "NIT" },
            { type: "string", name: "CONTACTO" },
            { type: "string", name: "TELEFONO" },
            { type: "string", name: "DIRECCION" }
        ]
});