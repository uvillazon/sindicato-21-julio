Ext.define('App.Store.CierresParada.Detalles', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.CierresParada.Detalles',
    url: 'CierresParada/ObtenerDetallesCierreParadaPaginados',
    sortProperty: 'ID_CIERRE'
});