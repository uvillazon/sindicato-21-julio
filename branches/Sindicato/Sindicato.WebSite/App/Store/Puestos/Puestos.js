Ext.define('App.Store.Puestos.Puestos', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Puestos.Puestos',
    remoteSort: true,
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'ElementosRed/ObtenerElementosPuestosElementosRedSimple',
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