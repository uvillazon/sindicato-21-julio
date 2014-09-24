Ext.define('App.Model.Productos.Productos', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "IDPRODUCTO" },
        { type: "string", name: "COD_ALTERNATIVO" },
        { type: "string", name: "DESCRIPCION" },
        { type: "string", name: "DESC_CORTA" },
        { type: "string", name: "IDUNIDAD" },
        { type: "float", name: "COSTO" },
        { type: "float", name: "PRECIO_BASE" },
        { type: "string", name: "UBICACION" },
        { type: "float", name: "IDMONEDA" },
        { type: "float", name: "IDCUENTA_AF" },
        { type: "string", name: "IDTIPO_ACTIV_AF" },
        { type: "float", name: "CANT_PRE" },


    ]
});