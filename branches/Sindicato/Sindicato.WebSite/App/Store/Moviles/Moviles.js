Ext.define('App.Store.Moviles.Moviles', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Moviles.Moviles',
    remoteSort: true,
    autoLoad: false, 
    proxy: {
         type: 'jsonp',
         url: Constantes.HOST + 'Moviles/ObtenerMoviles',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
         property: 'MOVIL',
            direction: 'ASC'
        }]
});