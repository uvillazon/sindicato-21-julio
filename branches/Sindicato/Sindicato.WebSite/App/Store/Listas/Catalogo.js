Ext.define('App.Store.Listas.Catalogo', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Listas.Catalogo',
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