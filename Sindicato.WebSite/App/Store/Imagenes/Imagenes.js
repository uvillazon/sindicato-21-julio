Ext.define('App.Store.Imagenes.Imagenes', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Imagenes.Imagenes',
    url: 'Imagenes/ObtenerImagenesPaginado',
    sortProperty: 'ID_IMG'
});