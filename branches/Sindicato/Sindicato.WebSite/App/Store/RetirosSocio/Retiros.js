Ext.define('App.Store.RetirosSocio.Retiros', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.RetirosSocio.Retiros',
    url: 'Socios/ObtenerRetirosPaginados',
    sortProperty: 'FECHA'
});