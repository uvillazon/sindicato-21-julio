Ext.define('App.Store.FondoEmergencia.Kardex', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.FondoEmergencia.Kardex',
    url: 'Choferes/ObtenerKardexFondoEmergenciaPaginados',
    sortProperty: 'ID_KARDEX',
    sortDirection: 'DESC',
    pageSize : 15,
});