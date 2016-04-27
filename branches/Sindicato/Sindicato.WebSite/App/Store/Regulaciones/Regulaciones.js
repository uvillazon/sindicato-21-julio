Ext.define('App.Store.Regulaciones.Regulaciones', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Regulaciones.Regulaciones',
    url: 'Regulaciones/ObtenerRegulacionesPaginados',
    sortProperty: 'ID_REGULACION'
});