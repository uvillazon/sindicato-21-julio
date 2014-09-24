Ext.define('App.Store.Postes.Conductores', {
    alternateClassName: 'App.store.Postes.Conductores',
    extend: 'Ext.data.Store',
    model: 'App.Model.Postes.Conductores',
    remoteSort: true,
    autoLoad: false,//siempre false
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'Conductores/ObtenerConductoresPaginado',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'COD_CONDUCTOR',
        direction: 'ASC'
    }]
});