Ext.define('App.Store.Prestamos.Pagos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Prestamos.Pagos',
    url: 'Prestamos/ObtenerPagosPaginados',
    sortProperty: 'ID_PAGO',
    sortDirection : 'DESC'
});