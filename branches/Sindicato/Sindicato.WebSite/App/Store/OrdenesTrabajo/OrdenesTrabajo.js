Ext.define('App.Store.OrdenesTrabajo.OrdenesTrabajo', {
    alternateClassName: 'App.store.OrdenesTrabajo.OrdenesTrabajo',
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.OrdenesTrabajo.OrdenesTrabajo',
    url: 'OrdenesTrabajo/ObtenerOrdenesTrabajoPaginado',
    sortProperty: 'ID_OT'
});