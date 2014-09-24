Ext.define('App.Model.SolicitudesMantenimiento.CodigosSolucion', {
    extend: 'Ext.data.Model',
    fields: [
            { type: "int", name: "ID_COD_SOL" },
            { type: "string", name: "COD_SOL" },
            { type: "string", name: "DESCRIP_SOL" },
            { type: "string", name: "ESTADO" },
    ]
});