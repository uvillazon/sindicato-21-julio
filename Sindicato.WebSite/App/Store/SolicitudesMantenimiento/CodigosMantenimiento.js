Ext.define('App.Store.SolicitudesMantenimiento.CodigosMantenimiento', {
    alternateClassName: 'App.store.SolicitudesMantenimiento.CodigosMantenimiento',
    extend: 'Ext.data.Store',
    model: 'App.Model.SolicitudesMantenimiento.Codigos',
    remoteSort: true,
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'Codigos/ObtenerCodigosMantenimiento',
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