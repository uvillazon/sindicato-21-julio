Ext.define('App.Store.Combustibles.Kardex', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Combustibles.Kardex',
    url: 'Combustibles/ObtenerKardexCombustible',
    sortProperty: 'FECHA'
});