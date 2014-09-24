Ext.define('App.Store.Puestos.Derivaciones', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Puestos.Puestos',
    remoteSort: true,
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'ElementosRed/ObtenerDerivaciones',
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