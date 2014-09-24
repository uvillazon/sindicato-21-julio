Ext.define('App.Store.Listas.Estados', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Listas.Listas',
    remoteSort: true,
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'Listas/ObtenerListasEstados',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'VALOR',
        direction: 'ASC'
    }]
});