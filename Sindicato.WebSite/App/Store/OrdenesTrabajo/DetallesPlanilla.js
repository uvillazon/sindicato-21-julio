Ext.define('App.Store.OrdenesTrabajo.DetallesPlanilla', {
    extend: 'Ext.data.Store',
    model: 'App.Model.OrdenesTrabajo.DetallesPlanilla',
    remoteSort: true,
    autoLoad: false,//siempre false
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'OrdenesTrabajo/ObtenerDetallePlanillaInspeccionPaginado',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'ID_PLA_DET',
        direction: 'ASC'
    }]
});