Ext.define('App.Store.Amortizaciones.Amortizaciones', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Amortizaciones.Amortizaciones',
    url: 'Obligaciones/ObtenerAmortizacionesPaginados',
    sortProperty: 'ID_AMORTIZACION'
});