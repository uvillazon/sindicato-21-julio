Ext.define('App.Store.Puestos.PostesPorPuesto', {
    extend: 'Ext.data.Store',
    model: 'App.Model.Puestos.Puestos',
    remoteSort: true,
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'Puestos/ObtenerPostesPorPuesto',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'COD_PUESTO',
        direction: 'ASC'
    }]
});