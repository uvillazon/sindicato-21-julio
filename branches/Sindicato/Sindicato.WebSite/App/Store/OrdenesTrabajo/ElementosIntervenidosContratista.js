/*
Proyecto: Sistema de Mantenimiento (SisMan)
Requerimiento: 14
Elaborado: P. Sergio Alvarado G.
*/

Ext.define('App.Store.OrdenesTrabajo.ElementosIntervenidosContratista', {
    alternateClassName: 'App.store.OrdenesTrabajo.ElementosIntervenidosContratista',
    extend: 'Ext.data.Store',
    requires: 'App.Model.OrdenesTrabajo.ElementosIntervenidosContratista',
    model: 'App.Model.OrdenesTrabajo.ElementosIntervenidosContratista',
    proxy: {
        type: 'ajax',
        url: Constantes.HOST + 'OrdenesTrabajo/ObtenerElementosIntervenidosContratista',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});