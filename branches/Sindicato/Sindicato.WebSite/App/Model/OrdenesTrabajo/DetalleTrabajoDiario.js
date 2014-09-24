/**
* Proyecto: Sistema de Mantenimiento (SisMan)
* Requerimiento: 13
* Elaborado por: P. Sergio Alvarado G.
* Model para Material presupuestado
*/

Ext.define('App.Model.OrdenesTrabajo.DetalleTrabajoDiario', {
    extend: 'Ext.data.Model',
    idProperty: 'ID_TD_DET',
    fields: [
              { name: 'ID_TD_DET', type: 'int' },
              { name: 'ID_TD', type: 'int' },
              { name: 'ID_POSTE', type: 'int' },
              { name: 'ID_CONDUCTOR', type: 'int' },
              { name: 'FORMACION_CND' },
              { name: 'ID_UC', type: 'int' },
              { name: 'COD_UC' },
              { name: 'ID_COD_MAN', type: 'int' },
              { name: 'COD_MAN' },
              { name: 'ID_COD_SOL', type: 'int' },
              { name: 'COD_SOL' },
              { name: 'IDPRODUCTO', type: 'int' },
              { name: 'COD_PROD' },
              { name: 'DESC_PROD' },
              { name: 'UNID_PROD' },
              { name: 'CANT_PRE', type: 'int' },
              { name: 'CANT_EJE', type: 'int' },
              { name: 'FECHA_EJE_INI', type: 'date' },
              { name: 'FCH_HOR_INI', type: 'date' },
              { name: 'FCH_HOR_FIN', type: 'date' },
              { name: 'ID_RESP', type: 'int' },
              { name: 'CAPATAZ' },
              { name: 'ID_MOVIL', type: 'int' },
              { name: 'MOVIL' },
              { name: 'NIVEL', type: 'int' },
              { name: 'OBSERV' },
              { name: 'ID_OT', type: 'int' }, /*Lo utilizo para navegar en la tabala de la cabecera de trabajo diario y obtener el ID_TD*/

    ],

    validations: [
        { type: 'presence', field: 'NIVEL', message: 'Introduzca el NIVEL de la estructura' }
]
});