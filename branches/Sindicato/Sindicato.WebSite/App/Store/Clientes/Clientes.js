Ext.define('App.Store.Clientes.Clientes', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Clientes.Clientes',
    url: 'Clientes/ObtenerClientesPaginado',
    sortProperty: 'CODIGO'
});