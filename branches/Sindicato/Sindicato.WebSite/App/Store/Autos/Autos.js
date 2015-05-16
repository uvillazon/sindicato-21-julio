Ext.define('App.Store.Autos.Autos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Autos.Autos',
    url: 'Autos/ObtenerAutosPaginados',
    sortProperty: 'PLACA'
});