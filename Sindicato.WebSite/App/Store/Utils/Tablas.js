Ext.define('App.Store.Utils.Tablas', {
    extend: 'App.Config.Abstract.Store',
    model: 'App.Model.Utils.Tablas',
    url: 'MenuOpciones/GetAllTablas',
    sortProperty: 'ID_TABLA'
});