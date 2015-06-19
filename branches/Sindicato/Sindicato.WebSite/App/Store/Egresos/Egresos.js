Ext.define('App.Store.Egresos.Egresos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Egresos.Egresos',
    url: 'Transferencias/ObtenerEgresosPaginados',
    sortProperty: 'ID_EGRESO'
});