Ext.define('App.Store.Socios.Socios', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Socios.Socios',
    url: 'Socios/ObtenerSociosPaginados',
    sortProperty: 'NOMBRE'
});