Ext.define('App.Store.Prestamos.GenerarPlanPagos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Prestamos.PlanPagos',
    url: 'Prestamos/ObtenerPlanDePagosGenerados',
    sortProperty: 'ID_PLAN',
    sortDirection : 'ASC'
});