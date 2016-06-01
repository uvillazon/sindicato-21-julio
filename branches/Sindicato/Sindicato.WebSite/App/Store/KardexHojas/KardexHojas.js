Ext.define('App.Store.KardexHojas.KardexHojas', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.KardexHojas.KardexHojas',
    url: 'KardexHoja/ObtenerKardexHojaPaginados',
    sortProperty: 'MES'
});