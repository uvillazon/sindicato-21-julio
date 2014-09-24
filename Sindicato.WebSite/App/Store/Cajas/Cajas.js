Ext.define('App.Store.Cajas.Cajas', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Cajas.Cajas',
    url: 'Cajas/ObtenerCajasPaginado',
    sortProperty: 'CODIGO',
    sortDirection: 'ASC',
});