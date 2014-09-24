Ext.define('App.Store.Postes.UnidadesConstructivas', {
    alternateClassName: 'App.store.Postes.UnidadesConstructivas',
    extend: 'Ext.data.Store',
    model: 'App.Model.Postes.UnidadesConstructivas',
    remoteSort: true,
    autoLoad: false,//siempre false
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'Postes/ObtenerUnidadesConstructivas',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'COD_UC',
        direction: 'ASC'
    }]
});