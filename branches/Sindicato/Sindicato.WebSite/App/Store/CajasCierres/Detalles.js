Ext.define('App.Store.CajasCierres.Detalles', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.CajasCierres.Detalles',
    url: 'Cierres/ObtenerDetallesCierreCajaPaginados',
    sortProperty: 'ID_CAJA',
    sortDirection : 'ASC'
});