Ext.define('App.Store.Socios.Documentos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Socios.Documentos',
    url: 'Socios/ObtenerDocumentosPaginados',
    sortProperty: 'DOCUMENTACION'
});