Ext.define('App.Store.Moviles.Historicos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Moviles.Historicos',
    url: 'Moviles/ObtenerHistoricosPaginados',
    sortProperty: 'FECHA_REG'
});