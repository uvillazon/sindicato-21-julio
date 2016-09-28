Ext.define('App.Store.Egresos.TiposEgresos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Egresos.TiposEgresos',
    url: 'transferencias/ObtenerTiposEgresosPaginados',
    sortProperty: 'ID_TIPO'
});