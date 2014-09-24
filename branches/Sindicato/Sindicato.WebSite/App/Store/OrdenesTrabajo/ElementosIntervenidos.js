/*
Proyecto: Sistema de Mantenimiento (SisMan)
Requerimiento: 13
Elaborado: P. Sergio Alvarado G.
Proposito: Store para formara  el menu en forma de arbol de los elementos que estan sujetos a reparacion o remplazo.
*/

Ext.define('App.Store.OrdenesTrabajo.ElementosIntervenidos', {
    alternateClassName: 'App.store.OrdenesTrabajo.ElementosIntervenidos',
    extend: 'Ext.data.TreeStore',
    requires: 'App.Model.OrdenesTrabajo.ElementosIntervenidos',
    model: 'App.Model.OrdenesTrabajo.ElementosIntervenidos',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: Constantes.HOST + 'OrdenesTrabajo/MenuPostesConductoresIntervenidos'
        //reader: {
        //    type: 'json',
        //    root: 'root'
        //}
    }

});