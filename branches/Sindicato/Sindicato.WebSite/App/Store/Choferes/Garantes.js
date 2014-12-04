Ext.define('App.Store.Choferes.Garantes', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Choferes.Garantes',
    url: 'Choferes/ObtenerChoferesPaginados',
    sortProperty: 'FECHA'
});