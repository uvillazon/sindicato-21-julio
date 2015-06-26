Ext.define('App.Store.Cierres.Cierres', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Cierres.Cierres',
    url: 'Cierres/ObtenerCierresPaginados',
    sortProperty: 'ID_CIERRE'
});