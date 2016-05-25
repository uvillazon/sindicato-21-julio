Ext.define('App.Store.Prestamos.TiposPrestamos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Prestamos.TiposPrestamos',
    url: 'Prestamos/ObtenerTiposPrestamosPaginados',
    sortProperty: 'ID_TIPO'
});