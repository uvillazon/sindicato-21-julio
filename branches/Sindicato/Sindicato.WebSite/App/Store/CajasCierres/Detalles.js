Ext.define('App.Store.CajasCierres.Detalles', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.CajasCierres.Detalles',
    url: 'Cierres/ObtenerDetallesCierreCajaParcialesPaginados',
    sortProperty: 'ID_DETALLE',
    sortDirection : 'ASC'
});