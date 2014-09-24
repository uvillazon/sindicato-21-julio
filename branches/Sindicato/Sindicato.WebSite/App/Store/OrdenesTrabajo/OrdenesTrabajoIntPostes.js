Ext.define('App.Store.OrdenesTrabajo.OrdenesTrabajoIntPostes', {
    extend: 'Ext.data.Store',
    model: 'App.Model.OrdenesTrabajo.OrdenesTrabajo',
    remoteSort: true,
    autoLoad: false,//siempre false
    proxy: {
        type: 'jsonp',
        url: Constantes.HOST + 'OrdenesTrabajo/ObtenerOrdenesTrabajoIntPostes',
        reader: {
            root: 'Rows',
            totalProperty: 'Total'
        },
        simpleSortMode: true
    },
    sorters: [{
        property: 'ID_OT',
        direction: 'ASC'
    }]
});