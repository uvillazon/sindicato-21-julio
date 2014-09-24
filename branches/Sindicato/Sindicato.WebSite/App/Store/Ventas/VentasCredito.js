Ext.define('App.Store.Ventas.VentasCredito', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Ventas.VentasCredito',
    url: 'Ventas/ObtenerVentasCreditoPaginado',
    sortProperty: 'ID_CLIENTE'
});