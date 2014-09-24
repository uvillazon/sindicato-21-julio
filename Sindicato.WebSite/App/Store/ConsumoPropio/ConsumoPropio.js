Ext.define('App.Store.ConsumoPropio.ConsumoPropio', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.ConsumoPropio.ConsumoPropio',
    url: 'Ventas/ObtenerConsumosPaginado',
    sortProperty: 'NRO_COMP'
});