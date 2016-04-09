Ext.define('App.Store.IngresosPorSocios.TiposIngresos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.IngresosPorSocios.TiposIngresos',
    url: 'Ingresos/ObtenerTipoIngresosPaginados',
    sortProperty: 'ID_TIPO'
});