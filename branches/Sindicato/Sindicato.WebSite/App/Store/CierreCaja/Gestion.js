Ext.define('App.Store.CierreCaja.Gestion', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.CierreCaja.Gestion',
    url: 'Cierres/ObtenerGestionesPaginados',
    sortProperty: 'ID'
});