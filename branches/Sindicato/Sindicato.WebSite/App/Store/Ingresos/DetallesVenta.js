Ext.define('App.Store.Ventas.DetallesVenta', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Ventas.DetallesVenta',
    url: 'Ventas/ObtenerPosTurnos',
    sortProperty: 'ID_POS'
});