Ext.define('App.Store.OrdenesOperacion.OrdenesOperacion', {
    extend: 'Ext.data.Store',
    model: 'App.Model.OrdenesOperacion.OrdenesOperacion',
    remoteSort: true,
    autoLoad: false,//siempre false
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'OrdenesOperacion/ObtenerOrdenesOperacionPaginado',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'ID_OO',
        direction: 'DESC'
    }]
});