/*
Proyecto: Sistema de Mantenimiento (SisMan)
Requerimiento: 14
Elaborado: P. Sergio Alvarado G.
*/
Ext.define('App.Model.OrdenesTrabajo.ElementosIntervenidosContratista', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'ID_TE', type: 'int', useNull: true },
        { name: 'ID_OT', type: 'int', useNull: true },
        { name: 'ID_POSTE', type: 'int', useNull: true },
        { name: 'COD_POSTE' },
        { name: 'DESC_TIPO' },
        { name: 'AREA_UBIC' },
        { name: 'TENSION' },
        { name: 'ID_CONDUCTOR', type: 'int', useNull: true },
        { name: 'COD_CONDUCTOR' },
        { name: 'FORMACION_CND' },
        { name: 'IMG' },
    ]
});