Ext.define('App.Store.Refuerzos.Refuerzos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Refuerzos.Refuerzos',
    url: 'VentaHojas/ObtenerVentasRefuerzosPaginadas',
    sortProperty: 'ID_VENTA'
});