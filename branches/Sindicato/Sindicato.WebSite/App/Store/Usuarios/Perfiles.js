Ext.define('App.Store.Usuarios.Perfiles', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Usuarios.Perfiles',
    url: 'Usuarios/ObtenerPerfilesPaginados',
    sortProperty: 'NOMBRE',
    sortDirection: 'ASC',
});