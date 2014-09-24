Ext.define('App.Store.ConsumoPropio.Consumos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.ConsumoPropio.Consumos',
    url: 'ClientesConsumo/ObtenerConsumosPaginado',
    sortProperty: 'FECHA'
});