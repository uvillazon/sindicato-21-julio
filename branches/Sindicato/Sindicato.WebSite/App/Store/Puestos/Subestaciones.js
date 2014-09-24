Ext.define('App.Store.Puestos.Subestaciones', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Puestos.Subestaciones',
    remoteSort: true,
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'Subestaciones/ObtenerSubestacionesPaginado',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'NOM_SUBEST',
        direction: 'ASC'
    }]
});