Ext.define('App.Store.Tanques.Tanques', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Tanques.Tanques',
    url: 'Ingresos/ObtenerIngresosPaginado',
    sortProperty: 'FECHA'
});