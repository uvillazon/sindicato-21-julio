Ext.define('App.Store.ConsumoPropio.Clientes', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.ConsumoPropio.Clientes',
    url: 'ClientesConsumo/ObtenerClientesPaginado',
    sortProperty: 'CODIGO'
});