Ext.define('App.Store.Choferes.Choferes', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Choferes.Choferes',
    url: 'Choferes/ObtenerChoferesPaginados',
    sortProperty: 'NRO_CHOFER'
});