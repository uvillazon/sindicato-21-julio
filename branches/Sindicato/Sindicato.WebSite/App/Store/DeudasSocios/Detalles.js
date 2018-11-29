Ext.define('App.Store.DeudasSocios.Detalles', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.DeudasSocios.Detalles',
    url: 'Deudas/ObtenerDetallesDeudasPaginados',
    sortProperty: 'ID_DETALLE'
});