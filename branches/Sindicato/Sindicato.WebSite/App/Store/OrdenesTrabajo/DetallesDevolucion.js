Ext.define('App.Store.OrdenesTrabajo.DetallesDevolucion', {
    alternateClassName: 'App.store.OrdenesTrabajo.DetallesDevolucion',
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.OrdenesTrabajo.DetallesDevolucion',
    url: 'Devoluciones/ObtenerDevolucionesPaginados',
    sortProperty: 'ID_DEV'
});