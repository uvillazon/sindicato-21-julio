Ext.define('App.Store.CierresParada.CierresParada', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.CierresParada.CierresParada',
    url: 'CierresParada/ObtenerCierresParadasPaginados',
    sortProperty: 'ID_CIERRE'
});