Ext.define('App.Store.OrdenesTrabajo.DetallesMaterialPreEjeDev', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.OrdenesTrabajo.DetallesMaterialPreEjeDev',
    url: 'OrdenesTrabajo/ObtenerMaterialesPreEjeDev',
    sortProperty: 'IDPRODUCTO'
});