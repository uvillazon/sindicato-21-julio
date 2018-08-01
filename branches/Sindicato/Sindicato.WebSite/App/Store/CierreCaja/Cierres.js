Ext.define('App.Store.CierreCaja.Cierres', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.CierreCaja.Cierres',
    url: 'Cierres/ObtenerCierresCajasPaginados',
    sortProperty: 'ID_CIERRE'
});