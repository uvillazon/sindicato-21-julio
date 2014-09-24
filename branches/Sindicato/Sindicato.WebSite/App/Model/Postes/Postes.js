Ext.define("App.Model.Postes.Postes", {
    extend: "Ext.data.Model",
    fields: [
      { type: 'int', name: 'ID_POSTE' },
      { type: 'string', name: 'COD_POSTE' },
      { type: 'int', name: 'OBJECTID' },
      { type: 'string', name: 'AREA_UBIC' },
      { type: 'string', name: 'COD_TIPO' },
      { type: 'string', name: 'UBICACION' },
      { type: 'string', name: 'DESC_TIPO' },
      { type: 'date', name: 'FECHA_OPER', dateFormat: "d/m/Y", convert: Funciones.Fecha }, 
      { type: 'string', name: 'ESTADO' }
    ]
});