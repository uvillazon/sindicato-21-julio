Ext.define('App.Store.Cajas.Kardex', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Cajas.Kardex',
    url: 'Cajas/ObtenerKardexEfectivoPaginado',
    sortProperty: 'ID_KARDEX',
    sortDirection: 'DESC',
    pageSize : 15,
});