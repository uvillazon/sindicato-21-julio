Ext.define('App.Model.Postes.UnidadesConstructivas', {
    extend: 'Ext.data.Model',
    fields: [
        { type: "int", name: "ID_POS_UC" },
        { type: "int", name: "ID_UC" },
        { type: "string", name: "COD_UC" },
        { type: "string", name: "COD_REA" },
        { type: "string", name: "IDUNIDAD" },
        { type: "int", name: "ID_POSTE" },
        { type: "string", name: "COD_POSTE" },
        { type: "string", name: "DESCRIPCION" },
        { type: "string", name: "DESC_CORTA" },
        { type: "string", name: "DESC_POSTE" },
        { type: "string", name: "TENSION" },
        { type: "string", name: "IMG_MANO_OBRA" },
        { type: "string", name: "IMG_MATERIALES" },
        { type: "date", name: "FECHA_OPER", dateFormat: "d/m/Y", convert: Funciones.Fecha },
    ]
});