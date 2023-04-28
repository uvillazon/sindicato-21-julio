Ext.define('App.Store.Gestion.Detalles', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Gestion.Detalles',
    url: 'Cierres/ObtenerDetalleGestionPaginados',
    sortProperty: 'ID_DETALLE'
});