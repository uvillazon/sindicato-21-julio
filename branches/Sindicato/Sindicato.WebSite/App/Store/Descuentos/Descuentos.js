Ext.define('App.Store.Descuentos.Descuentos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Descuentos.Descuentos',
    url: 'Descuentos/ObtenerDescuentosPaginados',
    sortProperty: 'ID_DESCUENTO'
});