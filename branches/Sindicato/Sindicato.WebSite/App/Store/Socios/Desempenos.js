Ext.define('App.Store.Socios.Desempenos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Socios.Desempenos',
    url: 'Socios/ObtenerDesempenosPaginados',
    sortProperty: 'CARGO'
});