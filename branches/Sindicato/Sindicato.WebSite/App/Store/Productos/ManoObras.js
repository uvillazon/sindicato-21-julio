Ext.define('App.Store.Productos.ManoObras', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Productos.Productos',
    url: 'ManoObras/ObtenerManoObras',
    sortProperty: 'COD_ALTERNATIVO'
});