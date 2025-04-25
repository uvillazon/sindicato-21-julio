Ext.define('App.Store.CajasCierres.Cierres', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.CajasCierres.Cierres',
    url: 'Cierres/ObtenerCierresCajasParcialesPaginados',
    sortProperty: 'ID_CIERRE'
});