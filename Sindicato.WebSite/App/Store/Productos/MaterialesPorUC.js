Ext.define('App.Store.Productos.MaterialesPorUC', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Productos.Materiales',
    url: 'Materiales/ObtenerMaterialesPorUC',
    sortProperty: 'IDPRODUCTO'
});