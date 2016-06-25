Ext.define('App.Store.Cierres.Detalles', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Cierres.Detalles',
    url: 'Cierres/ObtenerDetallesPaginados',
    sortProperty: 'NRO_MOVIL',
    sortDirection : 'ASC'
});