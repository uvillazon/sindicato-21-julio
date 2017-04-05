Ext.define('App.Store.Prestamos.PlanPagos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Prestamos.PlanPagos',
    url: 'Prestamos/ObtenerPlanDePagosPaginados',
    sortProperty: 'ID_PLAN',
    sortDirection : 'ASC'
});