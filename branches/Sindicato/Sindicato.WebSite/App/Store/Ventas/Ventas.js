Ext.define('App.Store.Ventas.Ventas', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Ventas.Ventas',
    url: 'VentaHojas/ObtenerVentasPaginadas',
    sortProperty: 'FECHA_VENTA',
});