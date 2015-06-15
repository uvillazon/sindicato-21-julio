Ext.define('App.Store.Autos.AutosSocios', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Autos.Autos',
    url: 'Autos/ObtenerAutosSociosPaginados',
    sortProperty: 'FECHA_REG'
});