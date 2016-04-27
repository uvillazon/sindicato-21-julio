Ext.define('App.Store.Permisos.Permisos', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Permisos.Permisos',
    url: 'Permisos/ObtenerPermisosPaginados',
    sortProperty: 'ID_PERMISO'
});