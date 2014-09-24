Ext.define('App.Store.ConsumoPropio.ClientesConsumo', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.ConsumoPropio.Clientes',
    url: 'ClientesConsumo/ObtenerClientesConsumoPaginado',
    sortProperty: 'CODIGO'
});