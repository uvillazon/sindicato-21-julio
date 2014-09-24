Ext.define('App.Store.OrdenesTrabajo.DetallesMaterialEjecutado', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.OrdenesTrabajo.DetallesDevolucion',
    url: 'OrdenesTrabajo/ObtenerMaterialesEjecutadosPaginado',
    sortProperty: 'IDPRODUCTO1'
});