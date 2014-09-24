Ext.define('App.Store.Listas.Listas', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Listas.Listas',
    remoteSort: true,
    autoLoad: false,
    proxy: {
         type: 'jsonp',
         url: Constantes.HOST + 'Listas/ObtenerListas',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
         property: 'LISTA',
            direction: 'ASC'
        }]
});