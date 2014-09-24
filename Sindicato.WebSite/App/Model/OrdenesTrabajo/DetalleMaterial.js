Ext.define('App.Model.OrdenesTrabajo.DetalleMaterial', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "IDPRODUCTO" },
        { type: "int", name: "ID_COD_SOL" },
        { type: "string", name: "COD_SOL" },
        { type: "string", name: "COD_ALTERNATIVO" },
        { type: "string", name: "DESCRIPCION" },
        { type: "string", name: "FORMACION_CND" },
        
        { type: "string", name: "DESCRIPCION_UC" },
        { type: "string", name: "UNIDAD" },
        { type: "float", name: "CANTIDAD" },
        { type: "float", name: "CANT_PRE" },
        { type: "string", name: "CODIGO" },
        { type: "string", name: "COD_UC" },
        { type: "string", name: "ID_UC" },
        { type: "string", name: "TENSION" },
        { type: "int", name: "ID_POSTE" },
        { type: "int", name: "ID_CONDUCTOR" },
        { type: "int", name: "ID_COD_MAN" },
        { type: "string", name: "COD_MAN" },
    ]
}); 