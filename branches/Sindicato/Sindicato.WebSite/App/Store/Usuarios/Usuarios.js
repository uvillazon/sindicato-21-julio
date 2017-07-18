Ext.define('App.Store.Usuarios.Usuarios', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Usuarios.Usuarios',
    url: 'Usuarios/ObtenerUsuariosPaginado',
    sortProperty: 'LOGIN'
});