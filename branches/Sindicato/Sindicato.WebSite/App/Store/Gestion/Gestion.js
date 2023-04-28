Ext.define('App.Store.Gestion.Gestion', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Gestion.Gestion',
    url: 'Cierres/ObtenerGestionPaginados',
    sortProperty: 'ID_GESTION'
});