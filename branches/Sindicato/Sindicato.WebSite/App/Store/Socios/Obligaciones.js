Ext.define('App.Store.Socios.Obligaciones', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Socios.Obligaciones',
    url: 'Socios/ObtenerObligaciones',
    sortProperty: 'OBLIGACION'
});