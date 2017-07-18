Ext.define('App.Store.Usuarios.MenuOpciones', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Usuarios.MenuOpciones',
    url: 'Usuarios/ObtenerMenuOpcionesPaginados',
    sortProperty: 'ID_OPC',
    sortDirection: 'ASC',
});