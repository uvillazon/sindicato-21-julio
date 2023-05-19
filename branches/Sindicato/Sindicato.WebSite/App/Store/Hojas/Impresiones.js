Ext.define('App.Store.Hojas.Impresiones', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Hojas.Impresiones',
    url: 'VentaHojas/ObtenerDetallesImpresionHojasPaginadas',
    sortProperty: 'ID_IMPRESION'
});