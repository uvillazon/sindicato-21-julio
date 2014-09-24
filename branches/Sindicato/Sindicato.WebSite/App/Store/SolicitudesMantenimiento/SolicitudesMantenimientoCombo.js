Ext.define('App.store.SolicitudesMantenimiento.SolicitudesMantenimientoCombo', {
    extend: 'Ext.data.Store',
    model: 'App.Model.SolicitudesMantenimiento.SolicitudesMantenimiento',
    remoteSort: true,
    //autoLoad: true,//quizas comentar
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
