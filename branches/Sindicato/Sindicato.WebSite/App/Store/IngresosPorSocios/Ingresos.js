Ext.define('App.Store.IngresosPorSocios.Ingresos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.IngresosPorSocios.Ingresos',
    url: 'Ingresos/ObtenerIngresosPorSociosPaginados',
    sortProperty: 'ID_INGRESO'
});