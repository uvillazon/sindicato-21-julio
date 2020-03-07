Ext.define('App.Store.Listas.StoreLista', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Listas.StoreLista',
    remoteSort: false,
    autoLoad: true,
    proxy: {
         type: 'jsonp',
         url: Constantes.HOST + 'Listas/ObtenerListasItem',
         reader: {
                root: 'Rows',
                totalProperty: 'Total'
          },
            simpleSortMode: true
     },
     sorters: [{
         property: 'CODIGO',
            direction: 'ASC'
        }]
});

//Ext.define('App.Store.Listas.StoreLista', {
//    extend: 'App.Config.Abstract.Store',
//    model: 'App.Model.Listas.StoreLista',
//    url: 'Listas/ObtenerListasItem',
//    sortProperty: 'CODIGO',
//    sortDirection : 'ASC'
//});