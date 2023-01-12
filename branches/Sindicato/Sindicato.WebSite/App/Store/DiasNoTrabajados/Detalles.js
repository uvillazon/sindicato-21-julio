Ext.define('App.Store.DiasNoTrabajados.Detalles', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.DiasNoTrabajados.Detalles',
    url: 'DeudasSocios/ObtenerDiasNoTrabajadosPaginados',
    sortProperty: 'ID_DETALLE'
});