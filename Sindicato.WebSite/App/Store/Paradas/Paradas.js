Ext.define('App.Store.Paradas.Paradas', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Paradas.Paradas',
    url: 'Paradas/ObtenerParadasPaginados',
    sortProperty: 'NOMBRE',
    sortDirection: 'ASC',
});