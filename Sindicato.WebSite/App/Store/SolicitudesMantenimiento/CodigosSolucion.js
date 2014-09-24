Ext.define('App.Store.SolicitudesMantenimiento.CodigosSolucion', {
    alternateClassName: 'App.store.SolicitudesMantenimiento.CodigosSolucion',
    extend: 'Ext.data.Store',
    model: 'App.Model.SolicitudesMantenimiento.CodigosSolucion',
    remoteSort: true,
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'Codigos/ObtenerCodigosSolucion',
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