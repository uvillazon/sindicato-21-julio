Ext.define('App.Model.Listas.Listas', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_LISTA" },
            { type: "string", name: "LISTA" },
            { type: "string", name: "DESCRIPCION" },
            { type: "int", name: "TAM_LIMITE" },
            { type: "string", name: "TIPO_VALOR" },
            { type: "string", name: "MAYUS_MINUS" },
            { type: "string", name: "ESTADO" },
            //modelo para estados
            { type: "string", name: "VALOR" },
            { type: "string", name: "CODIGO" },
        ]
});