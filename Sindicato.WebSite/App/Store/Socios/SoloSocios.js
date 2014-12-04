Ext.define('App.Store.Socios.SoloSocios', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Socios.Socios',
    url: 'Socios/ObtenerSoloSociosPaginados',
    sortProperty: 'NOMBRE'
});