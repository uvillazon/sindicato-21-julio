Ext.define('App.Store.Egresos.Egresos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Egresos.Egresos',
    url: 'Egresos/ObtenerEgresosPaginado',
    sortProperty: 'FECHA'
});