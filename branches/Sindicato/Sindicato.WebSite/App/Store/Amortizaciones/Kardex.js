Ext.define('App.Store.Amortizaciones.Kardex', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Amortizaciones.Kardex',
    url: 'Amortizaciones/ObtenerKardexPaginado',
    sortProperty: 'ID_KARDEX',
    sortDirection: 'DESC',
    pageSize : 15,
});