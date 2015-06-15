Ext.define('App.Store.Socios.Desempenos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Socios.Desempenos',
    url: 'Otros/ObtenerDesempenoPaginados',
    sortProperty: 'FECHA_DESDE'
});