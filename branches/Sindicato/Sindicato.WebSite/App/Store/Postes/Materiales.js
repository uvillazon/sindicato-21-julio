Ext.define('App.Store.Postes.Materiales', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Postes.Materiales',
    remoteSort: true,
    autoLoad: false,//siempre false
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'Materiales/ObtenerMateriales',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'COD_ALTERNATIVO',
        direction: 'ASC'
    }]
});