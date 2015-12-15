Ext.define('App.Store.Socios.ObligacionesHoja', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Socios.ObligacionesHoja',
    url: 'Socios/ObtenerObligacionesHojasPaginados',
    sortProperty: 'OBLIGACION'
});