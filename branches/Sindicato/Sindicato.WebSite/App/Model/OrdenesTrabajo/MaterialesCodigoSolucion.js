Ext.define('App.model.OrdenesTrabajo.MaterialesCodigoSolucion', {
    extend: 'Ext.data.Model',
    fields: [
      { name: 'ID_COD_SOL', type: 'int' },
      { name: 'COD_SOL' },
      { name: 'COD_ALTERNATIVO' },
      { name: 'IDPRODUCTO', type: 'int' },
      { name: 'COD_PROD' },
      { name: 'UNID_PROD' },
      { name: 'IDUNIDAD' },
      { name: 'DESCRIPCION' },
      { name: 'CANT_PRE', type: 'int' },
      { name: 'CANT_EJE', type: 'int' },
    ],

})