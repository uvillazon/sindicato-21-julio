Ext.define('App.Store.Socios.DetalleConfigHojas', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Socios.DetalleConfigHojas',
    url: 'Socios/ObtenerDetalleConfigHojas',
    sortProperty: 'ID_OBLIGACION'
});