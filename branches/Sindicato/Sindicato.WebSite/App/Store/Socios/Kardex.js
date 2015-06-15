Ext.define('App.Store.Socios.Kardex', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Socios.Kardex',
    url: 'Socios/ObtenerKardexPaginados',
    sortProperty: 'ID_KARDEX',
    sortDirection: 'DESC',
    pageSize : 15,
});