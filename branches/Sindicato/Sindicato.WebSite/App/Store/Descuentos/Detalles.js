Ext.define('App.Store.Descuentos.Detalles', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Descuentos.Detalles',
    url: 'Descuentos/ObtenerDetalleDescuentosPaginados',
    sortProperty: 'ID_DESCUENTO_SOCIO'
});