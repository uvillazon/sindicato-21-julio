Ext.define('App.Store.OrdenesTrabajo.DetallesPresupuesto', {
    alternateClassName: 'App.store.OrdenesTrabajo.DetallesPresupuesto',
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.OrdenesTrabajo.DetallesPresupuesto',
    url: 'Presupuestos/ObtenerPresupuestosPaginados',
    sortProperty: 'ID_PRE'
});