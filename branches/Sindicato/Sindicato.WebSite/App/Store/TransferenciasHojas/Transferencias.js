Ext.define('App.Store.TransferenciasHojas.Transferencias', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.TransferenciasHojas.Transferencias',
    url: 'Socios/ObtenerTransferenciasHojasPaginado',
    sortProperty: 'ID_TRANSF'
});