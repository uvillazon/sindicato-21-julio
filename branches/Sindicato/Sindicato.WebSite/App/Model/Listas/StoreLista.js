Ext.define('App.Model.Listas.StoreLista', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_TABLA" },
            { type: "int", name: "ID_PADRE" },
            { type: "int", name: "ID_LISTA" },
            { type: "string", name: "CODIGO" },
            { type: "string", name: "VALOR" },
            { type: "string", name: "ESTADO" },
        ]
});