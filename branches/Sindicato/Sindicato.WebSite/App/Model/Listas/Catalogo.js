Ext.define('App.Model.Listas.Catalogo', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_CAT" },
            { type: "string", name: "COD" },
            { type: "string", name: "DESC_EQUIPO" },
            { type: "string", name: "NOM_TABLA" },
            { type: "string", name: "FUNCION" },
            { type: "string", name: "CONTROLADOR" },
            { type: "string", name: "ICONO" },
            { type: "string", name: "TIPO" },
            { type: "string", name: "N_ID_EQUIPO" },
            { type: "string", name: "N_COD_EQUIPO" },
    ]
});