Ext.define('App.Model.SolicitudesMantenimiento.Codigos', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_COD_DEF" },
            { type: "int", name: "ID_COD_MAN" },
            { type: "string", name: "COD_DEF" },
            { type: "string", name: "COD_MAN" },
            { type: "string", name: "DESCRIP_DEF" },
            { type: "string", name: "DESCRIP_MAN" },
            { type: "string", name: "ESTADO" },
    ]
});