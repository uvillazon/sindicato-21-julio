Ext.define('App.Store.SolicitudesMantenimiento.CodigosDefecto', {
    extend: 'Ext.data.Store',
    model: 'App.Model.SolicitudesMantenimiento.Codigos',
    remoteSort: true,
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'Codigos/ObtenerCodigosDefecto',
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