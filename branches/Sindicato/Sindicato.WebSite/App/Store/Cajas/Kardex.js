Ext.define('App.Store.Cajas.Kardex', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Cajas.Kardex',
    url: 'Cajas/ObtenerKardexEfectivoPaginado',
    sortProperty: 'FECHA',
    sortDirection: 'DESC',
    pageSize : 15,
});