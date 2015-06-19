Ext.define('App.Store.Transferencias.Transferencias', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Transferencias.Transferencias',
    url: 'Transferencias/ObtenerTransferenciasPaginados',
    sortProperty: 'ID_TRANSFERENCIA'
});