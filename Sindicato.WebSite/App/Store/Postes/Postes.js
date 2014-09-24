Ext.define('App.Store.Postes.Postes', {
    alternateClassName: 'App.store.Postes.Postes',
    extend: 'Ext.data.Store',
    model: 'App.Model.Postes.Postes',
    remoteSort: true,
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'Postes/ObtenerPostesPaginado',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'COD_POSTE',
        direction: 'ASC'
    }]
});