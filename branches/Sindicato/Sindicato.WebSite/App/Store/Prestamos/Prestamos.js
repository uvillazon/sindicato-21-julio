Ext.define('App.Store.Prestamos.Prestamos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Prestamos.Prestamos',
    url: 'Prestamos/ObtenerPrestamosPorSociosPaginados',
    sortProperty: 'ID_PRESTAMOS'
});