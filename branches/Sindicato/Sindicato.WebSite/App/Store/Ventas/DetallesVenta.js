Ext.define('App.Store.Ventas.DetallesVenta', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Ventas.DetallesVenta',
    url: 'VentaHojas/ObtenerDetallesPaginadas',
    sortProperty: 'ID_DETALLE',
    sortDirection : 'DESC'
});