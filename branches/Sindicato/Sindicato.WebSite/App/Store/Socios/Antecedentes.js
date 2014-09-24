Ext.define('App.Store.Socios.Antecedentes', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Socios.Antecedentes',
    url: 'Socios/ObtenerAntecedentesPaginados',
    sortProperty: 'MOTIVO'
});