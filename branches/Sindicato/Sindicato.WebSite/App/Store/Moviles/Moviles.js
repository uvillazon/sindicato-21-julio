Ext.define('App.Store.Moviles.Moviles', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Moviles.Moviles',
    url: 'Moviles/ObtenerMovilesPaginados',
    sortProperty: 'NRO_MOVIL'
});