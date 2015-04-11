Ext.define('App.Store.Socios.KardexObligaciones', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Socios.KardexObligaciones',
    url: 'Socios/ObtenerKardexObligaciones',
    sortProperty: 'ID_KARDEX'
});