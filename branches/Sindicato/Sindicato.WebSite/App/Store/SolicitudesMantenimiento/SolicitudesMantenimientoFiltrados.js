Ext.define('App.Store.SolicitudesMantenimiento.SolicitudesMantenimientoFiltrados', {
    alternateClassName: 'App.store.SolicitudesMantenimiento.SolicitudesMantenimientoFiltrados',
    extend: 'Ext.data.Store',
    model: 'App.Model.SolicitudesMantenimiento.SolicitudesMantenimiento',
    remoteSort: true,
    autoLoad: false,//quizas comentar
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'SolicitudesMantenimiento/ObtenerSolicitudesMantenimientoPorBandejas',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'ID_SOL_MAN',
        direction: 'DESC'
    }]
});