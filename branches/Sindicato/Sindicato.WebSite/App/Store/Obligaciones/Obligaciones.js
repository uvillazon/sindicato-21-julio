Ext.define('App.Store.Obligaciones.Obligaciones', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Obligaciones.Obligaciones',
    url: 'Obligaciones/ObtenerObligacionesPaginados',
    sortProperty: 'ID_OBLIGACION'
});