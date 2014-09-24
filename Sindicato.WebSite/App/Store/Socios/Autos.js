Ext.define('App.Store.Socios.Autos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Socios.Autos',
    url: 'Socios/ObtenerAutos',
    sortProperty: 'TIPO'
});