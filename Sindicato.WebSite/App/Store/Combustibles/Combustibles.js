Ext.define('App.Store.Combustibles.Combustibles', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Combustibles.Combustibles',
    url: 'Combustibles/ObtenerCombustiblesPaginado',
    sortProperty: 'NOMBRE'
});