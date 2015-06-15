Ext.define('App.Store.IngresosSocio.Ingresos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.IngresosSocio.Ingresos',
    url: 'Socios/ObtenerIngresosPaginados',
    sortProperty: 'FECHA'
});