Ext.define('App.Model.OrdenesTrabajo.DetallesMaterialPreEjeDev', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "IDPRODUCTO" },
        { type: "string", name: "COD_PROD" },
        { type: "string", name: "DESC_PROD" },
        { type: "string", name: "UNID_PROD" },
        { type: "float", name: "CANT_DEV" },
        { type: "float", name: "CANT_EJE" },
        { type: "float", name: "CANT_PRE" },
        { type: "float", name: "CANT_VAL_N" },
        { type: "float", name: "CANT_VAL_I" },
        { type: "float", name: "CANT_VAL_C" },
        { type: "float", name: "TOTAL" },
        { type: "string", name: "ESTADO" },
    ]
}); 