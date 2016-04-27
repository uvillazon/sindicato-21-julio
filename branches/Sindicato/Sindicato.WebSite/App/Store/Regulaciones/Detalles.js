Ext.define('App.Store.Regulaciones.Detalles', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Regulaciones.Detalles',
    url: 'Regulaciones/ObtenerDetallesPaginados',
    sortProperty: 'ID_DETALLE'
});