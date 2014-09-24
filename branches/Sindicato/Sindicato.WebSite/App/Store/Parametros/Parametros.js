Ext.define('App.Store.Parametros.Parametros', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Parametros.Parametros',
    url: 'Parametros/ObtenerParametros',
    sortProperty: 'CODIGO'
});