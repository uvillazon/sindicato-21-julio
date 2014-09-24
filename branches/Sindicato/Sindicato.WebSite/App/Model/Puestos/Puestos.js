Ext.define("App.Model.Puestos.Puestos", {
    extend: "Ext.data.Model",
    fields: [
      { type: 'int', name: 'ID' },
      { type: 'int', name: 'ID_PUESTO' },
      { type: 'int', name: 'ID_ELEMENTO' },
      { type: 'int', name: 'ID_ELEMENTO_1', defaultValue: 'ID_ELEMENTO', convert: Funciones.CopiarRecordmodelo },
      { type: 'int', name: 'ID_ELEMENTO_2', defaultValue: 'ID_ELEMENTO', convert: Funciones.CopiarRecordmodelo },
      { type: 'string', name: 'COD_ALIMENTADOR' },
      { type: 'string', name: 'CODIGO' },
      { type: 'string', name: 'COD_PUESTO' },
      { type: 'string', name: 'COD_ELEMENTO' },
      { type: 'string', name: 'COD_ELEMENTO_1', defaultValue: 'COD_ELEMENTO', convert: Funciones.CopiarRecordmodelo },
      { type: 'string', name: 'COD_ELEMENTO_2', defaultValue: 'COD_ELEMENTO', convert: Funciones.CopiarRecordmodelo },
      { type: 'string', name: 'ELEMENTO' },
      { type: 'string', name: 'UBICACION' },
      { type: 'string', name: 'AREA_UBIC' },
      { type: 'string', name: 'DERIVACION' },
      //aumentado para obtener postes por puesto
      { type: 'int', name: 'ID_POSTE' },
      { type: 'string', name: 'COD_POSTE' }
    ]
});