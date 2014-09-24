Ext.define('App.Store.Hojas.Hojas', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Hojas.Hojas',
    url: 'VentaHojas/ObtenerHojas',
    sortProperty: 'NRO_HOJA'
});