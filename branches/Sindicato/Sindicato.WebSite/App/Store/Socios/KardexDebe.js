Ext.define('App.Store.Socios.KardexDebe', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Socios.KardexDebe',
    url: 'Obligaciones/ObtenerKardexPaginado',
    sortProperty: 'ID_KARDEX',
    sortDirection: 'DESC',
    pageSize : 15,
});