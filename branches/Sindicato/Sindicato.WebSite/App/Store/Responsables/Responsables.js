Ext.define('App.Store.Responsables.Responsables', {
    alternateClassName: 'App.store.Responsables.Responsables',
    extend: 'Ext.data.Store',
    model: 'App.Model.Responsables.Responsables',
    remoteSort: true,
    autoLoad: false, 
    proxy: {
         type: 'jsonp',
         url: Constantes.HOST + 'Responsables/ObtenerResponsables',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
         property: 'APELLIDO',
            direction: 'ASC'
        }]
});