/*
Proyecto: Sistema de Mantenimiento (SisMan)
Requerimiento: 14
Elaborado: P. Sergio Alvarado G.
*/

Ext.define('App.Store.OrdenesTrabajo.MaterialesManoObraContratista', {
    alternateClassName: 'App.store.OrdenesTrabajo.MaterialesManoObraContratista',
    extend: 'Ext.data.Store',
    requires: 'App.Model.OrdenesTrabajo.MaterialesManoObraContratista',
    model: 'App.Model.OrdenesTrabajo.MaterialesManoObraContratista',
    proxy: {
        type: 'ajax',
        url: Constantes.HOST + 'OrdenesTrabajo/ObtenerMaterialesManoObraEjecutadoContratista',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});