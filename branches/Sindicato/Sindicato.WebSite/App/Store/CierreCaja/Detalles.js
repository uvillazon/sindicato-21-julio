Ext.define('App.Store.CierreCaja.Detalles', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.CierreCaja.Detalles',
    url: 'Cierres/ObtenerDetallesCierreCajaPaginados',
    sortProperty: 'ID_CAJA',
    sortDirection : 'ASC'
});