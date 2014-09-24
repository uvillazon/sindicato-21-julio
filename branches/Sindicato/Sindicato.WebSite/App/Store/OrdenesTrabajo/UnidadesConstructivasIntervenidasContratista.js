/*
Proyecto: Sistema de Mantenimiento (SisMan)
Requerimiento: 14
Elaborado: P. Sergio Alvarado G.
*/

Ext.define('App.Store.OrdenesTrabajo.UnidadesConstructivasIntervenidasContratista', {
    alternateClassName: 'App.store.OrdenesTrabajo.UnidadesConstructivasIntervenidasContratista',
    extend: 'Ext.data.Store',
    requires: 'App.Model.Postes.UnidadesConstructivas',
    model: 'App.Model.Postes.UnidadesConstructivas',
    proxy: {
        type: 'ajax',
        url: Constantes.HOST + 'OrdenesTrabajo/ObtenerUnidadesConstructivasIntervenidasContratista',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});