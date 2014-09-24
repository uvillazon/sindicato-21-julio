Ext.define('App.Store.Ventas.Precios', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Ventas.Precios',
    url: 'Ventas/ObtenerPreciosPorFecha',
    sortProperty: 'CONBUSTIBLE',
    sortDirection : 'ASC'
});