Ext.define('App.Model.OrdenesTrabajo.DetallesDevolucion', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "ID_DEV" },
        { type: "int", name: "ID_OT" },
        { type: "string", name: "ESTADO_PROD" },
        { type: "int", name: "ID_POSTE" },
        { type: "int", name: "ID_CONDUCTOR" },
        { type: "int", name: "ID_UC" },
        { type: "int", name: "IDPRODUCTO" },
        { type: "string", name: "COD_PROD" },
        { type: "string", name: "DESC_PROD" },
        { type: "string", name: "UNID_PROD" },
        { type: "float", name: "CANT_DEV" },
        { type: "float", name: "CANTIDAD" },
        { type: "float", name: "COSTO_UNIT" },
        { type: "int", name: "IDCUENTA" },
        { type: "string", name: "CODCUENTA" },
        { type: "string", name: "LOGIN_REG" },
    ]
});