Ext.define('App.Store.DeudasSocios.DeudasSocios', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.DeudasSocios.DeudasSocios',
    url: 'DeudasSocios/ObtenerDeudasPaginados',
    sortProperty: 'ID_DEUDA'
});