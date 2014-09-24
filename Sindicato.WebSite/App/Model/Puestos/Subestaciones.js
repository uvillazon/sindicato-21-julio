Ext.define("App.Model.Puestos.Subestaciones", {
    extend: "Ext.data.Model",
    fields: [
      { type: 'int', name: 'ID_SUBEST' },
      { type: 'string', name: 'COD_SUBEST' },
      { type: 'string', name: 'NOM_SUBEST' },
      { type: 'string', name: 'UBICACION' },
      { type: 'string', name: 'TIPO_SUBEST' },
      { type: 'string', name: 'ANIO_CONSTR' },
      { type: 'string', name: 'NIVEL_TENS' },
      { type: 'string', name: 'TELEFONO' },
      { type: 'date', name: 'FECHA_ALTA', dateFormat: "d/m/Y", convert: Funciones.Fecha }, 
      { type: 'int', name: 'ID_USR_ALTA' },
      { type: 'date', name: 'FECHA_BAJA', dateFormat: "d/m/Y", convert: Funciones.Fecha }, 
      { type: 'int', name: 'ID_USR_BAJA' },
      { type: 'string', name: 'MOTIVO_BAJA' },
      { type: 'string', name: 'OBSERV_BAJA' },
      { type: 'string', name: 'NUM_PROY' },
      { type: 'string', name: 'ESTADO' }
    ]
});