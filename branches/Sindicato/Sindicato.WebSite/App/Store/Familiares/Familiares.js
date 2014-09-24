Ext.define('App.Store.Familiares.Familiares', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Familiares.Familiares',
    url: 'Familiares/ObtenerFamiliaresPaginados',
    sortProperty: 'NOMBRE'
});