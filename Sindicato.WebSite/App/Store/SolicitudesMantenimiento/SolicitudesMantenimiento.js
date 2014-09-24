Ext.define('App.Store.SolicitudesMantenimiento.SolicitudesMantenimiento', {
    extend: 'Ext.data.Store',
    model: 'App.Model.SolicitudesMantenimiento.SolicitudesMantenimiento',
    remoteSort: true,
    autoLoad: false,//quizas comentar
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'SolicitudesMantenimiento/ObtenerSolicitudesMantenimientoPaginado',
        reader: {
            root: 'Rows',
            totalProperty: 'Total',
            messageProperty: 'msg',
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'ID_SOL_MAN',
        direction: 'DESC'
    }]
});